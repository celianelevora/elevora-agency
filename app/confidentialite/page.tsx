import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Politique de confidentialité — Elevora Agency' };

const TOC = [
  { id: 'responsable', label: 'Responsable de traitement' },
  { id: 'donnees', label: 'Données collectées' },
  { id: 'finalites', label: 'Finalités & bases légales' },
  { id: 'destinataires', label: 'Destinataires & sous-traitants' },
  { id: 'transferts', label: 'Transferts hors UE' },
  { id: 'duree', label: 'Durées de conservation' },
  { id: 'securite', label: 'Sécurité des données' },
  { id: 'droits', label: 'Vos droits' },
  { id: 'mineurs', label: 'Données des mineurs' },
  { id: 'modifications', label: 'Modifications' },
];

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      title={`Politique de <span class="italic">confidentialité</span>`}
      intro="La société Elevora attache une importance particulière à la protection de votre vie privée et de vos données personnelles. La présente politique détaille la manière dont nous collectons, utilisons et protégeons vos données dans le respect du Règlement (UE) 2016/679 (RGPD) et de la loi Informatique et Libertés."
      lastUpdate="1er juin 2026"
      toc={TOC}
    >
      <section id="responsable" className="legal-section">
        <span className="legal-section-num">01</span>
        <h2>Responsable de traitement</h2>
        <p>Le responsable du traitement des données collectées via le site elevora-agency.com est :</p>
        <p><strong>Elevora</strong>, société par actions simplifiée au capital de 102 €, immatriculée au Registre du Commerce et des Sociétés de Nantes sous le numéro <strong>105 274 112</strong>, dont le siège social est situé au 96 rue des Sports, 44840 Les Sorinières (France), représentée par son Président, Celian Soulet Lapetina.</p>
        <p>Pour toute question relative au traitement de vos données : <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a>.</p>
        <div className="legal-note">
          <div>
            <strong>Pas de DPO désigné</strong>
            Elevora n'a pas désigné de Délégué à la Protection des Données (DPO) dans la mesure où son activité ne relève pas des cas prévus à l'article 37 du RGPD. Toutes les demandes relatives à vos droits sont traitées directement par la direction d'Elevora.
          </div>
        </div>
      </section>

      <section id="donnees" className="legal-section">
        <span className="legal-section-num">02</span>
        <h2>Données personnelles collectées</h2>
        <p>Nous collectons et traitons uniquement les données strictement nécessaires aux finalités décrites ci-après. <strong>Aucune donnée sensible</strong> au sens de l'article 9 du RGPD (santé, opinions politiques, religieuses, orientation sexuelle, etc.) n'est collectée.</p>

        <h3>2.1 Données collectées via le formulaire de contact</h3>
        <p>Lorsque vous utilisez le formulaire de contact présent sur notre site, nous collectons les informations suivantes :</p>
        <ul>
          <li><strong>Nom et prénom</strong> (obligatoire)</li>
          <li><strong>Adresse email</strong> (obligatoire)</li>
          <li>Numéro de téléphone (facultatif)</li>
          <li>Nom de l'entreprise (facultatif)</li>
          <li><strong>Contenu du message</strong> (obligatoire)</li>
        </ul>

        <h3>2.2 Données collectées via le formulaire de demande de devis</h3>
        <p>Lorsque vous sollicitez un devis pour l'une de nos prestations, nous collectons en complément :</p>
        <ul>
          <li>Type de projet envisagé (site vitrine, e-commerce, refonte, etc.)</li>
          <li>Description du projet et besoins exprimés</li>
          <li>Budget indicatif et délai souhaité (facultatif)</li>
          <li>Toute information complémentaire que vous souhaitez nous transmettre</li>
        </ul>

        <h3>2.3 Données techniques de connexion</h3>
        <p>Lors de votre navigation, des données techniques sont collectées par notre hébergeur dans le cadre de la sécurisation du site : adresse IP, type et version du navigateur, système d'exploitation, pages consultées, date et heure de connexion. Ces données sont conservées dans les journaux d'accès de l'hébergeur pour une durée limitée.</p>

        <div className="legal-note">
          <div>
            <strong>Champs obligatoires</strong>
            Les champs marqués comme obligatoires dans nos formulaires sont indispensables pour traiter votre demande. À défaut, nous ne serions pas en mesure d'y donner suite.
          </div>
        </div>
      </section>

      <section id="finalites" className="legal-section">
        <span className="legal-section-num">03</span>
        <h2>Finalités & bases légales des traitements</h2>
        <p>Chaque traitement de données mis en œuvre par Elevora poursuit une finalité déterminée et repose sur l'une des bases légales prévues à l'article 6 du RGPD :</p>
        <table>
          <thead>
            <tr><th>Finalité</th><th>Base légale</th><th>Données</th></tr>
          </thead>
          <tbody>
            <tr><td>Répondre à une demande de contact</td><td>Mesures précontractuelles (art. 6.1.b)</td><td>Nom, email, téléphone, message</td></tr>
            <tr><td>Établir un devis et formuler une proposition</td><td>Mesures précontractuelles (art. 6.1.b)</td><td>Identité, coordonnées, données projet</td></tr>
            <tr><td>Gérer la relation client (contrat, facturation, support)</td><td>Exécution d'un contrat (art. 6.1.b)</td><td>Identité, coordonnées pro, données contractuelles</td></tr>
            <tr><td>Respect d'obligations comptables et fiscales</td><td>Obligation légale (art. 6.1.c)</td><td>Données de facturation</td></tr>
            <tr><td>Sécurité du site et prévention des abus</td><td>Intérêt légitime (art. 6.1.f)</td><td>Adresse IP, données de connexion</td></tr>
            <tr><td>Prospection commerciale B2B</td><td>Intérêt légitime (art. 6.1.f) — droit d'opposition garanti</td><td>Email pro, identité</td></tr>
          </tbody>
        </table>
      </section>

      <section id="destinataires" className="legal-section">
        <span className="legal-section-num">04</span>
        <h2>Destinataires & sous-traitants</h2>
        <p>Vos données sont traitées par le personnel habilité de la société Elevora dans la stricte limite des finalités décrites ci-dessus. Elles ne sont <strong>en aucun cas vendues, louées ou cédées</strong> à des tiers à des fins commerciales.</p>
        <p>Dans le cadre de l'exécution de nos prestations, nous pouvons être amenés à faire intervenir des prestataires techniques tiers (sous-traitants au sens de l'article 28 du RGPD) :</p>
        <table>
          <thead>
            <tr><th>Sous-traitant</th><th>Rôle</th><th>Localisation</th></tr>
          </thead>
          <tbody>
            <tr><td>Infomaniak Network SA</td><td>Hébergement du site et envoi d'emails transactionnels</td><td>Suisse (décision d'adéquation)</td></tr>
            <tr><td>Supabase Inc.</td><td>Base de données CRM interne — stockage demandes contact/devis</td><td>UE (Francfort) — entreprise US</td></tr>
            <tr><td>Olinda SAS (Qonto)</td><td>Établissement de paiement (comptes pro, facturation)</td><td>UE (France)</td></tr>
          </tbody>
        </table>
        <p>Nous pouvons également communiquer vos données à des <strong>autorités administratives ou judiciaires</strong> lorsqu'une obligation légale l'impose, ainsi qu'à nos conseils (expert-comptable, avocat).</p>
      </section>

      <section id="transferts" className="legal-section">
        <span className="legal-section-num">05</span>
        <h2>Transferts de données hors Union européenne</h2>
        <p>Dans la mesure du possible, nous privilégions des prestataires établis dans l'Union européenne ou disposant d'une garantie de protection équivalente.</p>
        <p>Lorsque des transferts de données hors UE sont nécessaires, ceux-ci sont encadrés conformément aux articles 44 à 49 du RGPD, notamment par : une <strong>décision d'adéquation</strong> de la Commission européenne, des <strong>clauses contractuelles types</strong> (CCT), ou toute autre garantie appropriée prévue par le RGPD.</p>
      </section>

      <section id="duree" className="legal-section">
        <span className="legal-section-num">06</span>
        <h2>Durées de conservation</h2>
        <p>Les données collectées sont conservées pour une durée n'excédant pas celle nécessaire aux finalités pour lesquelles elles sont traitées :</p>
        <table>
          <thead>
            <tr><th>Donnée</th><th>Durée de conservation</th></tr>
          </thead>
          <tbody>
            <tr><td>Demandes de contact (formulaire)</td><td>3 ans à compter du dernier contact</td></tr>
            <tr><td>Demandes de devis non concrétisées</td><td>3 ans à compter de la dernière demande</td></tr>
            <tr><td>Données contractuelles (clients)</td><td>5 ans après la fin de la relation contractuelle</td></tr>
            <tr><td>Factures et pièces comptables</td><td>10 ans (obligation légale, art. L. 123-22 C. com.)</td></tr>
            <tr><td>Logs de connexion (hébergeur)</td><td>12 mois maximum</td></tr>
          </tbody>
        </table>
      </section>

      <section id="securite" className="legal-section">
        <span className="legal-section-num">07</span>
        <h2>Sécurité des données</h2>
        <p>Elevora met en œuvre les <strong>mesures techniques et organisationnelles appropriées</strong> pour garantir la sécurité, l'intégrité et la confidentialité de vos données personnelles, notamment :</p>
        <ul>
          <li>Chiffrement des échanges via protocole HTTPS (TLS)</li>
          <li>Accès aux données limité au personnel habilité</li>
          <li>Sauvegardes régulières et redondance des données</li>
          <li>Mots de passe robustes et authentification renforcée</li>
          <li>Sensibilisation continue du personnel aux enjeux RGPD</li>
        </ul>
      </section>

      <section id="droits" className="legal-section">
        <span className="legal-section-num">08</span>
        <h2>Vos droits</h2>
        <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :</p>
        <ul>
          <li><strong>Droit d'accès</strong> (art. 15 RGPD) — obtenir confirmation et copie de vos données</li>
          <li><strong>Droit de rectification</strong> (art. 16) — corriger des données inexactes</li>
          <li><strong>Droit à l'effacement</strong> (art. 17) — supprimer vos données (« droit à l'oubli »)</li>
          <li><strong>Droit à la limitation</strong> (art. 18) — geler temporairement un traitement</li>
          <li><strong>Droit à la portabilité</strong> (art. 20) — récupérer vos données dans un format structuré</li>
          <li><strong>Droit d'opposition</strong> (art. 21) — vous opposer à un traitement</li>
          <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
          <li><strong>Droit d'introduire une réclamation auprès de la CNIL</strong></li>
        </ul>
        <p>Pour exercer vos droits, écrivez-nous à <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a> en justifiant de votre identité. Nous nous engageons à vous répondre dans un délai d'un mois.</p>
      </section>

      <section id="mineurs" className="legal-section">
        <span className="legal-section-num">09</span>
        <h2>Données des mineurs</h2>
        <p>Nos services s'adressent <strong>exclusivement à des professionnels majeurs</strong>. Nous ne collectons pas sciemment de données personnelles de mineurs de moins de 16 ans. Si vous estimez qu'un mineur nous a transmis des données, contactez-nous immédiatement pour leur suppression.</p>
      </section>

      <section id="modifications" className="legal-section">
        <span className="legal-section-num">10</span>
        <h2>Modifications de cette politique</h2>
        <p>Elevora se réserve le droit de modifier la présente politique à tout moment, notamment pour se conformer à toute évolution réglementaire, jurisprudentielle, éditoriale ou technique. Les modifications entreront en vigueur dès leur publication sur cette page.</p>
        <p>Nous vous invitons à consulter régulièrement la version la plus récente.</p>
      </section>
    </LegalLayout>
  );
}
