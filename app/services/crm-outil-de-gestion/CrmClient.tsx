'use client';

/**
 * PAGE 5 — CRM & OUTIL DE GESTION  ·  refonte
 * Charte : titres Cochin (fallback Cormorant Garamond), corps Roboto.
 * Identité propre (≠ vitrine, e-commerce, landing, application) : GESTION /
 *   PROPRIÉTÉ / PILOTAGE. Deux interactions signatures : sélection de ligne
 *   façon tableur CRM au survol des modules, et tableau comparatif SaaS vs
 *   sur-mesure où la colonne « sur mesure » ressort.
 * Angle : sur-mesure pensé pour vos process, code & données à vous, hébergé en
 *   Suisse.
 * Ordre strict des images : 1 sombre · 2 rose · 3 sombre · 4 rose · 5 sombre ·
 *   6 crème · 7 sombre. Le tarif (liste « Tout est compris ») est sur la
 *   section CLAIRE (img-6) pour rester lisible.
 * Aucun widget, aucun effet magnétique, aucun halo blanc.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import ServiceHero from '@/components/ServiceHero';
import CTASection from '@/components/CTASection';
import { SectionBg, Reveal, RevealText } from '@/components/ServiceFX';

const IMG = '/services/crm';

const H2 = (size: string): React.CSSProperties => ({ fontSize: size, fontWeight: 500, letterSpacing: '-0.012em', lineHeight: 1.06 });

const PROBLEME = [
  { t: 'Trop générique', d: 'Les logiciels du marché vous forcent à entrer dans leur logique au lieu d’épouser la vôtre.' },
  { t: 'Trop rigide', d: 'Vous adaptez vos process à l’outil, alors que ce devrait être exactement l’inverse.' },
  { t: 'Trop dépendant', d: 'Vos données vivent chez quelqu’un d’autre, qui change ses conditions et sa stratégie quand il veut.' },
];

const CATEGORIES = [
  { t: 'CRM & clients', d: 'Pipeline, relances, historique. Conçu pour votre cycle de vente.', tags: ['Pipeline', 'Relances'] },
  { t: 'Facturation', d: 'Devis, factures, impayés, export comptable conforme.', tags: ['Devis', 'Export FEC'] },
  { t: 'RH & paie', d: 'Salariés, congés, notes de frais, plannings. RGPD natif.', tags: ['Congés', 'Frais'] },
  { t: 'Planning & ops', d: 'Interventions, chantiers, ordres de service. Mobile inclus.', tags: ['Plannings', 'Mobile'] },
  { t: 'Extranet client', d: 'Un espace privé : suivi, documents, factures, support.', tags: ['Espace', 'Docs'] },
  { t: 'Outil métier', d: 'Un besoin que rien ne couvre ? On part de zéro avec vous.', tags: ['Sur mesure', 'Évolutif'] },
];

const COMPARE = [
  { crit: 'Le périmètre', saas: 'Celui de l’éditeur, ni plus ni moins', sur: 'Exactement le vôtre, rien d’inutile' },
  { crit: 'Vos données', saas: 'Chez l’éditeur, soumises à ses CGU', sur: 'À vous, hébergées en Suisse' },
  { crit: 'Les évolutions', saas: 'Au rythme de l’éditeur', sur: 'Au vôtre, quand vous voulez' },
  { crit: 'La propriété', saas: 'Vous dépendez de la plateforme', sur: 'Code, base et accès sont à vous' },
];

const RAISONS = [
  { big: 'Précis', t: 'Pensé pour votre métier', d: 'On part de vos process réels, pas d’un logiciel standard. L’outil épouse votre façon de travailler — pas l’inverse.' },
  { big: 'Vous', t: 'Vous décidez ce qu’il fait', d: 'Chaque écran, chaque champ, chaque automatisation répond à un besoin que vous avez validé. Rien d’inutile, rien qui manque.' },
  { big: 'À vous', t: 'L’outil et les données vous appartiennent', d: 'Code source, base de données, accès serveur : tout est à votre nom, hébergé en Suisse. Vous n’êtes jamais bloqué par la roadmap d’un éditeur.' },
];

const INCLUS = [
  'Cadrage complet de vos process', 'Maquettes validées avant le code', 'Modules développés sur mesure',
  'Tableau de bord de pilotage', 'Migration de vos données', 'Hébergement Infomaniak (Suisse)',
  'Code & données 100 % à vous', 'Formation de vos équipes', 'Garantie & suivi 30 jours',
];
const TARIF_NOTE = 'Le tarif dépend des modules et du périmètre. On le cadre ensemble, puis devis ferme — paiement échelonné, livraison module par module.';

const FAQ = [
  { q: 'Comment se passe le paiement ?', a: 'On cadre le projet ensemble, puis on établit un devis ferme. Selon l’ampleur, le règlement peut s’échelonner en plusieurs fois, calé sur la livraison des modules. On s’adapte à votre trésorerie.' },
  { q: 'Pourquoi pas un logiciel du marché ?', a: 'Un logiciel standard vous fait entrer dans sa logique, héberge vos données chez lui et évolue à son rythme. Un outil sur mesure épouse vos process, garde vos données chez vous, et évolue quand vous le décidez.' },
  { q: 'Et mes données existantes ?', a: 'On les migre depuis vos tableurs ou votre ancien outil. Rien ne se perd : vous démarrez avec votre historique déjà en place.' },
  { q: 'Si j’ai besoin d’une évolution plus tard ?', a: 'On l’ajoute quand vous voulez, à votre rythme. Le code est à vous : vous n’êtes jamais bloqué par la roadmap d’un éditeur.' },
];

function Arrow() {
  return (<svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
}
function DrawLine({ color }: { color: string }) {
  return (<motion.span aria-hidden style={{ display: 'block', width: '100%', height: 1, background: color, transformOrigin: 'left', borderRadius: 2 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />);
}

export default function CrmClient() {
  return (
    <>
      <style>{CRM_CSS}</style>

      {/* 1 — HERO (img-1 sombre) */}
      <ServiceHero
        image={`${IMG}/img-1.webp`}
        theme="dark"
        glow
        eyebrow="CRM & outil de gestion"
        title={
          <>
            L’outil qui vous va.
            <br />
            Pas{' '}
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 500 }}>l’inverse.</span>
          </>
        }
        lead="CRM, facturation, RH, extranet, outil métier. On développe l’outil dont votre entreprise a vraiment besoin — pour centraliser, automatiser et enfin tout maîtriser."
        primary={{ label: 'Discuter de mon outil', href: '/contact' }}
        secondary={{ label: 'Voir la méthode', href: '/methode' }}
        tags={['Sur mesure', 'Code à vous', 'Hébergé en Suisse']}
      />

      {/* 2 — LE PROBLÈME (img-2 rose, clair) — entête + liste de douleurs */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="light-strong" parallax={55} py={146} glow="blush">
        <div className="crm-prob">
          <div>
            <Reveal><span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Le problème</span></Reveal>
            <RevealText as="h2" text="Vous avez essayé les outils du marché. Ils ne vous vont pas." emphasis="pas" style={{ margin: '22px 0 18px', ...H2('clamp(29px,3.8vw,48px)') }} />
            <Reveal delay={0.1}><p style={{ fontSize: 16, lineHeight: 1.74, color: 'var(--ink-soft)', maxWidth: 360 }}>Un logiciel pensé pour tout le monde n’est jamais pensé pour vous.</p></Reveal>
          </div>
          <div className="crm-prob__list">
            {PROBLEME.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1} className="crm-prob__item">
                <span className="crm-prob__num" aria-hidden style={{ color: i % 2 ? 'var(--pink)' : 'var(--klein)' }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 style={{ fontSize: 'clamp(19px,2.1vw,24px)', fontWeight: 500, marginBottom: 9, lineHeight: 1.2 }}>{p.t}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)' }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBg>

      {/* 3 — CE QU'ON CONSTRUIT (img-3 sombre) — lignes type tableur (sélection au survol) */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="dark-strong" parallax={60} py={146} glow="klein-pink">
        <div style={{ maxWidth: 660, margin: '0 auto 56px', textAlign: 'center' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)', justifyContent: 'center' }}>Ce qu’on développe</span></Reveal>
          <RevealText as="h2" text="Tout ce qui vous fait gagner du temps." emphasis="temps" style={{ margin: '22px 0 0', color: '#EAE9EE', ...H2('clamp(30px,3.9vw,50px)') }} />
        </div>
        <div className="crm-rows">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 0.08} className="crm-row">
              <span className="crm-row__bar" aria-hidden />
              <div className="crm-row__main">
                <h3 style={{ fontSize: 'clamp(19px,2vw,23px)', fontWeight: 500, color: '#EAE9EE', marginBottom: 6, lineHeight: 1.2 }}>{c.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'rgba(234,233,238,.66)', maxWidth: 520 }}>{c.d}</p>
              </div>
              <div className="crm-row__tags">
                {c.tags.map((t) => <span key={t} className="crm-tag">{t}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 4 — SAAS vs SUR-MESURE (img-4 rose, clair) — comparatif */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="light-strong" parallax={50} py={146} glow="blush">
        <div style={{ maxWidth: 660, margin: '0 auto 56px', textAlign: 'center' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'var(--klein)', justifyContent: 'center' }}>SaaS vs sur-mesure</span></Reveal>
          <RevealText as="h2" text="Le standard du marché, ou le vôtre." emphasis="vôtre" style={{ margin: '22px 0 0', ...H2('clamp(29px,3.8vw,48px)') }} />
        </div>
        <div className="crm-cmp">
          <div className="crm-cmp__head">
            <div />
            <div className="crm-cmp__saashead">Solutions du marché</div>
            <div className="crm-cmp__surhead">Sur mesure Elevora</div>
          </div>
          {COMPARE.map((c, i) => (
            <Reveal key={c.crit} delay={i * 0.08} className="crm-cmp__row">
              <div className="crm-cmp__crit">{c.crit}</div>
              <div className="crm-cmp__saas">{c.saas}</div>
              <div className="crm-cmp__sur">{c.sur}</div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 5 — POURQUOI LE SUR-MESURE (img-5 sombre) — grandes locutions serif */}
      <SectionBg image={`${IMG}/img-5.webp`} scrim="dark-strong" parallax={68} py={150} glow="pink-klein">
        <div style={{ maxWidth: 660, marginBottom: 60 }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)' }}>Pourquoi le sur-mesure</span></Reveal>
          <RevealText as="h2" text="Trois raisons de passer au sur-mesure." emphasis="sur-mesure" style={{ margin: '22px 0 0', color: '#EAE9EE', ...H2('clamp(30px,3.9vw,48px)') }} />
        </div>
        <div className="crm-why">
          {RAISONS.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.1} className="crm-why__col">
              <span className="crm-why__big" aria-hidden style={{ color: i % 2 ? 'var(--pink)' : 'var(--klein-bright)' }}>{r.big}</span>
              <h3 className="crm-why__title">{r.t}</h3>
              <p className="crm-why__desc">{r.d}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 6 — TARIF + FAQ (img-6 crème, clair) */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="light-strong" parallax={45} py={146} glow="blush">
        <div className="crm-price">
          <div>
            <Reveal><span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Tarif & délais</span></Reveal>
            <RevealText as="h2" text="Un outil à vous, un budget cadré." emphasis="cadré" style={{ margin: '20px 0 36px', ...H2('clamp(29px,3.7vw,46px)') }} />
            <Reveal delay={0.1}>
              <div style={{ fontSize: 13, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600 }}>Budget</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(54px,8vw,104px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--klein)', lineHeight: 0.9 }}>Sur devis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
                <span style={{ width: 34, height: 1, background: 'var(--line-strong)' }} aria-hidden />
                <span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>livré en</span>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(25px,3vw,34px)', color: 'var(--pink)' }}>6 à 12 semaines</span>
              </div>
              <p style={{ marginTop: 28, fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 420 }}>{TARIF_NOTE}</p>
              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="svc-cta"><span>Discuter de mon outil</span><Arrow /></Link>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal><div style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--klein)', marginBottom: 4 }}>Tout est compris</div></Reveal>
            <div>
              {INCLUS.map((it, i) => (
                <Reveal key={it} delay={i * 0.05} className="svc-inc">
                  <span className="svc-inc__check" aria-hidden><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--klein)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                  <span className="svc-inc__text">{it}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div style={{ margin: 'clamp(60px,8vw,92px) 0 clamp(46px,6vw,64px)' }}><DrawLine color="var(--line)" /></div>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <RevealText as="h2" text="Les questions qu’on nous pose le plus." emphasis="pose" style={{ margin: 0, ...H2('clamp(26px,3.4vw,40px)') }} />
        </div>
        <div className="crm-faq">
          {FAQ.map((it, i) => (
            <Reveal key={it.q} delay={(i % 2) * 0.1} className="crm-faq__item">
              <h3 style={{ fontSize: 'clamp(18px,1.9vw,21px)', color: 'var(--ink)', marginBottom: 12, display: 'flex', gap: 12, lineHeight: 1.3 }}>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', flexShrink: 0 }}>Q.</span>
                {it.q}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--ink-soft)', paddingLeft: 28 }}>{it.a}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 7 — CTA (img-7 sombre, noBleed) */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        eyebrow="On en parle ?"
        title={`Un outil qui vous ressemble,<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 500;">ça se construit.</span>`}
        description="Premier échange gratuit. Racontez-nous comment vous travaillez aujourd’hui, on identifie le bon outil et on vous chiffre tout ça sous 5 jours."
        primaryLabel="Discuter de mon outil"
        secondaryLabel="Voir la méthode"
        secondaryHref="/methode"
        showContactInfo
      />
    </>
  );
}

/* ---------------------------------------------------------------- */
const CRM_CSS = `
/* Problème — entête + liste */
.crm-prob { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(40px,6vw,84px); align-items: start; max-width: 1100px; margin: 0 auto; }
.crm-prob__item { display: grid; grid-template-columns: auto 1fr; gap: clamp(18px,2.5vw,28px); padding: 26px 0; border-top: 0.5px solid var(--line); }
.crm-prob__item:first-child { border-top: none; padding-top: 0; }
.crm-prob__num { font-family: var(--serif); font-style: italic; font-size: clamp(32px,3.6vw,48px); line-height: 1; }
@media (max-width: 820px) { .crm-prob { grid-template-columns: 1fr; gap: 40px; } }

/* Modules — lignes type tableur, sélection au survol */
.crm-rows { display: grid; gap: 0; max-width: 1020px; margin: 0 auto; }
.crm-row { position: relative; display: grid; grid-template-columns: 1fr auto; gap: clamp(16px,3vw,40px); align-items: center; padding: 26px 22px 26px 28px; border-top: 0.5px solid rgba(234,233,238,.13); border-radius: 10px; transition: transform .45s cubic-bezier(.22,1,.36,1), background .45s var(--ease); }
.crm-row:first-child { border-top: none; }
.crm-row__bar { position: absolute; left: 6px; top: 20%; bottom: 20%; width: 3px; border-radius: 3px; background: linear-gradient(180deg, var(--klein-bright), var(--pink)); transform: scaleY(0); transform-origin: center; transition: transform .5s cubic-bezier(.22,1,.36,1); }
.crm-row:hover { background: rgba(43,108,196,.08); transform: translateX(6px); }
.crm-row:hover .crm-row__bar { transform: scaleY(1); }
.crm-row__tags { display: flex; gap: 8px; flex-shrink: 0; }
.crm-tag { font-size: 11.5px; letter-spacing: .03em; padding: 6px 12px; border-radius: 999px; border: 0.5px solid rgba(234,233,238,.2); color: rgba(234,233,238,.6); white-space: nowrap; transition: color .4s var(--ease), border-color .4s var(--ease), background .4s var(--ease); }
.crm-row:hover .crm-tag { color: #EAE9EE; border-color: rgba(43,108,196,.5); background: rgba(43,108,196,.14); }
@media (max-width: 620px) {
  .crm-row { grid-template-columns: 1fr; gap: 14px; }
  .crm-row__tags { flex-wrap: wrap; }
}

/* Comparatif SaaS vs sur-mesure */
.crm-cmp { max-width: 1000px; margin: 0 auto; }
.crm-cmp__head, .crm-cmp__row { display: grid; grid-template-columns: 1.15fr 1fr 1fr; }
.crm-cmp__head > div { padding: 16px 22px; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; font-weight: 700; }
.crm-cmp__saashead { color: var(--ink-muted); }
.crm-cmp__surhead { color: var(--klein); background: rgba(27,79,138,.07); border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom: 2px solid var(--pink); }
.crm-cmp__row > div { padding: 22px; font-size: 15px; line-height: 1.5; border-top: 0.5px solid var(--line); }
.crm-cmp__crit { font-weight: 500; color: var(--ink); }
.crm-cmp__saas { color: var(--ink-muted); }
.crm-cmp__sur { color: var(--ink); font-weight: 500; background: rgba(27,79,138,.07); }
.crm-cmp__row:last-child .crm-cmp__sur { border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
@media (max-width: 680px) {
  .crm-cmp__head { display: none; }
  .crm-cmp__row { grid-template-columns: 1fr; gap: 0; }
  .crm-cmp__row > div { padding: 12px 18px; border-top: none; }
  .crm-cmp__crit { padding-top: 22px; border-top: 0.5px solid var(--line); font-size: 13px; letter-spacing: .04em; text-transform: uppercase; color: var(--ink-muted); }
  .crm-cmp__saas::before { content: 'Marché — '; color: var(--ink-muted); font-weight: 600; }
  .crm-cmp__sur { background: rgba(27,79,138,.07); border-radius: 10px; margin: 4px 12px 16px; }
  .crm-cmp__sur::before { content: 'Sur mesure — '; color: var(--klein); font-weight: 700; }
}

/* Pourquoi — grandes locutions serif */
.crm-why { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(28px,4vw,56px); max-width: 1120px; }
.crm-why__col { position: relative; transition: transform .45s cubic-bezier(.22,1,.36,1); }
.crm-why__big { display: block; font-family: var(--serif); font-style: italic; font-size: clamp(34px,4vw,56px); line-height: 0.95; margin-bottom: 20px; transition: transform .45s cubic-bezier(.22,1,.36,1); }
.crm-why__title { font-size: clamp(19px,2vw,24px); font-weight: 500; color: #EAE9EE; margin-bottom: 11px; line-height: 1.22; letter-spacing: -0.01em; }
.crm-why__desc { font-size: 15px; line-height: 1.7; color: rgba(234,233,238,.68); }
.crm-why__col:hover { transform: translateY(-4px); }
.crm-why__col:hover .crm-why__big { transform: scale(1.04); }
@media (max-width: 820px) { .crm-why { grid-template-columns: 1fr; gap: 38px; } }

/* Tarif */
.crm-price { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: clamp(40px,6vw,90px); align-items: start; }
@media (max-width: 860px) { .crm-price { grid-template-columns: 1fr; gap: 52px; } }

/* FAQ 2×2 (clair) */
.crm-faq { display: grid; grid-template-columns: 1fr 1fr; gap: 0 clamp(40px,6vw,80px); max-width: 1000px; margin: 0 auto; }
.crm-faq__item { padding: 30px 0; border-top: 0.5px solid var(--line); }
@media (max-width: 760px) { .crm-faq { grid-template-columns: 1fr; } }
`;
