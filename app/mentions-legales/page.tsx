import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Mentions légales' };

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      pillText="Informations légales"
      title={`Mentions <span class="italic">légales</span>`}
      lastUpdate="12 mai 2026"
    >
      <h2>1. Éditeur du site</h2>
      <p>Le présent site est édité par <strong>Elevora</strong>, agence digitale.</p>
      <ul>
        <li><strong>Forme juridique :</strong> [À compléter — SAS, SASU, EI, etc.]</li>
        <li><strong>Siège social :</strong> Nantes, France</li>
        <li><strong>SIRET :</strong> [À compléter]</li>
        <li><strong>RCS :</strong> [À compléter]</li>
        <li><strong>TVA intracommunautaire :</strong> [À compléter]</li>
        <li><strong>Email :</strong> <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a></li>
        <li><strong>Téléphone :</strong> 07 78 43 57 21</li>
        <li><strong>Directeur de la publication :</strong> [À compléter]</li>
      </ul>

      <h2>2. Hébergement</h2>
      <p>Le site est hébergé par :</p>
      <ul>
        <li><strong>Infomaniak Network SA</strong></li>
        <li>Rue Eugène-Marziano 25, 1227 Les Acacias (GE), Suisse</li>
        <li>Site : <a href="https://www.infomaniak.com" target="_blank" rel="noopener">www.infomaniak.com</a></li>
      </ul>

      <h2>3. Propriété intellectuelle</h2>
      <p>L'ensemble du site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive d'Elevora, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.</p>
      <p>Toute reproduction, représentation, modification, publication, adaptation totale ou partielle des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable d'Elevora.</p>

      <h2>4. Responsabilité</h2>
      <p>Les informations contenues sur ce site sont aussi précises que possible et mises à jour régulièrement. Toutefois, des erreurs ou omissions peuvent survenir. Merci de nous les signaler par email.</p>
      <p>Elevora ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site.</p>

      <h2>5. Liens externes</h2>
      <p>Le site peut contenir des liens vers des sites tiers. Elevora n'a aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à leur utilisation.</p>

      <h2>6. Droit applicable</h2>
      <p>Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l'utilisation du site est de la compétence des tribunaux français.</p>

      <h2>7. Contact</h2>
      <p>Pour toute question : <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a></p>
    </LegalLayout>
  );
}
