import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Conditions générales de vente — Elevora Agency' };

const TOC = [
  { id: 'objet', label: 'Objet' },
  { id: 'devis', label: 'Devis et commande' },
  { id: 'prix', label: 'Prix et modalités de paiement' },
  { id: 'execution', label: 'Exécution des prestations' },
  { id: 'obligations', label: 'Obligations du client' },
  { id: 'propriete', label: 'Propriété intellectuelle' },
  { id: 'confidentialite', label: 'Confidentialité' },
  { id: 'responsabilite', label: 'Responsabilité' },
  { id: 'resiliation', label: 'Résiliation' },
  { id: 'litiges', label: 'Litiges & droit applicable' },
];

export default function CGVPage() {
  return (
    <LegalLayout
      title={`Conditions <span class="italic">générales de vente</span>`}
      intro="Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre la société Elevora et tout client professionnel souhaitant bénéficier de ses prestations de services numériques."
      lastUpdate="1er juin 2026"
      toc={TOC}
    >
      <section id="objet" className="legal-section">
        <span className="legal-section-num">01</span>
        <h2>Objet et champ d'application</h2>
        <p>Les présentes CGV ont pour objet de définir les conditions dans lesquelles la société Elevora, SAS au capital de 102 €, immatriculée au RCS de Nantes sous le numéro <strong>105 274 112</strong>, fournit à ses clients professionnels des prestations de <strong>conception, développement, hébergement et maintenance</strong> de sites internet, applications web, outils métier et autres services numériques connexes.</p>
        <p>Toute commande passée auprès d'Elevora implique l'<strong>acceptation pleine et entière</strong> des présentes CGV par le client. Elles prévalent sur tout autre document, sauf dérogation expresse, formelle et écrite acceptée par Elevora.</p>
        <p>Les présentes CGV s'adressent <strong>exclusivement à des clients professionnels</strong> (commerçants, artisans, sociétés, professions libérales, associations, collectivités) agissant pour les besoins de leur activité professionnelle.</p>
      </section>

      <section id="devis" className="legal-section">
        <span className="legal-section-num">02</span>
        <h2>Devis, commande et conclusion du contrat</h2>
        <h3>2.1 Devis</h3>
        <p>Toute prestation fait l'objet d'un <strong>devis détaillé</strong> établi gratuitement par Elevora, comprenant la description précise des prestations, le calendrier prévisionnel, le prix forfaitaire ou unitaire, ainsi que les conditions de paiement.</p>
        <p>Le devis est <strong>valable pendant 30 jours</strong> à compter de sa date d'émission, sauf mention contraire.</p>

        <h3>2.2 Commande</h3>
        <p>La commande devient ferme et définitive à la <strong>signature du devis</strong> par le client (signature manuscrite, électronique ou acceptation par email valant signature), accompagnée du versement de l'acompte prévu.</p>

        <h3>2.3 Modifications</h3>
        <p>Toute modification, addition ou suppression demandée par le client après la signature du devis fera l'objet d'un <strong>avenant écrit</strong>, pouvant entraîner une révision du prix et/ou des délais.</p>
      </section>

      <section id="prix" className="legal-section">
        <span className="legal-section-num">03</span>
        <h2>Prix et modalités de paiement</h2>
        <h3>3.1 Prix</h3>
        <p>Les prix sont indiqués <strong>en euros hors taxes (HT)</strong>. La TVA applicable est ajoutée au moment de la facturation au taux en vigueur.</p>

        <h3>3.2 Modalités de paiement</h3>
        <p>Sauf disposition contraire au devis, les modalités de paiement sont les suivantes :</p>
        <ul>
          <li><strong>Acompte de 40 %</strong> à la signature du devis ;</li>
          <li><strong>30 %</strong> à la validation des maquettes ;</li>
          <li><strong>Solde de 30 %</strong> à la livraison finale et la mise en ligne.</li>
        </ul>
        <p>Les paiements s'effectuent par virement bancaire ou tout autre moyen accepté par Elevora. Aucun escompte n'est accordé en cas de paiement anticipé.</p>

        <h3>3.3 Délais de paiement</h3>
        <p>Les factures sont payables à <strong>30 jours fin de mois</strong> à compter de leur date d'émission, sauf accord contraire.</p>

        <h3>3.4 Pénalités de retard</h3>
        <p>Conformément à l'article L. 441-10 du Code de commerce, tout retard de paiement entraîne de plein droit, sans mise en demeure préalable :</p>
        <ul>
          <li>l'application d'<strong>intérêts de retard</strong> calculés au taux d'intérêt appliqué par la Banque centrale européenne à son opération de refinancement la plus récente, majoré de 10 points de pourcentage ;</li>
          <li>une <strong>indemnité forfaitaire pour frais de recouvrement de 40 €</strong> par facture (art. D. 441-5 C. com.) ;</li>
          <li>la possibilité pour Elevora de <strong>suspendre toute prestation en cours</strong> sans préavis ni indemnité.</li>
        </ul>
      </section>

      <section id="execution" className="legal-section">
        <span className="legal-section-num">04</span>
        <h2>Exécution des prestations</h2>
        <h3>4.1 Délais</h3>
        <p>Les délais d'exécution mentionnés au devis sont donnés à titre <strong>indicatif</strong> et ne constituent pas un engagement de résultat absolu. Tout retard imputable au client (validation, transmission d'éléments, paiement) entraînera un report équivalent.</p>

        <h3>4.2 Obligation de moyens</h3>
        <p>Elevora est tenue à une <strong>obligation de moyens</strong> dans l'exécution de ses prestations. Elle s'engage à mettre en œuvre tout le savoir-faire et toute la diligence nécessaires pour fournir une prestation de qualité conforme aux règles de l'art.</p>

        <h3>4.3 Recette et livraison</h3>
        <p>La livraison s'effectue selon les modalités définies au devis. Le client dispose d'un <strong>délai de 7 jours ouvrés</strong> à compter de la livraison pour notifier toute réserve par écrit. Passé ce délai, la prestation est réputée acceptée sans réserve.</p>
      </section>

      <section id="obligations" className="legal-section">
        <span className="legal-section-num">05</span>
        <h2>Obligations du client</h2>
        <p>Le client s'engage à :</p>
        <ul>
          <li>fournir à Elevora, dans les délais convenus, l'ensemble des <strong>éléments nécessaires à l'exécution</strong> des prestations (textes, images, logos, accès, identifiants) ;</li>
          <li>garantir que les éléments transmis sont <strong>libres de tout droit</strong> ou qu'il dispose des autorisations nécessaires à leur utilisation ;</li>
          <li>désigner un <strong>interlocuteur unique</strong>, habilité à prendre toutes décisions relatives au projet ;</li>
          <li>respecter <strong>scrupuleusement</strong> les échéances de paiement convenues ;</li>
          <li>collaborer activement et de bonne foi avec Elevora tout au long du projet.</li>
        </ul>
        <div className="legal-note">
          <div>
            <strong>Garantie d'éviction</strong>
            Le client garantit Elevora contre toute action en contrefaçon, en concurrence déloyale ou pour atteinte aux droits de la personnalité qui pourrait être intentée du fait des éléments fournis par lui.
          </div>
        </div>
      </section>

      <section id="propriete" className="legal-section">
        <span className="legal-section-num">06</span>
        <h2>Propriété intellectuelle</h2>
        <h3>6.1 Cession des droits</h3>
        <p>Sous réserve du <strong>paiement intégral du prix</strong>, Elevora cède au client, à titre exclusif et pour la durée légale de protection des droits d'auteur, les droits patrimoniaux d'exploitation portant sur les livrables finaux (sites, applications, identité visuelle, codes sources).</p>

        <h3>6.2 Éléments préexistants</h3>
        <p>Les outils, méthodologies, bibliothèques, frameworks et savoir-faire préexistants utilisés par Elevora dans le cadre de la prestation <strong>restent sa propriété exclusive</strong>. Le client bénéficie d'un droit d'usage non exclusif pour les seuls besoins du projet livré.</p>

        <h3>6.3 Référence commerciale</h3>
        <p>Sauf demande contraire écrite du client, Elevora se réserve le droit de mentionner les prestations réalisées à titre de <strong>référence commerciale</strong> (portfolio, communication, presse).</p>
      </section>

      <section id="confidentialite" className="legal-section">
        <span className="legal-section-num">07</span>
        <h2>Confidentialité</h2>
        <p>Chacune des parties s'engage à conserver <strong>strictement confidentielles</strong> toutes les informations à caractère commercial, technique, stratégique ou personnel dont elle aurait connaissance dans le cadre de l'exécution du contrat.</p>
        <p>Cette obligation de confidentialité s'applique pendant toute la durée du contrat et persiste <strong>pendant 5 ans</strong> après son terme, à l'exception des informations entrées dans le domaine public sans manquement contractuel.</p>
      </section>

      <section id="responsabilite" className="legal-section">
        <span className="legal-section-num">08</span>
        <h2>Responsabilité</h2>
        <p>La responsabilité d'Elevora ne pourra être engagée que pour les <strong>dommages directs</strong> résultant d'une faute prouvée dans l'exécution de ses obligations. Sont expressément exclus de toute indemnisation les dommages indirects (perte de chiffre d'affaires, perte de clientèle, atteinte à l'image, etc.).</p>
        <p>En tout état de cause, la responsabilité cumulée d'Elevora au titre de l'exécution du contrat est <strong>plafonnée au montant total des sommes effectivement perçues</strong> au titre de la prestation litigieuse.</p>
        <p>Elevora ne saurait être tenue responsable des dommages résultant :</p>
        <ul>
          <li>d'un cas de <strong>force majeure</strong> au sens de l'article 1218 du Code civil ;</li>
          <li>d'une <strong>faute ou négligence du client</strong> ou d'un tiers ;</li>
          <li>d'un <strong>dysfonctionnement</strong> d'un service tiers utilisé par le client (hébergeur tiers, fournisseur, API).</li>
        </ul>
      </section>

      <section id="resiliation" className="legal-section">
        <span className="legal-section-num">09</span>
        <h2>Résiliation</h2>
        <h3>9.1 Résiliation pour manquement</h3>
        <p>En cas de <strong>manquement grave</strong> de l'une des parties à ses obligations, l'autre partie pourra résilier le contrat de plein droit, après mise en demeure restée sans effet pendant <strong>30 jours</strong>.</p>

        <h3>9.2 Conséquences</h3>
        <p>En cas de résiliation imputable au client, les sommes déjà versées restent <strong>définitivement acquises</strong> à Elevora à titre de dommages et intérêts. Les prestations en cours seront facturées au prorata des travaux réalisés.</p>
      </section>

      <section id="litiges" className="legal-section">
        <span className="legal-section-num">10</span>
        <h2>Litiges, droit applicable et juridiction compétente</h2>
        <p>Les présentes CGV sont régies par le <strong>droit français</strong>.</p>
        <p>En cas de litige, les parties s'efforceront de rechercher une <strong>solution amiable</strong> dans un délai raisonnable. À défaut d'accord amiable, <strong>tout litige sera de la compétence exclusive du Tribunal de commerce de Nantes</strong>, nonobstant pluralité de défendeurs ou appel en garantie.</p>
        <div className="legal-info">
          <strong>Information précontractuelle</strong> — Conformément à l'article L. 441-1 du Code de commerce, les présentes CGV constituent le socle unique de la négociation commerciale avec les acheteurs professionnels. Tout client peut en obtenir communication sur simple demande.
        </div>
      </section>
    </LegalLayout>
  );
}
