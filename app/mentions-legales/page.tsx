import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Mentions légales — Elevora Agency' };

const TOC = [
  { id: 'editeur', label: 'Éditeur du site' },
  { id: 'publication', label: 'Direction de la publication' },
  { id: 'hebergeur', label: 'Hébergeur' },
  { id: 'contact', label: 'Coordonnées de contact' },
  { id: 'propriete', label: 'Propriété intellectuelle' },
  { id: 'donnees', label: 'Protection des données' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'responsabilite', label: 'Limitation de responsabilité' },
  { id: 'droit', label: 'Droit applicable' },
  { id: 'mediation', label: 'Médiation' },
];

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      pillText="Informations légales"
      title={`Mentions <span class="italic">légales</span>`}
      intro="Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), les informations suivantes sont portées à la connaissance des utilisateurs du site elevora-agency.com."
      lastUpdate="1er juin 2026"
      toc={TOC}
    >
      <section id="editeur" className="legal-section">
        <span className="legal-section-num">01</span>
        <h2>Éditeur du site</h2>
        <p>Le site elevora-agency.com est édité par :</p>
        <dl>
          <dt>Dénomination sociale</dt><dd>Elevora</dd>
          <dt>Forme juridique</dt><dd>Société par actions simplifiée (SAS)</dd>
          <dt>Capital social</dt><dd>102,00 €</dd>
          <dt>Siège social</dt><dd>96 rue des Sports, 44840 Les Sorinières, France</dd>
          <dt>RCS</dt><dd>Nantes 105 274 112</dd>
          <dt>SIREN</dt><dd>105 274 112</dd>
          <dt>SIRET (siège)</dt><dd>10527411200017</dd>
          <dt>Code APE / NAF</dt><dd>6201Z — Programmation informatique</dd>
          <dt>N° TVA intracommunautaire</dt><dd>FR48 105 274 112</dd>
          <dt>Identifiant européen (EUID)</dt><dd>FR4401.105274112</dd>
          <dt>Date d'immatriculation</dt><dd>26 mai 2026</dd>
        </dl>
      </section>

      <section id="publication" className="legal-section">
        <span className="legal-section-num">02</span>
        <h2>Direction de la publication</h2>
        <p>Le directeur de la publication du site, au sens de l'article 6-III de la LCEN, est :</p>
        <dl>
          <dt>Nom</dt><dd>Celian Soulet Lapetina</dd>
          <dt>Qualité</dt><dd>Président de la société Elevora</dd>
          <dt>Contact</dt><dd><a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a></dd>
        </dl>
      </section>

      <section id="hebergeur" className="legal-section">
        <span className="legal-section-num">03</span>
        <h2>Hébergeur</h2>
        <p>Le site est hébergé par :</p>
        <dl>
          <dt>Raison sociale</dt><dd>Infomaniak Network SA</dd>
          <dt>Forme juridique</dt><dd>Société anonyme de droit suisse</dd>
          <dt>Adresse</dt><dd>Rue Eugène-Marziano 25, 1227 Les Acacias (Genève), Suisse</dd>
          <dt>Téléphone</dt><dd>+41 22 820 35 44</dd>
          <dt>Site web</dt><dd><a href="https://www.infomaniak.com" target="_blank" rel="noopener noreferrer">www.infomaniak.com</a></dd>
        </dl>
        <div className="legal-note">
          <div>
            <strong>Localisation des données</strong>
            Les serveurs d'Infomaniak sont situés en Suisse. La Suisse bénéficie d'une décision d'adéquation de la Commission européenne (décision 2000/518/CE), garantissant un niveau de protection des données équivalent à celui de l'Union européenne.
          </div>
        </div>
      </section>

      <section id="contact" className="legal-section">
        <span className="legal-section-num">04</span>
        <h2>Coordonnées de contact</h2>
        <p>Pour toute question relative au site ou à nos services, vous pouvez nous contacter aux coordonnées suivantes :</p>
        <dl>
          <dt>Adresse postale</dt><dd>Elevora — 96 rue des Sports, 44840 Les Sorinières, France</dd>
          <dt>Email</dt><dd><a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a></dd>
          <dt>Téléphone</dt><dd>+33 (0)7 78 43 57 21</dd>
        </dl>
      </section>

      <section id="propriete" className="legal-section">
        <span className="legal-section-num">05</span>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble des éléments composant le site elevora-agency.com — incluant notamment les <strong>textes, photographies, illustrations, schémas, animations, vidéos, logos, marques, identité visuelle, code source, base de données, structures de pages</strong>, ainsi que tout élément graphique ou audiovisuel — est la propriété exclusive de la société Elevora ou de ses concédants.</p>
        <p>Toute reproduction, représentation, modification, publication, adaptation ou exploitation, partielle ou totale, des éléments du site, par quelque procédé que ce soit et sur quelque support que ce soit, est <strong>strictement interdite sans autorisation écrite préalable</strong> de la société Elevora, sous peine de constituer une contrefaçon sanctionnée par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.</p>
        <p>La marque <strong>Elevora</strong> ainsi que tous les signes distinctifs reproduits sur le site sont des marques déposées ou en cours de dépôt.</p>
        <h3>Liens hypertextes</h3>
        <p>La création de liens hypertextes vers le site elevora-agency.com est libre, sous réserve qu'elle ne porte pas atteinte à l'image de la société Elevora et qu'elle ne soit pas effectuée dans un but commercial ou publicitaire non autorisé.</p>
      </section>

      <section id="donnees" className="legal-section">
        <span className="legal-section-num">06</span>
        <h2>Protection des données personnelles</h2>
        <p>Les traitements de données à caractère personnel opérés dans le cadre du site sont conformes au <strong>Règlement (UE) 2016/679 du 27 avril 2016 (RGPD)</strong> et à la <strong>loi n° 78-17 du 6 janvier 1978</strong> modifiée dite « Informatique et Libertés ».</p>
        <p>Le détail des traitements, des finalités, des bases juridiques, des durées de conservation ainsi que des droits dont vous disposez (accès, rectification, effacement, opposition, limitation, portabilité, retrait du consentement) est exposé dans notre <a href="/confidentialite">Politique de confidentialité</a>.</p>
        <p>Pour exercer vos droits : <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a>.</p>
        <p>Vous disposez du droit d'introduire une réclamation auprès de la <strong>CNIL</strong> — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.</p>
      </section>

      <section id="cookies" className="legal-section">
        <span className="legal-section-num">07</span>
        <h2>Cookies</h2>
        <p>Le site n'utilise actuellement que des <strong>cookies strictement nécessaires à son fonctionnement</strong>, dispensés du recueil du consentement préalable conformément à la délibération CNIL du 17 septembre 2020.</p>
        <p>Les modalités de gestion des cookies sont précisées dans notre <a href="/cookies">Politique de gestion des cookies</a>.</p>
      </section>

      <section id="responsabilite" className="legal-section">
        <span className="legal-section-num">08</span>
        <h2>Limitation de responsabilité</h2>
        <p>La société Elevora s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur le site, dont elle se réserve le droit de corriger à tout moment et sans préavis. Elevora ne peut garantir l'exactitude, la précision, l'actualité ou l'exhaustivité des informations mises à disposition.</p>
        <p>En conséquence, Elevora décline toute responsabilité :</p>
        <ul>
          <li>pour toute <strong>imprécision, inexactitude ou omission</strong> portant sur des informations disponibles sur le site ;</li>
          <li>pour tous dommages résultant d'une <strong>intrusion frauduleuse d'un tiers</strong> ayant entraîné une modification des informations mises à disposition ;</li>
          <li>et plus généralement de tous dommages, directs ou indirects, quelles qu'en soient les causes, origines, natures ou conséquences.</li>
        </ul>
      </section>

      <section id="droit" className="legal-section">
        <span className="legal-section-num">09</span>
        <h2>Droit applicable et juridiction compétente</h2>
        <p>Les présentes mentions légales sont <strong>régies par le droit français</strong>. En cas de litige relatif à l'utilisation du site, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.</p>
      </section>

      <section id="mediation" className="legal-section">
        <span className="legal-section-num">10</span>
        <h2>Médiation</h2>
        <p>Conformément à l'article L. 612-1 du Code de la consommation, tout client consommateur a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige avec Elevora.</p>
        <div className="legal-info">
          Pour engager une procédure de médiation, le client devra préalablement avoir tenté de résoudre le litige directement auprès d'Elevora par une réclamation écrite à <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a>.
        </div>
      </section>
    </LegalLayout>
  );
}
