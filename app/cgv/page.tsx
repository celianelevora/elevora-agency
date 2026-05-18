import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'CGV — Conditions générales de vente' };

export default function CGVPage() {
  return (
    <LegalLayout
      pillText="Conditions générales"
      title={`Conditions générales <span class="italic">de vente</span>`}
      lastUpdate="12 mai 2026"
    >
      <h2>Article 1 — Objet</h2>
      <p>Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des prestations de services proposées par <strong>Elevora</strong> (« le Prestataire ») à toute personne physique ou morale (« le Client »).</p>

      <h2>Article 2 — Devis et commande</h2>
      <p>Toute prestation fait l'objet d'un devis détaillé, gratuit et sans engagement. Le devis précise la nature des prestations, les délais d'exécution, le prix et les modalités de paiement.</p>
      <p>Le devis est valable <strong>30 jours</strong> à compter de sa date d'émission. La signature du devis (ou son acceptation par email) vaut acceptation des présentes CGV.</p>

      <h2>Article 3 — Prix et conditions de paiement</h2>
      <p>Les prix sont indiqués en euros, hors taxes. La TVA est ajoutée selon le taux en vigueur.</p>
      <p>Sauf disposition contraire au devis :</p>
      <ul>
        <li><strong>40 %</strong> à la signature du devis (acompte) ;</li>
        <li><strong>30 %</strong> à la validation des maquettes ;</li>
        <li><strong>30 %</strong> à la livraison du projet.</li>
      </ul>
      <p>Les factures sont payables sous <strong>15 jours</strong> par virement bancaire. En cas de retard, pénalités de 3 fois le taux d'intérêt légal et indemnité forfaitaire de 40 € (article L.441-10 du Code de commerce).</p>

      <h2>Article 4 — Délais et obligations du Client</h2>
      <p>Les délais indiqués au devis sont donnés à titre indicatif. Ils dépendent de la réactivité du Client à fournir les éléments nécessaires (contenus, validations, accès).</p>
      <p>Le Client s'engage à :</p>
      <ul>
        <li>Fournir les contenus et informations dans les délais convenus ;</li>
        <li>Valider les livrables intermédiaires dans un délai raisonnable ;</li>
        <li>Désigner un interlocuteur unique en capacité de décider.</li>
      </ul>

      <h2>Article 5 — Modifications et avenants</h2>
      <p>Toute demande de modification hors périmètre initial fera l'objet d'un avenant chiffré, soumis à validation préalable du Client.</p>

      <h2>Article 6 — Livraison et recette</h2>
      <p>La livraison est réputée acceptée à l'issue d'une période de recette de <strong>15 jours</strong>, sauf réserves écrites motivées formulées durant cette période.</p>

      <h2>Article 7 — Propriété intellectuelle</h2>
      <p>À compter du paiement intégral, le Client devient propriétaire de l'ensemble des livrables, y compris le code source. Elevora reste propriétaire des éléments réutilisables développés pour ses propres besoins.</p>
      <p>Le Client autorise Elevora à mentionner le projet à titre de référence sauf accord de confidentialité explicite.</p>

      <h2>Article 8 — Garantie et suivi</h2>
      <p>Elevora garantit la conformité des livrables au devis pendant <strong>30 jours</strong> après livraison. Les corrections de bugs et ajustements mineurs sont inclus gratuitement pendant cette période.</p>

      <h2>Article 9 — Hébergement</h2>
      <p>L'hébergement est assuré par <strong>Infomaniak</strong> (Suisse). Les coûts d'hébergement, de nom de domaine et de licences éventuelles sont à la charge du Client, sauf mention contraire.</p>

      <h2>Article 10 — Résiliation</h2>
      <p>En cas de manquement grave, résiliation possible après mise en demeure restée infructueuse pendant 15 jours. En cas de résiliation à l'initiative du Client, les sommes versées restent acquises à Elevora au titre du travail effectué.</p>

      <h2>Article 11 — Responsabilité</h2>
      <p>La responsabilité d'Elevora est limitée au montant total facturé au titre du contrat. Elevora ne peut être tenu responsable des dommages indirects ni des défaillances de services tiers.</p>

      <h2>Article 12 — Confidentialité</h2>
      <p>Chaque partie s'engage à préserver la confidentialité des informations échangées dans le cadre de la prestation.</p>

      <h2>Article 13 — Litiges</h2>
      <p>Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux français seront seuls compétents.</p>
    </LegalLayout>
  );
}
