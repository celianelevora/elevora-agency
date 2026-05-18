import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Politique de confidentialité' };

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      pillText="Données personnelles"
      title={`Politique de <span class="italic">confidentialité</span>`}
      lastUpdate="12 mai 2026"
    >
      <p>Elevora s'engage à protéger vos données personnelles dans le respect du Règlement Général sur la Protection des Données (RGPD) et de la loi Informatique et Libertés.</p>

      <h2>1. Responsable du traitement</h2>
      <p>Le responsable du traitement des données personnelles est <strong>Elevora</strong>, dont les coordonnées figurent dans les <a href="/mentions-legales">mentions légales</a>.</p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons les données personnelles que vous nous fournissez volontairement, notamment via :</p>
      <ul>
        <li><strong>Le formulaire de contact :</strong> nom, prénom, email, téléphone (optionnel), entreprise, type de projet, budget, message.</li>
        <li><strong>Les échanges par email ou téléphone :</strong> toute information que vous nous communiquez.</li>
        <li><strong>La navigation sur le site :</strong> données techniques (adresse IP, navigateur, pages visitées) via des outils d'analyse.</li>
      </ul>

      <h2>3. Finalités du traitement</h2>
      <p>Vos données sont utilisées pour :</p>
      <ul>
        <li>Répondre à vos demandes de contact et de devis ;</li>
        <li>Établir et exécuter un contrat de prestation ;</li>
        <li>Vous tenir informé de l'avancement de votre projet ;</li>
        <li>Améliorer notre site et nos services (statistiques anonymisées) ;</li>
        <li>Respecter nos obligations légales et comptables.</li>
      </ul>

      <h2>4. Base légale</h2>
      <ul>
        <li>Votre <strong>consentement</strong> (formulaire de contact, cookies non essentiels) ;</li>
        <li>L'<strong>exécution d'un contrat</strong> (si vous êtes client) ;</li>
        <li>Nos <strong>obligations légales</strong> (conservation des factures, etc.) ;</li>
        <li>Notre <strong>intérêt légitime</strong> (amélioration du service, sécurité du site).</li>
      </ul>

      <h2>5. Destinataires des données</h2>
      <p>Vos données sont strictement destinées à Elevora et ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :</p>
      <ul>
        <li>Notre hébergeur Infomaniak (Suisse, conforme RGPD) ;</li>
        <li>Nos outils internes (CRM, facturation) hébergés en Europe ;</li>
        <li>Les autorités compétentes en cas d'obligation légale.</li>
      </ul>

      <h2>6. Durée de conservation</h2>
      <ul>
        <li><strong>Demandes de contact non transformées :</strong> 3 ans à compter du dernier échange.</li>
        <li><strong>Données client :</strong> durée de la relation contractuelle + 5 ans.</li>
        <li><strong>Documents comptables :</strong> 10 ans (obligation légale).</li>
        <li><strong>Statistiques de navigation :</strong> 13 mois maximum.</li>
      </ul>

      <h2>7. Vos droits</h2>
      <ul>
        <li><strong>Droit d'accès</strong> : obtenir une copie de vos données.</li>
        <li><strong>Droit de rectification</strong> : corriger des données inexactes.</li>
        <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données.</li>
        <li><strong>Droit à la limitation</strong> : demander la suspension du traitement.</li>
        <li><strong>Droit d'opposition</strong> : vous opposer au traitement pour motif légitime.</li>
        <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format réutilisable.</li>
      </ul>
      <p>Pour exercer ces droits : <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a></p>
      <p>Réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a></p>

      <h2>8. Sécurité</h2>
      <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées : chiffrement HTTPS, hébergement sécurisé, accès restreint, sauvegardes régulières.</p>

      <h2>9. Modifications</h2>
      <p>Cette politique peut être modifiée à tout moment. La version en vigueur est celle publiée sur cette page.</p>
    </LegalLayout>
  );
}
