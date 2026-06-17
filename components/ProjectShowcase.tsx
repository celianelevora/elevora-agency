'use client';

import Link from 'next/link';
import { StaggerText } from '@/components/ui/stagger-text';

interface Project {
  slug: string;
  name: string;
  tag: string;
  catchphrase: string;
  cover: string;
  span: 'large' | 'small';
  bg: string; // couleur de fond derriere l'image
}

const PROJECTS: Project[] = [
  {
    slug: 'lily-berry',
    name: 'Lily Berry',
    tag: 'Nail Artist · Nantes',
    catchphrase: "Site vitrine kawaii avec prise de RDV en ligne et système de cartes cadeaux.",
    cover: '/projets/lily-berry.png',
    span: 'large',
    bg: '#FFE7EC',
  },
  {
    slug: 'mace-freddy',
    name: 'Garage Macé Freddy',
    tag: 'Garage auto · Saint-Nazaire',
    catchphrase: "Site sombre & impactant pour un garage indépendant. Note Google mise en avant, appel direct prioritaire.",
    cover: '/projets/mace-freddy-cover.jpg',
    span: 'small',
    bg: '#0B0B0F',
  },
  {
    slug: 'lala-k',
    name: 'Lala·K Beauty',
    tag: 'Institut & soins coréens · Paris',
    catchphrase: "Refonte premium pour un institut spécialisé K-Beauty. Galerie immersive, technologie phare mise en scène.",
    cover: '/projets/lala-k-cover.jpg',
    span: 'small',
    bg: '#1A0A0F',
  },
  {
    slug: 'pole-embal',
    name: 'Pôle Embal',
    tag: 'CRM gestion d\'entrepôt · Loire-Atlantique',
    catchphrase: "Outil métier sur mesure : pilotage temps réel, suivi des commandes, performance opérateurs, heatmap activité.",
    cover: '/projets/pole-embal-cover.jpg',
    span: 'large',
    bg: '#0F1729',
  },
];

export default function ProjectShowcase() {
  return (
    <section className="projects-section">
      <div className="container">
        <div className="projects-head">
          <span className="eyebrow">06 — Réalisations</span>
          <h2 className="projects-title">
            <StaggerText text="Ce qu'on a livré" /><br />
            <span className="italic"><StaggerText text="jusqu'ici." /></span>
          </h2>
          <Link href="/realisations" className="projects-cta">
            Voir tous les projets
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="projects-grid">
          {/* Row 1 : Lily Berry (large) + Mace Freddy (small) */}
          <div className="projects-row projects-row-1">
            {PROJECTS.slice(0, 2).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          {/* Row 2 : Lala-K (small) + Pole Embal (large) */}
          <div className="projects-row projects-row-2">
            {PROJECTS.slice(2, 4).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href="/realisations"
      className={`project-card project-card-${project.span}`}
      style={{ ['--project-bg' as any]: project.bg }}
    >
      <div className="project-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover}
          alt={`${project.name} — ${project.tag}, projet web réalisé par Elevora`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="project-info">
        <div className="project-info-head">
          <span className="project-tag">{project.tag}</span>
          <span className="project-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-catchphrase">{project.catchphrase}</p>
      </div>
    </Link>
  );
}
