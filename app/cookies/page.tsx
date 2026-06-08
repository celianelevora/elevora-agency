import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Politique de cookies — Elevora Agency' };

const TOC = [
  { id: 'definition', label: 'Définition' },
  { id: 'cookies-utilises', label: 'Cookies utilisés sur le site' },
  { id: 'consentement', label: 'Consentement' },
  { id: 'duree', label: 'Durée de conservation' },
  { id: 'navigateur', label: 'Paramétrage du navigateur' },
  { id: 'evolution', label: 'Évolution de la politique' },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      title={`Politique de <span class="italic">cookies</span>`}
      intro="La présente politique a pour objet d'informer les utilisateurs du site elevora-agency.com sur l'utilisation des cookies et autres traceurs, conformément à l'article 82 de la loi Informatique et Libertés et aux lignes directrices de la CNIL du 17 septembre 2020."
      lastUpdate="1er juin 2026"
      toc={TOC}
    >
      <section id="definition" className="legal-section">
        <span className="legal-section-num">01</span>
        <h2>Qu'est-ce qu'un cookie ?</h2>
        <p>Un cookie est un <strong>petit fichier texte déposé sur votre terminal</strong> (ordinateur, smartphone, tablette) lors de la consultation d'un site internet. Il permet au site de reconnaître votre terminal lors de visites ultérieures et de mémoriser certaines informations relatives à votre navigation.</p>
        <p>Les cookies peuvent poursuivre différentes finalités : assurer le bon fonctionnement technique du site, mémoriser vos préférences, mesurer son audience, vous proposer des contenus personnalisés, partager des contenus sur les réseaux sociaux, etc.</p>
        <p>Le terme « cookie » est utilisé ici au sens large : il recouvre tout traceur déposé ou lu lors de la consultation du site, qu'il s'agisse d'un <strong>cookie HTTP</strong>, de stockage local (<em>localStorage</em>, <em>sessionStorage</em>), de <strong>pixel invisible</strong> (<em>pixel tracking</em>), d'empreinte de terminal (<em>fingerprinting</em>) ou de toute technologie équivalente.</p>
      </section>

      <section id="cookies-utilises" className="legal-section">
        <span className="legal-section-num">02</span>
        <h2>Cookies utilisés sur le site elevora-agency.com</h2>
        <p>À la date de la dernière mise à jour de la présente politique, le site n'utilise que des <strong>cookies strictement nécessaires</strong> à son fonctionnement. <strong>Aucun cookie publicitaire, de mesure d'audience, de réseau social ou de tracking comportemental n'est déposé.</strong></p>

        <h3>2.1 Cookies strictement nécessaires</h3>
        <p>Ces cookies sont indispensables au fonctionnement du site et permettent notamment d'assurer la sécurité de la navigation, la communication avec nos serveurs et la prévention des attaques. Conformément à l'article 82 de la loi Informatique et Libertés, ces cookies sont <strong>exemptés du recueil de consentement préalable</strong>.</p>
        <table>
          <thead>
            <tr><th>Cookie</th><th>Finalité</th><th>Durée</th><th>Émetteur</th></tr>
          </thead>
          <tbody>
            <tr><td>Cookies de session</td><td>Maintien d'une session cohérente</td><td>Session</td><td>elevora-agency.com</td></tr>
            <tr><td>Token CSRF</td><td>Protection contre les attaques inter-sites</td><td>Session</td><td>elevora-agency.com</td></tr>
            <tr><td>Préférences techniques</td><td>Mémorisation de préférences essentielles</td><td>12 mois max.</td><td>elevora-agency.com</td></tr>
          </tbody>
        </table>

        <h3>2.2 Cookies non utilisés actuellement</h3>
        <p>Nous n'utilisons pas, à ce jour :</p>
        <ul>
          <li>de cookies de <strong>mesure d'audience</strong> (Google Analytics, Matomo, Plausible, etc.) ;</li>
          <li>de cookies <strong>publicitaires</strong> ou de <strong>retargeting</strong> ;</li>
          <li>de cookies de <strong>réseaux sociaux</strong> (Facebook Pixel, LinkedIn Insight, etc.) ;</li>
          <li>de cookies de <strong>tracking comportemental</strong>.</li>
        </ul>
        <p>Si ces pratiques venaient à évoluer, la présente politique serait mise à jour et un mécanisme de recueil du consentement conforme aux exigences de la CNIL serait alors mis en place.</p>
      </section>

      <section id="consentement" className="legal-section">
        <span className="legal-section-num">03</span>
        <h2>Consentement</h2>
        <p>Les cookies strictement nécessaires au fonctionnement du site étant <strong>dispensés du recueil du consentement</strong>, aucun bandeau de gestion des cookies n'est actuellement affiché.</p>
        <p>Si nous venions à déposer des cookies non exemptés (mesure d'audience non-exemptée, publicité, réseaux sociaux), nous mettrions en place un mécanisme de consentement conforme aux lignes directrices de la CNIL : information préalable claire, choix granulaire, refus aussi simple que l'acceptation, conservation de la preuve du consentement.</p>
      </section>

      <section id="duree" className="legal-section">
        <span className="legal-section-num">04</span>
        <h2>Durée de conservation des cookies</h2>
        <p>Conformément aux recommandations de la CNIL, la durée de vie des cookies est <strong>limitée à 13 mois maximum</strong>. Au-delà de cette durée, le cookie expire automatiquement et un nouveau consentement (si applicable) doit être recueilli.</p>
      </section>

      <section id="navigateur" className="legal-section">
        <span className="legal-section-num">05</span>
        <h2>Paramétrage de votre navigateur</h2>
        <p>Vous pouvez à tout moment <strong>paramétrer votre navigateur</strong> pour qu'il vous avertisse de l'enregistrement d'un cookie, le refuse, ou pour effacer les cookies déjà installés. Voici les liens vers les pages d'aide des principaux navigateurs :</p>
        <ul>
          <li><strong>Chrome</strong> : <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">support.google.com/chrome</a></li>
          <li><strong>Firefox</strong> : <a href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur" target="_blank" rel="noopener noreferrer">support.mozilla.org</a></li>
          <li><strong>Safari</strong> : <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">support.apple.com</a></li>
          <li><strong>Edge</strong> : <a href="https://support.microsoft.com/fr-fr/microsoft-edge/" target="_blank" rel="noopener noreferrer">support.microsoft.com</a></li>
        </ul>
        <div className="legal-note">
          <div>
            <strong>Conséquences du refus</strong>
            Le refus des cookies strictement nécessaires peut entraîner un dysfonctionnement de certaines parties du site (impossibilité de soumettre un formulaire, perte de session, etc.).
          </div>
        </div>
      </section>

      <section id="evolution" className="legal-section">
        <span className="legal-section-num">06</span>
        <h2>Évolution de cette politique</h2>
        <p>La présente politique de cookies peut être mise à jour à tout moment pour tenir compte de l'évolution réglementaire, jurisprudentielle, éditoriale ou technique. Toute évolution sera publiée sur cette page avec une mise à jour de la date de dernière révision.</p>
        <p>Pour toute question, contactez-nous à <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a>.</p>
      </section>
    </LegalLayout>
  );
}
