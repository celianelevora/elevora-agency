import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

// Boîte interne qui reçoit les demandes
const TO = 'contact@elevora-agency.com';
// Expéditeurs (même adresse vérifiée, libellés différents)
const FROM_NOTIF = 'Elevora — Formulaire <contact@elevora-agency.com>';
const FROM_CONTACT = 'Elevora <contact@elevora-agency.com>';

// ---- Sécurité ----
const ALLOWED_ORIGINS = [
  'https://elevora-agency.com',
  'https://www.elevora-agency.com',
];
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 Mo
const ALLOWED_ATTACHMENT_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
]);
// Plafonds de longueur par champ (anti-abus / e-mails géants).
const FIELD_MAX: Record<string, number> = {
  first_name: 100, last_name: 100, email: 200, subject: 200,
  phone: 40, phone_full: 40,
  message: 5000, description: 5000, inspirations: 5000, content: 5000, extra_message: 5000,
};
const FIELD_MAX_DEFAULT = 1000;

function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // En développement uniquement, autoriser localhost, 127.0.0.1, 0.0.0.0 et les
  // IP du réseau local (ex. 192.168.x.x pour tester depuis un téléphone), tout
  // port confondu. En production, seuls ALLOWED_ORIGINS sont acceptés.
  if (
    process.env.NODE_ENV !== 'production' &&
    /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?$/.test(origin)
  ) {
    return true;
  }
  return false;
}

/** Renvoie le nom du 1er champ qui dépasse sa longueur max, sinon null. */
function checkFieldLengths(data: Record<string, unknown>): string | null {
  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== 'string') continue;
    const cap = FIELD_MAX[key] ?? FIELD_MAX_DEFAULT;
    if (value.length > cap) return key;
  }
  return null;
}

// Neutralise le HTML dans les valeurs saisies
function esc(v: unknown): string {
  if (v === undefined || v === null || v === '') return '—';
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---- Briques d'e-mail (tables + inline styles, compatibles clients mail) ----

const SERIF = "'Cochin',Georgia,'Times New Roman',serif";
const SANS = "'Helvetica Neue',Arial,sans-serif";

function header(title: string, subtitle: string): string {
  return `
  <tr><td style="background:#1A1A2E;padding:34px 40px 28px">
    <div style="font-family:${SANS};font-size:11px;letter-spacing:4px;color:#C6A35A;text-transform:uppercase">ELEVORA &#183; AGENCE DIGITALE</div>
    <div style="font-family:${SERIF};font-size:26px;line-height:1.2;color:#EAE9EE;margin-top:12px">${title}</div>
    <div style="font-family:${SANS};font-size:13px;color:#8A8AA0;margin-top:7px">${subtitle}</div>
  </td></tr>
  <tr><td style="height:3px;background:#C9266A;line-height:3px;font-size:1px">&nbsp;</td></tr>`;
}

function footer(note: string): string {
  return `
  <tr><td style="background:#FFFFFF;padding:24px 40px 30px;border-top:1px solid #ECEAEF">
    <div style="font-family:${SANS};font-size:12px;line-height:1.65;color:#7A7A7A">${note}</div>
    <div style="margin-top:14px;font-family:${SANS};font-size:11px;letter-spacing:1.5px;color:#9A9AA8;text-transform:uppercase">Nantes &#183; France &nbsp;&middot;&nbsp; elevora-agency.com</div>
  </td></tr>`;
}

function shell(inner: string): string {
  return `
  <div style="background:#EAE9EE;padding:30px 16px;font-family:${SANS}">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="600" style="max-width:600px;width:100%;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden">
      ${inner}
    </table>
  </div>`;
}

function row(label: string, value: string, alt: boolean): string {
  const bg = alt ? '#F7F6F9' : '#FFFFFF';
  const pre = /Description|Message/.test(label) ? 'white-space:pre-wrap;' : '';
  return `<tr>
    <td style="padding:11px 22px;font-family:${SANS};font-size:10.5px;letter-spacing:1.4px;text-transform:uppercase;color:#C9266A;background:${bg};border-bottom:1px solid #ECEAEF;width:165px;vertical-align:top;font-weight:bold">${label}</td>
    <td style="padding:11px 22px;font-family:${SANS};font-size:14px;line-height:1.55;color:#2E2E4A;background:${bg};border-bottom:1px solid #ECEAEF;${pre}">${value}</td>
  </tr>`;
}

// ---- Mail INTERNE (reçu par Elevora) ----
function internalEmail(formType: string, d: Record<string, any>): { subject: string; html: string } {
  const fullName = `${d.first_name} ${d.last_name}`.trim();
  const phone = d.phone_full || d.phone;
  const features = Array.isArray(d.features) ? d.features.join(', ') : d.features;
  const mail = `<a href="mailto:${esc(d.email)}" style="color:#1B4F8A;text-decoration:none">${esc(d.email)}</a>`;

  let subject: string;
  let title: string;
  let summary: string;
  let rows = '';
  let i = 0;

  if (formType === 'start_project') {
    subject = `Nouveau projet — ${d.project_type} — ${fullName}`;
    title = 'Nouvelle demande de projet';
    summary = [esc(d.project_type), `Budget ${esc(d.budget)}`, esc(d.objective)].join(' &nbsp;&middot;&nbsp; ');
    rows += row('Nom', esc(fullName), i++ % 2 === 1);
    rows += row('Email', mail, i++ % 2 === 1);
    rows += row('Téléphone', esc(phone), i++ % 2 === 1);
    rows += row('Entreprise', esc(d.company), i++ % 2 === 1);
    rows += row('Secteur', esc(d.sector), i++ % 2 === 1);
    rows += row('Type de projet', esc(d.project_type), i++ % 2 === 1);
    rows += row('Objectif', esc(d.objective), i++ % 2 === 1);
    rows += row('Nombre de pages', esc(d.pages), i++ % 2 === 1);
    rows += row('Budget', esc(d.budget), i++ % 2 === 1);
    rows += row('Délai souhaité', esc(d.deadline), i++ % 2 === 1);
    rows += row('Fonctionnalités', esc(features), i++ % 2 === 1);
    rows += row('Description', esc(d.description), i++ % 2 === 1);
    rows += row('Identité / charte', esc(d.branding), i++ % 2 === 1);
    rows += row('Inspirations', esc(d.inspirations), i++ % 2 === 1);
    rows += row('Contenus dispo.', esc(d.content), i++ % 2 === 1);
    rows += row('Message complémentaire', esc(d.extra_message), i++ % 2 === 1);
  } else {
    subject = `Contact — ${d.subject} — ${fullName}`;
    title = 'Nouveau message de contact';
    summary = esc(d.subject);
    rows += row('Nom', esc(fullName), i++ % 2 === 1);
    rows += row('Email', mail, i++ % 2 === 1);
    rows += row('Téléphone', esc(phone), i++ % 2 === 1);
    rows += row('Sujet', esc(d.subject), i++ % 2 === 1);
    rows += row('Message', esc(d.message), i++ % 2 === 1);
  }

  const body = `
  <tr><td style="background:#FFFFFF;padding:28px 40px 8px">
    <div style="font-family:${SERIF};font-size:23px;color:#1A1A2E">${esc(fullName)}</div>
    <div style="font-family:${SANS};font-size:13px;color:#7A7A7A;margin-top:6px">${summary}</div>
  </td></tr>
  <tr><td style="padding:18px 0 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
  </td></tr>`;

  const html = shell(
    header(title, formType === 'start_project' ? 'Formulaire « Démarrer un projet »' : 'Formulaire « Contact »') +
    body +
    footer('Répondez directement à cet e-mail pour recontacter le prospect (l\'adresse de réponse est la sienne).')
  );

  return { subject, html };
}

// ---- Mail de CONFIRMATION (reçu par le prospect) ----
function confirmEmail(formType: string, d: Record<string, any>): { subject: string; html: string } {
  const prenom = esc(d.first_name);
  const recap =
    formType === 'start_project'
      ? `Projet : <strong style="color:#1A1A2E">${esc(d.project_type)}</strong>`
      : `Objet : <strong style="color:#1A1A2E">${esc(d.subject)}</strong>`;

  const body = `
  <tr><td style="background:#FFFFFF;padding:38px 40px 4px">
    <div style="font-family:${SERIF};font-size:30px;line-height:1.15;color:#1A1A2E">Merci, ${prenom}.</div>
    <p style="font-family:${SANS};font-size:15px;line-height:1.7;color:#2E2E4A;margin:18px 0 0">
      Votre demande nous est bien parvenue. On l'étudie attentivement et on revient vers vous
      <strong style="color:#1A1A2E">sous 48&nbsp;heures ouvrées</strong> avec une première réponse — et, si c'est pertinent, les prochaines étapes.
    </p>
  </td></tr>

  <tr><td style="background:#FFFFFF;padding:22px 40px 6px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F6F9;border:1px solid #ECEAEF;border-radius:10px">
      <tr><td style="padding:18px 22px">
        <div style="font-family:${SANS};font-size:10.5px;letter-spacing:1.6px;text-transform:uppercase;color:#C9266A;font-weight:bold">Votre demande</div>
        <div style="font-family:${SANS};font-size:14px;line-height:1.6;color:#2E2E4A;margin-top:8px">${recap}</div>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="background:#FFFFFF;padding:28px 40px 0">
    <div style="border-top:1px solid #ECEAEF;padding-top:22px">
      <span style="font-family:${SERIF};font-size:16px;color:#C6A35A">&#10022;</span>
      <span style="font-family:${SERIF};font-style:italic;font-size:17px;color:#1A1A2E;margin-left:8px">Un seul interlocuteur, du devis à la mise en ligne.</span>
    </div>
  </td></tr>

  <tr><td style="background:#FFFFFF;padding:26px 40px 6px">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td bgcolor="#1B4F8A" style="border-radius:999px">
        <a href="https://elevora-agency.com/realisations" style="display:inline-block;padding:13px 28px;font-family:${SANS};font-size:14px;color:#FFFFFF;text-decoration:none">Voir nos réalisations</a>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="background:#FFFFFF;padding:26px 40px 34px">
    <div style="font-family:${SERIF};font-size:18px;color:#1A1A2E">L'équipe Elevora</div>
    <div style="font-family:${SANS};font-size:12px;color:#7A7A7A;margin-top:3px">Agence digitale &#183; Nantes</div>
  </td></tr>`;

  const html = shell(
    header('Elevora', 'Votre demande est bien reçue') +
    body +
    footer('Cet e-mail confirme la réception de votre message. Si vous n\'êtes pas à l\'origine de cette demande, vous pouvez l\'ignorer.')
  );

  return { subject: 'Nous avons bien reçu votre demande — Elevora', html };
}

export async function POST(request: NextRequest) {
  try {
    // — Vérification d'origine (anti-CSRF / abus d'API tierce) —
    const origin = request.headers.get('origin');
    if (origin && !isAllowedOrigin(origin)) {
      return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });
    }

    // — Rate limiting par IP : 5 envois / 10 minutes —
    const ip = getClientIp(request);
    const rl = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Merci de réessayer dans quelques minutes.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } },
      );
    }

    let data: Record<string, any> = {};
    let attachmentFile: File | null = null;

    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      data = await request.json();
    } else {
      const fd = await request.formData();
      fd.forEach((value, key) => {
        if (value && typeof (value as any).arrayBuffer === 'function') {
          const f = value as File;
          if (f.size > 0) attachmentFile = f;
          return;
        }
        if (data[key] !== undefined) {
          if (Array.isArray(data[key])) data[key].push(value);
          else data[key] = [data[key], value];
        } else {
          data[key] = value;
        }
      });
    }

    // — Honeypot anti-spam : champ « confirm_field » invisible. Rempli = bot.
    //   On répond 200 (leurre) sans envoyer d'e-mail. NB : nom volontairement
    //   neutre (pas « website »/« email »…) pour que l'autofill / les
    //   gestionnaires de mots de passe ne le remplissent PAS à la place d'un
    //   vrai visiteur, ce qui ferait perdre des demandes légitimes. —
    if (typeof data.confirm_field === 'string' && data.confirm_field.trim() !== '') {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // — Plafonds de longueur (anti-abus) —
    const tooLong = checkFieldLengths(data);
    if (tooLong) {
      return NextResponse.json({ error: 'Un champ dépasse la longueur autorisée.' }, { status: 400 });
    }

    const formType = data.form_type || 'contact_simple';
    const required =
      formType === 'start_project'
        ? ['first_name', 'last_name', 'email', 'project_type', 'description', 'objective']
        : ['first_name', 'last_name', 'email', 'subject', 'message'];

    for (const field of required) {
      const v = data[field];
      if (!v || (typeof v === 'string' && v.trim() === '')) {
        return NextResponse.json({ error: `Le champ ${field} est requis.` }, { status: 400 });
      }
    }

    // Consentement RGPD obligatoire (defense en profondeur : la case est aussi
    // validee cote client, mais un POST direct ne doit pas pouvoir l'eluder).
    if (!data.rgpd) {
      return NextResponse.json(
        { error: 'Le consentement au traitement des données (RGPD) est requis.' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(data.email))) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY manquante.');
      return NextResponse.json({ error: 'Service d\'envoi non configuré.' }, { status: 500 });
    }

    // Pièce jointe éventuelle (uniquement vers la boîte interne).
    // Sécurité : refus si > 5 Mo ; types MIME restreints (sinon ignorée).
    const attachments: { filename: string; content: Buffer }[] = [];
    if (attachmentFile) {
      const f = attachmentFile as File;
      if (f.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { error: 'La pièce jointe dépasse 5 Mo.' },
          { status: 400 },
        );
      }
      if (ALLOWED_ATTACHMENT_TYPES.has(f.type)) {
        const buf = Buffer.from(await f.arrayBuffer());
        attachments.push({ filename: f.name || 'piece-jointe', content: buf });
      }
      // Type non autorisé : on n'attache rien mais on n'échoue pas la demande.
    }

    // 1) Mail interne (PRIORITAIRE : c'est la demande qu'on ne veut pas perdre)
    const notif = internalEmail(formType, data);
    const { error: notifErr } = await resend.emails.send({
      from: FROM_NOTIF,
      to: TO,
      replyTo: String(data.email),
      subject: notif.subject,
      html: notif.html,
      ...(attachments.length ? { attachments } : {}),
    });

    if (notifErr) {
      console.error('Erreur Resend (interne) :', notifErr);
      return NextResponse.json({ error: 'Erreur lors de l\'envoi. Merci de réessayer.' }, { status: 502 });
    }

    // 2) Mail de confirmation au prospect (best effort : ne bloque pas la réponse)
    try {
      const conf = confirmEmail(formType, data);
      const { error: confErr } = await resend.emails.send({
        from: FROM_CONTACT,
        to: String(data.email),
        replyTo: TO,
        subject: conf.subject,
        html: conf.html,
      });
      if (confErr) console.error('Erreur Resend (confirmation) :', confErr);
    } catch (e) {
      console.error('Confirmation non envoyée :', e);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Erreur API /api/contact :', err);
    return NextResponse.json({ error: 'Erreur serveur. Merci de réessayer.' }, { status: 500 });
  }
}
