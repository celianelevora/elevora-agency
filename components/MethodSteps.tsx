'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    num: '01',
    label: 'Cadrage',
    title: 'On comprend votre activité',
    desc: "Atelier de découverte, objectifs business, contraintes techniques. On part de votre métier, pas d'un template.",
    duration: '~ 1 semaine',
  },
  {
    num: '02',
    label: 'Design',
    title: 'On dessine, vous validez',
    desc: 'Maquettes interactives, allers-retours, validation page par page avant la moindre ligne de code.',
    duration: '~ 2 semaines',
  },
  {
    num: '03',
    label: 'Développement',
    title: 'On construit, vous suivez',
    desc: "Code propre, performances optimisées, environnement de test partagé pour suivre l'avancement en direct.",
    duration: '~ 3-6 semaines',
  },
  {
    num: '04',
    label: 'Livraison',
    title: 'On livre, on reste là',
    desc: 'Mise en ligne, formation à la gestion, suivi sur 30 jours inclus. Vous repartez totalement autonome.',
    duration: '+ suivi 30j',
  },
];

export default function MethodSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState<boolean[]>(
    new Array(STEPS.length).fill(false)
  );

  // Révélation des cartes au scroll
  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.method-card');
    if (!items) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -60px 0px' }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Parallax « barriere qui pivote » au scroll
  useEffect(() => {
    const section = sectionRef.current;
    const sLeft = leftRef.current;
    const sRight = rightRef.current;
    if (!section || !sLeft || !sRight) return;

    const LEFT_FROM = 4,
      LEFT_TO = -16;
    const RIGHT_FROM = -19,
      RIGHT_TO = 2;
    const clamp = (v: number, a: number, b: number) =>
      Math.max(a, Math.min(b, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let targetP = 0,
      currentP = 0,
      raf: number | null = null;

    const computeProgress = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const seen = clamp(vh - r.top, 0, total);
      return clamp(seen / total, 0, 1);
    };

    const tick = () => {
      currentP += (targetP - currentP) * 0.05;
      const aL = lerp(LEFT_FROM, LEFT_TO, currentP);
      const aR = lerp(RIGHT_FROM, RIGHT_TO, currentP);
      sLeft.style.transform = `rotate(${aL}deg)`;
      sRight.style.transform = `rotate(${aR}deg)`;
      if (Math.abs(targetP - currentP) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const onScroll = () => {
      targetP = computeProgress();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Reseau de points connectes (constellation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let can_w = 0,
      can_h = 0;
    const BALL_NUM = 34;
    const R = 2.2;
    const ball_color = { r: 90, g: 70, b: 200 };
    const line_color = '120,110,210';
    const dis_limit = 220;
    const link_line_width = 0.8;
    const alpha_f = 0.03;

    type Ball = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      phase: number;
    };
    let balls: Ball[] = [];
    let raf = 0;

    const rnd = (min: number, max: number) => Math.random() * (max - min) + min;
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
    const sidePos = (len: number) => Math.ceil(Math.random() * len);
    const speed = (pos: string): [number, number] => {
      const min = -0.5,
        max = 0.5;
      switch (pos) {
        case 'top':
          return [rnd(min, max), rnd(0.1, max)];
        case 'right':
          return [rnd(min, -0.1), rnd(min, max)];
        case 'bottom':
          return [rnd(min, max), rnd(min, -0.1)];
        default:
          return [rnd(0.1, max), rnd(min, max)];
      }
    };
    const randomBall = (): Ball => {
      const pos = pick(['top', 'right', 'bottom', 'left']);
      const sp = speed(pos);
      let x = 0,
        y = 0;
      if (pos === 'top') {
        x = sidePos(can_w);
        y = -R;
      } else if (pos === 'right') {
        x = can_w + R;
        y = sidePos(can_h);
      } else if (pos === 'bottom') {
        x = sidePos(can_w);
        y = can_h + R;
      } else {
        x = -R;
        y = sidePos(can_h);
      }
      return { x, y, vx: sp[0], vy: sp[1], r: R, alpha: 1, phase: rnd(0, 10) };
    };

    const dist = (a: Ball, b: Ball) =>
      Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

    const render = () => {
      ctx.clearRect(0, 0, can_w, can_h);
      for (const b of balls) {
        ctx.fillStyle = `rgba(${ball_color.r},${ball_color.g},${ball_color.b},${b.alpha})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
      }
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const fraction = dist(balls[i], balls[j]) / dis_limit;
          if (fraction < 1) {
            const alpha = (1 - fraction) * 0.6;
            ctx.strokeStyle = `rgba(${line_color},${alpha})`;
            ctx.lineWidth = link_line_width;
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
      const nb: Ball[] = [];
      for (const b of balls) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50)
          nb.push(b);
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
      }
      balls = nb;
      if (balls.length < BALL_NUM) balls.push(randomBall());
      raf = requestAnimationFrame(render);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      can_w = rect.width;
      can_h = rect.height;
      canvas.width = can_w * dpr;
      canvas.height = can_h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      balls = [];
      for (let i = 0; i < BALL_NUM; i++) {
        const sp = speed('top');
        balls.push({
          x: sidePos(can_w),
          y: sidePos(can_h),
          vx: sp[0],
          vy: sp[1],
          r: R,
          alpha: 1,
          phase: rnd(0, 10),
        });
      }
    };

    resize();
    init();
    render();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="method-section"
      style={{ background: 'transparent' }}
    >
      {/* decor anime */}
      <div className="method-scene" aria-hidden="true">
        <div className="method-scene-clip">
          <div className="method-bg" />
          <div className="method-glow method-glow-tl" />
          <div className="method-glow method-glow-br" />
          <canvas ref={canvasRef} className="method-particles" />
          <div ref={leftRef} className="statue statue-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/method-statue-left.png" alt="" />
          </div>
        </div>
        <div ref={rightRef} className="statue statue-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/method-statue-right.png" alt="" />
        </div>
      </div>

      <div className="container">
        <div className="method-head">
          <span className="eyebrow">05 — Notre méthode</span>
          <h2 className="method-title">
            De l'idée à la mise en ligne,<br />
            un chemin <span className="italic">clair et balisé.</span>
          </h2>
          <p className="method-intro">
            Pas de zone d'ombre, pas de jargon. Chaque étape est cadrée, validée
            avec vous, et vous savez en permanence où en est votre projet.
          </p>
        </div>

        <div className="method-flow">
          <div className="method-line" aria-hidden="true">
            <div
              className="method-line-fill"
              style={{
                height: `${
                  (visible.filter(Boolean).length / STEPS.length) * 100
                }%`,
              }}
            />
          </div>

          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`method-card ${visible[i] ? 'in' : ''}`}
              data-idx={i}
              style={{ transitionDelay: `${(i % 2) * 0.08}s` }}
            >
              <div className="method-card-num">{step.num}</div>
              <div className="method-card-body">
                <span className="method-card-label">{step.label}</span>
                <h3 className="method-card-title">{step.title}</h3>
                <p className="method-card-desc">{step.desc}</p>
                <span className="method-card-duration">{step.duration}</span>
              </div>
              <div className="method-card-dot" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
