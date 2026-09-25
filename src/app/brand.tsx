'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

// LOGOTIPO VETORIAL PURO (SEM FUNDO)
// Ao passar o mouse, o logo "abre e fecha" como um elástico: squash-and-stretch
// — largura e altura oscilam em direções opostas (quando estica na horizontal,
// comprime na vertical, e vice-versa) antes de assentar no tamanho normal.
// Duração longa (0.9s) e amplitude grande para o movimento ser bem perceptível.
export const WeExpandLogo = ({ className = 'w-12 h-12 md:w-12 md:h-12' }: { className?: string }) => (
  <motion.svg
    viewBox="26 24 76 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    whileHover={{
      scaleX: [1, 1.55, 0.72, 1.25, 0.9, 1.05, 1],
      scaleY: [1, 0.6, 1.4, 0.82, 1.12, 0.97, 1],
    }}
    transition={{ duration: 0.9, ease: 'easeInOut' }}
  >
    <path d="M30 45L45 80L60 55L75 80L90 45" stroke="url(#line-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="90" cy="45" r="4" fill="#00F0FF" className="animate-pulse" />
    <circle cx="60" cy="55" r="4" fill="#7000FF" />
    <circle cx="30" cy="45" r="4" fill="#00F0FF" />
    <defs>
      <linearGradient id="line-grad" x1="30" y1="62.5" x2="90" y2="62.5">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </motion.svg>
);

// Lockup da área: mesma marca WeExpand (W pequeno) + nome da operação em
// branco, maior e mais forte que o "WeExpand" — mesmo padrão do avatar das
// redes: o W é a assinatura discreta, "Casa de Máquinas" é o que se lê.
export const AreaLockup = ({ areaName, size = 'md' }: { areaName: string; size?: 'sm' | 'md' }) => (
  <div className={`flex items-center gap-3 md:gap-3.5 font-space font-bold tracking-tighter whitespace-nowrap ${size === 'sm' ? 'text-base md:text-lg' : 'text-xl md:text-3xl'}`}>
    <WeExpandLogo className={size === 'sm' ? 'w-9 h-9' : 'w-11 h-11 md:w-12 md:h-12'} />
    <span className="text-white/30 font-normal text-[0.7em]">We<span className="text-white/20">Expand</span></span>
    <span className="w-px h-4 md:h-5 bg-white/15" aria-hidden />
    <span className="text-white text-[1.15em]">{areaName}</span>
  </div>
);

// ORGANISMO NEURAL — background interativo, full-screen, com cara de IA.
//
// Em vez de um campo único e uniforme, cada elemento é uma partícula independente
// com a sua própria órbita: profundidade, velocidade, curvatura e cor próprias.
// Elas vagueiam pela tela inteira o tempo todo (não só perto do cursor) e reagem
// ao scroll com paralaxe — partículas "próximas" se movem mais rápido que a
// página, as "distantes" ficam atrás, dando sensação real de profundidade. Perto
// do cursor, as conexões entre elas brilham mais forte (ativação), mas a rede já
// está viva e visível em qualquer ponto da tela. Renderizado em <canvas> para
// performance; respeita prefers-reduced-motion e nunca bloqueia cliques.
export const InteractiveBackground = ({ bg = '#050505' }: { bg?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const AREA_PER_PARTICLE = 15000; // densidade: 1 partícula por N px² de tela
    const PARTICLE_MIN = 70;
    const PARTICLE_MAX = 230;
    const LINK_DIST = 165;           // distância máxima para ligar duas partículas
    const CURSOR_RADIUS = 280;       // raio de ativação extra ao redor do cursor

    type Particle = {
      x: number; y: number;       // posição real no documento (espaço de scroll)
      depth: number;              // 0.5 (longe) .. 1.5 (perto) — controla tamanho/parallax/velocidade
      angle: number;              // direção atual do deslocamento
      turn: number;               // taxa de curvatura própria (cada partícula vira diferente)
      wobblePhase: number;
      speed: number;
      size: number;
      hue: 'cyan' | 'violet' | 'white';
    };

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Estado do ponteiro guardado fora do React para não re-renderizar por frame.
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false, seeded: false };

    const buildParticles = () => {
      const count = Math.round(Math.min(PARTICLE_MAX, Math.max(PARTICLE_MIN, (width * height) / AREA_PER_PARTICLE)));
      particles = Array.from({ length: count }, () => {
        const depth = 0.5 + Math.random();
        const hueRoll = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          angle: Math.random() * Math.PI * 2,
          turn: (Math.random() - 0.5) * 0.018,
          wobblePhase: Math.random() * Math.PI * 2,
          speed: (0.12 + Math.random() * 0.22) * depth,
          size: 0.9 + depth * 1.7,
          hue: hueRoll < 0.3 ? 'cyan' : hueRoll < 0.55 ? 'violet' : 'white',
        };
      });
    };

    // Altura total do site (não só o viewport) — o organismo flutua por baixo de tudo.
    const docHeight = () => Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = docHeight();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      buildParticles();
    };

    const colorRGB = (hue: Particle['hue']) =>
      hue === 'cyan' ? '0,240,255' : hue === 'violet' ? '150,90,255' : '255,255,255';

    const draw = (t: number, scrollY: number, animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      const viewTop = scrollY - 250;
      const viewBottom = scrollY + window.innerHeight + 250;

      // Cada partícula vagueia com a própria curvatura — vida individual, não um
      // campo compartilhado. O paralaxe (offset por profundidade) dá a sensação
      // de que a cena reage ao movimento do site, não fica presa ao scroll 1:1.
      const visible: { p: Particle; dx: number; dy: number; alpha: number; r: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (animate) {
          p.angle += p.turn + Math.sin(t * 0.7 + p.wobblePhase) * 0.01;
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed * 0.75;

          // wrap toroidal — a partícula nunca "acaba", sempre reaparece do outro lado
          if (p.x < -40) p.x = width + 40;
          if (p.x > width + 40) p.x = -40;
          if (p.y < -40) p.y = height + 40;
          if (p.y > height + 40) p.y = -40;
        }

        // paralaxe: partículas "perto" (depth alto) acompanham o scroll mais rápido
        // que a página; "longe" (depth baixo) ficam atrás — sensação real de profundidade.
        const parallax = (p.depth - 1) * 0.22 * scrollY;
        const drawY = p.y + parallax;

        if (drawY < viewTop || drawY > viewBottom) continue;

        visible.push({ p, dx: p.x, dy: drawY, alpha: 0.16 + p.depth * 0.16, r: p.size });
      }

      // Passo 1 — conexões ambientes entre partículas próximas (sempre presentes,
      // não dependem do cursor — a rede já está viva por toda a tela).
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const a = visible[i];
          const b = visible[j];
          const dx = a.dx - b.dx;
          const dy = a.dy - b.dy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > LINK_DIST) continue;

          let boost = 0;
          if (pointer.active) {
            const mdx = (a.dx + b.dx) / 2 - pointer.x;
            const mdy = (a.dy + b.dy) / 2 - pointer.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < CURSOR_RADIUS) boost = (1 - mdist / CURSOR_RADIUS) ** 2;
          }

          const base = (1 - dist / LINK_DIST) * 0.05;
          const k = base + boost * 0.5;
          if (k < 0.012) continue;

          if (boost > 0.05) {
            const grad = ctx.createLinearGradient(a.dx, a.dy, b.dx, b.dy);
            grad.addColorStop(0, `rgba(0,240,255,${k})`);
            grad.addColorStop(1, `rgba(150,90,255,${k})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.7 + boost * 1.1;
          } else {
            ctx.strokeStyle = `rgba(255,255,255,${k})`;
            ctx.lineWidth = 0.7;
          }

          ctx.beginPath();
          ctx.moveTo(a.dx, a.dy);
          ctx.lineTo(b.dx, b.dy);
          ctx.stroke();
        }
      }

      // Passo 1.5 — triângulos de ativação: perto do cursor, trios de partículas
      // próximas entre si fecham faces translúcidas — a rede "pensa" em malhas,
      // não só em linhas, exatamente onde o usuário está interagindo.
      if (pointer.active) {
        const near: typeof visible = [];
        for (let i = 0; i < visible.length; i++) {
          const v = visible[i];
          const dx = v.dx - pointer.x;
          const dy = v.dy - pointer.y;
          if (dx * dx + dy * dy < CURSOR_RADIUS * CURSOR_RADIUS) near.push(v);
        }

        const TRIANGLE_LINK_DIST = LINK_DIST * 1.5; // mais generoso que as linhas — mais faces se formam

        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const ab = Math.hypot(near[i].dx - near[j].dx, near[i].dy - near[j].dy);
            if (ab > TRIANGLE_LINK_DIST) continue;
            for (let k = j + 1; k < near.length; k++) {
              const a = near[i], b = near[j], c = near[k];
              const bc = Math.hypot(b.dx - c.dx, b.dy - c.dy);
              if (bc > TRIANGLE_LINK_DIST) continue;
              const ca = Math.hypot(c.dx - a.dx, c.dy - a.dy);
              if (ca > TRIANGLE_LINK_DIST) continue;

              const cx = (a.dx + b.dx + c.dx) / 3;
              const cy = (a.dy + b.dy + c.dy) / 3;
              const mdist = Math.hypot(cx - pointer.x, cy - pointer.y);
              if (mdist > CURSOR_RADIUS) continue;
              const boost = (1 - mdist / CURSOR_RADIUS) ** 2;
              if (boost < 0.05) continue;

              ctx.beginPath();
              ctx.moveTo(a.dx, a.dy);
              ctx.lineTo(b.dx, b.dy);
              ctx.lineTo(c.dx, c.dy);
              ctx.closePath();
              ctx.strokeStyle = `rgba(120,220,255,${boost * 0.45})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      // Passo 2 — as partículas em si: pontos vivos, mais brilhantes perto do cursor.
      for (let i = 0; i < visible.length; i++) {
        const v = visible[i];
        let boost = 0;
        if (pointer.active) {
          const dx = v.dx - pointer.x;
          const dy = v.dy - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS) boost = (1 - dist / CURSOR_RADIUS) ** 2;
        }
        const pulse = 0.85 + 0.15 * Math.sin(t * 2.2 + v.dx * 0.01);
        const alpha = (v.alpha + boost * 0.6) * pulse;
        const radius = v.r + boost * 2.2;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${colorRGB(v.p.hue)},${Math.min(alpha, 0.95)})`;
        ctx.arc(v.dx, v.dy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let time = 0;

    const loop = () => {
      time += 0.012;

      // Cursor com inércia (movimento sedoso, não mecânico).
      if (!pointer.seeded && pointer.tx > -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
        pointer.seeded = true;
      }
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      const glow = glowRef.current;
      if (glow) {
        if (pointer.active) {
          glow.style.transform = `translate3d(${pointer.x - 280}px, ${pointer.y - 280}px, 0)`;
          glow.style.opacity = '1';
        } else {
          glow.style.opacity = '0';
        }
      }

      draw(time, window.scrollY, true);
      raf = requestAnimationFrame(loop);
    };

    // Coordenadas em espaço de página (pageX/pageY) — a rede vive no documento
    // inteiro e rola junto com o scroll, não fica presa ao viewport.
    const onMouseMove = (e: MouseEvent) => {
      pointer.tx = e.pageX;
      pointer.ty = e.pageY;
      pointer.active = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      const tch = e.touches[0];
      if (!tch) return;
      pointer.tx = tch.pageX;
      pointer.ty = tch.pageY;
      pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };

    resize();
    window.addEventListener('resize', resize);

    // O conteúdo (fontes, título aleatório do hero) pode alterar a altura do
    // site após o primeiro paint — recalcula para a rede cobrir tudo certo.
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(document.body);

    if (reduceMotion) {
      // Acessibilidade: sem animação — apenas a rede estática, completa.
      draw(0.6, window.scrollY, false);
      return () => {
        window.removeEventListener('resize', resize);
        resizeObserver.disconnect();
      };
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    // absolute (não fixed) — o campo acompanha a altura inteira do site e
    // rola junto com o conteúdo, flutuando por baixo de tudo, não só no viewport.
    <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: bg }}>
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      {/* Brilho suave da marca que acompanha o cursor (profundidade etérea). */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[560px] h-[560px] rounded-full blur-[120px] opacity-0 transition-opacity duration-700 ease-out"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.10), rgba(112,0,255,0.05) 45%, transparent 70%)' }}
      />
      {/* Vinheta + fade inferior para manter o texto sempre legível. */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, transparent 50%, ${bg} 100%)` }} />
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to bottom, ${bg}59, transparent, ${bg})` }} />
    </div>
  );
};
