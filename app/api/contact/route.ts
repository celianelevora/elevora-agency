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

function isAllowedOrigin(origin: string, host: string | null): boolean {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Same-origin : si l'origine correspond à l'hôte qui sert l'app (ex.
  // test.elevora-agency.com, www., apex…), la requête vient du site lui-même.
  // Une requête same-origin n'est jamais du CSRF tiers : on l'autorise donc quel
  // que soit le domaine de déploiement, sans avoir à maintenir une liste.
  try {
    if (host && new URL(origin).host === host) return true;
  } catch {
    /* origin non parsable : on retombe sur les règles ci-dessous */
  }
  // Environnements de preview / staging Infomaniak : l'URL publique est un
  // sous-domaine *.hosting-ik.com (ex. 16hvmytb5jc.preview.hosting-ik.com).
  // Derrière leur proxy, l'en-tête host ne correspond pas toujours à l'origine,
  // ce qui fait échouer la comparaison same-origin ci-dessus. On autorise donc
  // explicitement ces domaines pour que les formulaires marchent en preview
  // (le domaine de prod elevora-agency.com reste couvert par ALLOWED_ORIGINS).
  try {
    if (new URL(origin).hostname.endsWith('.hosting-ik.com')) return true;
  } catch {
    /* origin non parsable */
  }
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

// ---- Système de design e-mail (tables + inline styles, compatibles Outlook) ----
// Palette : ink (encre navi) + or, sur fond crème chaud. Fini le tableau zébré et
// l'accent magenta : hiérarchie éditoriale, espacements généreux = perçu premium.

const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const INK = '#15151F';        // encre / masthead / titres
const INK2 = '#33333F';       // texte courant
const MUTE = '#7C7C88';       // texte secondaire
const GOLD = '#B08A3E';       // or (contraste sur blanc)
const GOLD_L = '#C6A35A';     // or clair (sur fond sombre)
const CANVAS = '#EDEAE4';     // fond extérieur crème
const HAIR = '#ECEAF0';       // filets
const SOFT = '#F6F5F1';       // cartes douces

// Enveloppe fluid-hybride : centrée, 600px cappé, coins arrondis, préheader caché.
function shell(inner: string, preheader = ''): string {
  return `
  <div style="margin:0;padding:0;background:${CANVAS};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${CANVAS};mso-hide:all;">${preheader}&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${CANVAS};">
      <tr><td align="center" style="padding:40px 14px;">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="width:100%;max-width:600px;background:#FFFFFF;border-radius:20px;overflow:hidden;border:1px solid ${HAIR};">
          ${inner}
        </table>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="width:100%;max-width:600px;">
          <tr><td align="center" style="padding:24px 20px 6px;font-family:${SANS};font-size:11px;letter-spacing:.4px;color:#A0A0AC;line-height:1.7;">
            Elevora — Agence digitale &#183; Nantes, France<br>
            <a href="https://elevora-agency.com" style="color:#A0A0AC;text-decoration:none;">elevora-agency.com</a>
          </td></tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td></tr>
    </table>
  </div>`;
}

// Masthead : fond encre, sur-titre or espacé, titre serif, filet or inséré.
function masthead(eyebrow: string, title: string, subtitle: string): string {
  return `
  <tr><td style="background:${INK};padding:40px 46px 34px;">
    <div style="font-family:${SANS};font-size:10.5px;letter-spacing:3.5px;color:${GOLD_L};text-transform:uppercase;font-weight:700;">${eyebrow}</div>
    <div style="font-family:${SERIF};font-size:29px;line-height:1.25;color:#FBFAF7;margin-top:15px;">${title}</div>
    ${subtitle ? `<div style="font-family:${SANS};font-size:13.5px;line-height:1.55;color:#9C9CB0;margin-top:10px;">${subtitle}</div>` : ''}
  </td></tr>
  <tr><td style="background:${INK};padding:0 46px 4px;"><div style="height:2px;width:46px;background:${GOLD_L};font-size:0;line-height:2px;">&nbsp;</div></td></tr>`;
}

// Champ « définition » : micro-label or en capitales, valeur en dessous, filet bas.
function field(label: string, value: string, isLong = false): string {
  return `
  <tr><td style="padding:0 46px;">
    <div style="padding:17px 0;border-bottom:1px solid ${HAIR};">
      <div style="font-family:${SANS};font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:${GOLD};font-weight:700;">${label}</div>
      <div style="font-family:${SANS};font-size:15px;line-height:1.55;color:${INK2};margin-top:7px;${isLong ? 'white-space:pre-wrap;' : ''}">${value}</div>
    </div>
  </td></tr>`;
}

// Bouton bulletproof (bgcolor sur le td pour Outlook).
function button(href: string, label: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td align="center" bgcolor="${INK}" style="border-radius:100px;">
      <a href="${href}" style="display:inline-block;padding:15px 34px;font-family:${SANS};font-size:13px;letter-spacing:.4px;color:#FBFAF7;text-decoration:none;font-weight:600;">${label}</a>
    </td>
  </tr></table>`;
}

// Note de pied de carte.
function footerNote(note: string): string {
  return `
  <tr><td style="padding:28px 46px 42px;">
    <div style="border-top:1px solid ${HAIR};padding-top:24px;font-family:${SANS};font-size:12px;line-height:1.7;color:${MUTE};">${note}</div>
  </td></tr>`;
}

// Assemble une liste de champs en ignorant les valeurs vides ('—').
function fieldList(items: Array<[string, string, boolean?]>): string {
  return items
    .filter(([, value]) => value && value !== '—')
    .map(([label, value, isLong]) => field(label, value, isLong))
    .join('');
}

// ---- Mail INTERNE (reçu par Elevora) ----
function internalEmail(formType: string, d: Record<string, any>): { subject: string; html: string } {
  const fullName = `${d.first_name} ${d.last_name}`.trim();
  const phone = d.phone_full || d.phone;
  const features = Array.isArray(d.features) ? d.features.join(', ') : d.features;
  const mail = `<a href="mailto:${esc(d.email)}" style="color:${GOLD};text-decoration:none;font-weight:600;">${esc(d.email)}</a>`;

  let subject: string;
  let title: string;
  let summary: string;
  let rows: string;

  if (formType === 'start_project') {
    subject = `Nouveau projet — ${d.project_type} — ${fullName}`;
    title = 'Nouvelle demande de projet';
    summary = [esc(d.project_type), `Budget ${esc(d.budget)}`, esc(d.objective)]
      .filter((s) => s && s !== '—')
      .join(' &nbsp;·&nbsp; ');
    rows = fieldList([
      ['Contact', esc(fullName)],
      ['Email', mail],
      ['Téléphone', esc(phone)],
      ['Entreprise', esc(d.company)],
      ['Secteur', esc(d.sector)],
      ['Type de projet', esc(d.project_type)],
      ['Objectif', esc(d.objective)],
      ['Nombre de pages', esc(d.pages)],
      ['Budget', esc(d.budget)],
      ['Délai souhaité', esc(d.deadline)],
      ['Fonctionnalités', esc(features)],
      ['Description', esc(d.description), true],
      ['Identité / charte', esc(d.branding)],
      ['Inspirations', esc(d.inspirations), true],
      ['Contenus disponibles', esc(d.content)],
      ['Message complémentaire', esc(d.extra_message), true],
    ]);
  } else {
    subject = `Contact — ${d.subject} — ${fullName}`;
    title = 'Nouveau message de contact';
    summary = esc(d.subject);
    rows = fieldList([
      ['Contact', esc(fullName)],
      ['Email', mail],
      ['Téléphone', esc(phone)],
      ['Sujet', esc(d.subject)],
      ['Message', esc(d.message), true],
    ]);
  }

  const body = `
  <tr><td style="padding:34px 46px 6px;">
    <div style="font-family:${SERIF};font-size:24px;line-height:1.2;color:${INK};">${esc(fullName)}</div>
    <div style="font-family:${SANS};font-size:13px;line-height:1.6;color:${MUTE};margin-top:8px;">${summary}</div>
  </td></tr>
  <tr><td style="height:20px;font-size:0;line-height:20px;">&nbsp;</td></tr>
  ${rows}
  <tr><td style="padding:30px 46px 4px;">
    ${button(`mailto:${esc(d.email)}`, `Répondre à ${esc(d.first_name)}`)}
  </td></tr>`;

  const html = shell(
    masthead(
      'Elevora · Notification',
      title,
      formType === 'start_project' ? 'Formulaire « Démarrer un projet »' : 'Formulaire « Contact »',
    ) +
      body +
      footerNote(
        'Répondez directement à cet e-mail pour recontacter le prospect — l\'adresse de réponse est déjà la sienne.',
      ),
    `${title} — ${fullName}`,
  );

  return { subject, html };
}

// ---- Mail de CONFIRMATION (reçu par le prospect) ----
function confirmEmail(formType: string, d: Record<string, any>): { subject: string; html: string } {
  const prenom = esc(d.first_name);
  const recapLabel = formType === 'start_project' ? 'Votre projet' : 'Votre demande';
  const recapValue =
    formType === 'start_project' ? esc(d.project_type) : esc(d.subject);

  const body = `
  <tr><td style="padding:44px 46px 0;">
    <div style="font-family:${SERIF};font-size:34px;line-height:1.12;color:${INK};">Merci, ${prenom}.</div>
    <p style="font-family:${SANS};font-size:15.5px;line-height:1.75;color:${INK2};margin:20px 0 0;">
      Votre demande nous est bien parvenue. Nous l'étudions attentivement et revenons vers vous
      <strong style="color:${INK};">sous 48&nbsp;heures ouvrées</strong> avec une première réponse — et, si c'est pertinent, les prochaines étapes.
    </p>
  </td></tr>

  <tr><td style="padding:28px 46px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SOFT};border-radius:12px;">
      <tr>
        <td width="3" bgcolor="${GOLD}" style="background:${GOLD};border-radius:12px 0 0 12px;font-size:0;line-height:0;">&nbsp;</td>
        <td style="padding:20px 24px;">
          <div style="font-family:${SANS};font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:${GOLD};font-weight:700;">${recapLabel}</div>
          <div style="font-family:${SERIF};font-size:19px;line-height:1.35;color:${INK};margin-top:8px;">${recapValue}</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:30px 46px 0;">
    <div style="border-top:1px solid ${HAIR};padding-top:26px;font-family:${SERIF};font-style:italic;font-size:18px;line-height:1.5;color:${INK};">
      <span style="color:${GOLD};font-style:normal;">&#10022;</span>&nbsp; Un seul interlocuteur, du devis à la mise en ligne.
    </div>
  </td></tr>

  <tr><td style="padding:28px 46px 0;">
    ${button('https://elevora-agency.com/realisations', 'Découvrir nos réalisations')}
  </td></tr>

  <tr><td style="padding:32px 46px 8px;">
    <div style="font-family:${SERIF};font-size:19px;color:${INK};">L'équipe Elevora</div>
    <div style="font-family:${SANS};font-size:12px;letter-spacing:.4px;color:${MUTE};margin-top:4px;">Agence digitale &#183; Nantes</div>
  </td></tr>`;

  const html = shell(
    masthead('Elevora · Agence digitale', 'Votre demande est bien reçue', '') +
      body +
      footerNote(
        'Cet e-mail confirme la réception de votre message. Si vous n\'êtes pas à l\'origine de cette demande, vous pouvez l\'ignorer.',
      ),
    `Merci ${prenom}, votre demande est bien reçue — réponse sous 48h.`,
  );

  return { subject: 'Nous avons bien reçu votre demande — Elevora', html };
}

export async function POST(request: NextRequest) {
  try {
    // — Vérification d'origine (anti-CSRF / abus d'API tierce) —
    // L'hôte réel est porté par x-forwarded-host derrière le proxy Infomaniak,
    // sinon par l'en-tête Host classique.
    const origin = request.headers.get('origin');
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    if (origin && !isAllowedOrigin(origin, host)) {
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
