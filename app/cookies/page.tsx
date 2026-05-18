import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Politique de gestion des cookies' };

export default function CookiesPage() {
  return (
    <LegalLayout
      pillText="Cookies & traceurs"
      title={`Politique de gestion <span class="italic">des cookies</span>`}
      lastUpdate="12 mai 2026"
    >
      <p>Cette page explique comment Elevora utilise les cookies et traceurs sur son site, conformément à la réglementation en vigueur (RGPD et directive ePrivacy).</p>

      <h2>1. Qu'est-ce qu'un cookie ?</h2>
      <p>Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette) lors de la visite d'un site web. Il permet au site de mémoriser des informations sur votre navigation pour faciliter votre visite ultérieure ou pour des fins statistiques.</p>

      <h2>2. Les cookies que nous utilisons</h2>

      <h3>2.1 Cookies strictement nécessaires</h3>
      <p>Ces cookies sont indispensables au fonctionnement du site. Ils ne nécessitent pas votre consentement.</p>
      <table className="cookie-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Finalité</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>session_id</td>
            <td>Session technique du site</td>
            <td>Session</td>
          </tr>
          <tr>
            <td>cookie_consent</td>
            <td>Mémorise vos préférences cookies</td>
            <td>6 mois</td>
          </tr>
        </tbody>
      </table>

      <h3>2.2 Cookies de mesure d'audience</h3>
      <p>Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site. Ils sont soumis à votre consentement.</p>
      <table className="cookie-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Émetteur</th>
            <th>Finalité</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_plausible</td>
            <td>Plausible Analytics</td>
            <td>Statistiques anonymisées</td>
            <td>30 jours</td>
          </tr>
        </tbody>
      </table>
      <p>Nous privilégions <strong>Plausible Analytics</strong>, un outil d'analyse respectueux de la vie privée, hébergé en Europe, qui ne suit pas les utilisateurs entre les sites et ne collecte aucune donnée personnelle.</p>

      <h3>2.3 Cookies tiers</h3>
      <p>Nous n'utilisons <strong>aucun cookie publicitaire</strong>, <strong>aucun cookie de réseaux sociaux</strong> ni de pixels de tracking marketing.</p>

      <h2>3. Gérer vos préférences</h2>
      <p>Lors de votre première visite, un bandeau vous permet d'accepter ou de refuser les cookies non essentiels. Vous pouvez à tout moment modifier vos préférences via les paramètres de votre navigateur.</p>

      <h3>Désactiver les cookies dans votre navigateur</h3>
      <ul>
        <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies et autres données des sites</li>
        <li><strong>Firefox :</strong> Paramètres → Vie privée et sécurité → Cookies et données de sites</li>
        <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies et données de site web</li>
        <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
      </ul>

      <p style={{ marginTop: 16 }}>Attention : la désactivation de certains cookies peut affecter le bon fonctionnement du site.</p>

      <h2>4. Durée de conservation</h2>
      <p>Vos préférences en matière de cookies sont conservées pendant <strong>6 mois</strong>. Au-delà, le bandeau de consentement vous sera de nouveau présenté.</p>

      <h2>5. Plus d'informations</h2>
      <p>Pour plus de détails sur la protection de vos données, consultez notre <a href="/confidentialite">politique de confidentialité</a> ou contactez-nous à <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a>.</p>
      <p>Vous pouvez également consulter le site de la CNIL : <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener">www.cnil.fr</a></p>
    </LegalLayout>
  );
}
