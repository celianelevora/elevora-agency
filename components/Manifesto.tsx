'use client';

import { useEffect, useRef } from 'react';

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) el.classList.add('in-view'); });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="manifesto-section">
      <div className="container manifesto-container">
        <span className="eyebrow">04 — Notre manifeste</span>
        <h2 className="manifesto-title">
          On fait deux choses.<br />
          <span className="italic">On les fait bien.</span>
        </h2>

        <div className="manifesto-body">
          <p className="manifesto-lead">
            Elevora, c'est une agence basée à Nantes, fondée parce qu'on en
            avait assez de voir des artisans, des commerçants et des PME se
            faire vendre n'importe quoi sur le web. Des sites bricolés à 500&nbsp;€
            qui plantent au bout d'un an. Des refontes à 25&nbsp;000&nbsp;€ chez des
            agences parisiennes qui sous-traitent tout au Maroc. Des CRM
            ultra-complexes pour 5 collaborateurs. Bref&nbsp;: du flou.
          </p>

          <div className="manifesto-duo">
            <div className="manifesto-pillar">
              <div className="manifesto-pillar-num">01</div>
              <h3 className="manifesto-pillar-title">Des sites web qui rapportent</h3>
              <p>
                On conçoit des sites <strong>vitrine, e-commerce, refonte ou
                landing page</strong> qui font ce pour quoi ils sont faits :
                amener des clients. Pas juste être beaux sur Awwwards. Beaux,
                rapides, lisibles, et surtout pensés pour <strong>convertir
                vos visiteurs</strong> en demandes concrètes.
              </p>
            </div>

            <div className="manifesto-pillar">
              <div className="manifesto-pillar-num">02</div>
              <h3 className="manifesto-pillar-title">Des outils de gestion sur mesure</h3>
              <p>
                <strong>CRM, facturation, gestion clients, RH, opérations.</strong>
                On développe l'outil dont votre entreprise a besoin — pas une
                usine à gaz générique qu'il faut bidouiller pendant six mois.
                Vous décrivez votre métier, on construit l'outil qui vous
                ressemble.
              </p>
            </div>
          </div>

          <p className="manifesto-text">
            On a choisi de ne faire <strong>que ces deux choses</strong> parce
            que c'est ce qu'on sait bien faire, et parce que c'est suffisamment
            large pour couvrir 95% des besoins d'une entreprise locale moderne.
            On laisse aux autres l'animation 3D, le motion design ou le SEO
            black-hat. Ce n'est pas notre métier.
          </p>

          <p className="manifesto-text">
            Ce qu'on vous promet en retour&nbsp;: vous parlez à un humain
            (Celian, fondateur — pas un commercial qui passe la main après la
            signature), un seul interlocuteur du devis à la mise en ligne, et un
            engagement clair sur les délais, le prix et la qualité. Pas de bla-bla.
          </p>

          <div className="manifesto-signature">
            <div className="manifesto-signature-text">
              <span className="manifesto-signature-name">Celian Soulet Lapetina</span>
              <span className="manifesto-signature-role">Fondateur d'Elevora</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
