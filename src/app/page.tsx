'use client';

import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import { Cpu, Network, Workflow, ArrowUpRight, Diamond, CheckCircle, Send, Phone } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// LOGOTIPO VETORIAL PURO (SEM FUNDO)
// Ao passar o mouse, o logo "abre e fecha" como um elástico: squash-and-stretch
// — largura e altura oscilam em direções opostas (quando estica na horizontal,
// comprime na vertical, e vice-versa) antes de assentar no tamanho normal.
// Duração longa (0.9s) e amplitude grande para o movimento ser bem perceptível.
const WeExpandLogo = () => (
  <motion.svg
    viewBox="26 24 76 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 md:w-12 md:h-12"
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
const InteractiveBackground = () => {
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
    <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      {/* Brilho suave da marca que acompanha o cursor (profundidade etérea). */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[560px] h-[560px] rounded-full blur-[120px] opacity-0 transition-opacity duration-700 ease-out"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.10), rgba(112,0,255,0.05) 45%, transparent 70%)' }}
      />
      {/* Vinheta + fade inferior para manter o texto sempre legível. */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, #050505 100%)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/35 via-transparent to-[#050505]" />
    </div>
  );
};

// ROTATING HERO HEADLINES — one is randomly picked per visit, each tied to what We Expand does.
// Glow always matches the brand cyan used in the "Consultoria & Engenharia de IA" tag — no color variation.
const HERO_GLOW = '#00F0FF';

const HERO_TITLES = [
  { top: 'ENGINEERED', mid: 'FOR THE', bottom: 'UNKNOWN.' },
  { top: 'MODELS', mid: 'THAT', bottom: 'LEARN.' },
  { top: 'INTELLIGENCE', mid: 'IN', bottom: 'MOTION.' },
  { top: 'IDLE DATA,', mid: 'TURNED INTO', bottom: 'DECISIONS.' },
  { top: 'SYSTEMS', mid: 'THAT', bottom: 'ADAPT.' },
  { top: 'AUTOMATION', mid: 'WITH', bottom: 'PURPOSE.' },
  { top: 'SCALE', mid: 'WITHOUT', bottom: 'FRICTION.' },
  { top: 'ORDER', mid: 'INSIDE THE', bottom: 'CHAOS.' },
];

const heroLineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const heroEase = [0.16, 1, 0.3, 1] as const;

const heroWord: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)', textShadow: '0 0 0px transparent' },
  visible: (glow?: string) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    textShadow: glow
      ? [`0 0 18px ${glow}55`, `0 0 36px ${glow}99`, `0 0 18px ${glow}55`]
      : '0 0 0px transparent',
    transition: {
      opacity: { duration: 0.9, ease: heroEase },
      y: { duration: 0.9, ease: heroEase },
      filter: { duration: 0.9, ease: heroEase },
      textShadow: glow
        ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }
        : { duration: 0.9 },
    },
  }),
};

const HeroLine = ({
  text,
  className,
  glow,
  style,
}: {
  text: string;
  className?: string;
  glow?: string;
  style?: React.CSSProperties;
}) => (
  <span>
    {text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        custom={glow}
        variants={heroWord}
        style={style}
        className={`inline-block mr-[0.25em] last:mr-0 max-w-full break-all [overflow-wrap:anywhere] ${className ?? ''}`}
      >
        {word}
      </motion.span>
    ))}
  </span>
);

export default function Home() {
  const containerRef = useRef(null);
  const [heroTitle] = useState(() => HERO_TITLES[Math.floor(Math.random() * HERO_TITLES.length)]);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Estados do formulário automatizado
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // FUNÇÃO DE DISPARO REAL CONECTADA À API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('idle');
        alert('Falha na transmissão do sinal. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      setStatus('idle');
      alert('Erro de conexão com a rede neural.');
    }
  };

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#050505]">
      <InteractiveBackground />

      {/* FAIXA DE CONTATO DIRETO — lugar de destaque máximo, acima de tudo, sempre visível */}
      <div className="fixed top-0 inset-x-0 z-[60] bg-black border-b border-white/10 px-8">
        <div className="max-w-[1440px] mx-auto h-9 flex items-center justify-center">
          <a
            href="tel:+5511925651315"
            className="flex items-center gap-2 font-space font-bold text-[11px] sm:text-xs tracking-wider text-white/90 hover:text-[#00F0FF] transition-colors"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <Phone className="w-3.5 h-3.5 shrink-0" />
            +55 11 92565-1315
          </a>
        </div>
      </div>

      {/* HEADER COESO */}
      <header className="fixed top-9 w-full z-50 border-b border-white/5 bg-[#050505]/40 backdrop-blur-2xl transition-all duration-500 px-8">
        <div className="max-w-[1440px] mx-auto h-20 md:h-24 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 md:gap-2 group cursor-pointer shrink-0" onClick={scrollToTop}>
            <WeExpandLogo />
            <span className="font-space font-bold text-lg md:text-2xl tracking-tighter text-white whitespace-nowrap">We<span className="text-white/40">Expand</span></span>
          </div>
          <nav className="hidden md:flex gap-12 font-space text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
            <a href="#vision" className="hover:text-[#00F0FF] transition-colors">The Vision</a>
            <a href="#expertise" className="hover:text-[#00F0FF] transition-colors">Soluções</a>
          </nav>
          <a href="#contact" className="relative px-4 md:px-8 py-2 md:py-3 bg-white text-black font-space font-bold uppercase text-[10px] md:text-xs tracking-wide md:tracking-widest rounded-full overflow-hidden group inline-block text-center cursor-pointer shrink-0 whitespace-nowrap">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Contact Us</span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="vision" className="relative z-10 min-h-screen flex items-center px-8 pt-48 pb-20">
        <motion.div style={{ y: yParallax, opacity: opacityFade }} className="max-w-[1440px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-[#00F0FF]" />
              <span className="font-space text-[#00F0FF] uppercase tracking-[0.3em] text-xs font-bold">Consultoria & Engenharia de Inteligência Artificial</span>
            </div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={heroLineContainer}
              className="font-space text-[2.75rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[7rem] leading-[0.95] md:leading-[0.9] font-bold tracking-tighter mb-10 break-words [overflow-wrap:anywhere] max-w-full"
            >
              <HeroLine text={heroTitle.top} glow={HERO_GLOW} />
              <br />
              <HeroLine
                text={heroTitle.mid}
                glow={HERO_GLOW}
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(90deg, ${HERO_GLOW}, #ffffff)` }}
              />
              <br />
              <HeroLine text={heroTitle.bottom} glow={HERO_GLOW} />
            </motion.h1>

            <div className="flex flex-col gap-10 max-w-4xl">
              <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-2xl">
                Criamos Inteligência Artificial que pensa e age pelo seu negócio. Desenvolvemos ecossistemas sob medida que se conectam à sua infraestrutura, convertendo dados ociosos em predições acionáveis. Quando o projeto exige, alocamos esquadrões de especialistas para implementar e operar os sistemas, mantendo sua equipe interna enxuta e focada no core business.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <a href="#contact" className="relative px-8 py-4 bg-white text-black font-space font-bold uppercase text-xs tracking-widest rounded-full overflow-hidden group inline-flex items-center gap-2 cursor-pointer">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">Agende uma Sessão de Discovery</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                </a>
                <a href="#expertise" className="font-space text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-colors">
                  Conheça nossas soluções
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MANIFESTO + CLAREZA DO QUE ENTREGAMOS */}
      <section className="relative z-10 py-32 px-8 bg-[#050505]/90 border-t border-white/5">
        {/* Blur de transição suave — evita o corte abrupto da animação atrás. */}
        <div
          className="absolute inset-x-0 top-0 h-40 backdrop-blur-xl pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <Diamond className="w-8 h-8 mx-auto mb-10 text-[#7000FF] opacity-50" />
          <h2 className="font-space text-3xl md:text-5xl font-light leading-tight mb-12">
            "O software tradicional dita como você trabalha hoje. <br />
            A Inteligência Artificial preditiva dita <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#7000FF] font-bold">se você existirá amanhã.</span> Pare de comprar código obsoleto. Comece a treinar o cérebro da sua corporação."
          </h2>
          <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Na prática: auditamos sua operação para achar onde a IA gera retorno real <span className="text-white/70">(Cognitive Discovery)</span>, construímos o sistema proprietário que resolve isso <span className="text-white/70">(Autonomous Engines)</span> e, quando preciso, colocamos especialistas sêniores dentro do seu time para executar <span className="text-white/70">(Neural Squads)</span>.
          </p>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section id="expertise" className="relative z-10 py-32 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <span className="w-12 h-[1px] bg-[#00F0FF]" />
            <span className="font-space text-[#00F0FF] uppercase tracking-[0.3em] text-xs font-bold">Como trabalhamos</span>
            <span className="w-12 h-[1px] bg-[#00F0FF]" />
          </div>
          <h2 className="font-space text-3xl md:text-5xl font-bold tracking-tighter text-center mb-20 max-w-3xl mx-auto">
            Três formas de expandir sua operação com IA.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ExpertiseCard
              icon={<Network className="w-10 h-10 text-[#00F0FF]" />}
              title="Cognitive Discovery"
              desc="Auditoria cirúrgica. Mapeamos o DNA da sua operação para encontrar ralos financeiros invisíveis e desenhamos a arquitetura de IA exata para substituí-los por eficiência autônoma."
              deliverable="Diagnóstico operacional + roteiro de implementação priorizado por ROI."
              delay={0}
            />
            <ExpertiseCard
              icon={<Workflow className="w-10 h-10 text-[#7000FF]" />}
              title="Autonomous Engines"
              desc="Esqueça softwares de prateleira. Desenvolvemos sistemas de IA proprietários — motores de precificação, agentes em tempo real — integrados nativamente ao seu ERP e às suas bases de dados."
              deliverable="Sistema de IA proprietário, em produção e integrado à sua operação."
              delay={0.2}
            />
            <ExpertiseCard
              icon={<Cpu className="w-10 h-10 text-white" />}
              title="Neural Squads"
              desc="Não infle o seu RH corporativo. Alocamos in-loco ou remotamente esquadrões sêniores de cientistas de dados e engenheiros de IA para executar o seu roadmap tecnológico em tempo recorde."
              deliverable="Equipe especialista dedicada, integrada ao seu time, sem custo de contratação."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* FOOTER CORPORATIVO COM FORMULÁRIO DE VANGUARDA */}
      <footer id="contact" className="relative z-10 bg-black pt-32 pb-12 px-8 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">

          <div className="max-w-xl">
            <h2 className="font-space text-5xl font-bold tracking-tighter mb-8">The Algorithmic Advantage.</h2>
            <p className="text-white/40 mb-10 leading-relaxed">
              Construir inteligência proprietária não é para qualquer operação. É um movimento estratégico para empresas que desejam dominar o seu setor. Comece pelo Discovery: em uma sessão estratégica com nossos arquitetos, mapeamos onde a IA gera mais valor na sua operação e o retorno esperado — antes de você investir um real. Operamos com vagas limitadas de alocação de Squads para garantir excelência absoluta na entrega.
            </p>
            <div className="flex gap-16 text-sm font-space uppercase tracking-[0.1em] text-white/30 pt-6 border-t border-white/5">
              <div className="flex flex-col gap-2">
                <span className="text-white font-bold">Social</span>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Twitter // X</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white font-bold">Presence</span>
                <span>São Paulo, SP</span>
                <span>Lisboa, PT</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-3xl backdrop-blur-md relative overflow-hidden">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="font-space text-lg font-bold uppercase tracking-widest text-[#00F0FF] mb-4">Mapeamento Operacional</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-space font-bold">Seu Nome</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm font-space focus:outline-none focus:border-[#00F0FF] focus:bg-white/[0.04] transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-space font-bold">Corporação</label>
                      <input
                        required
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm font-space focus:outline-none focus:border-[#00F0FF] focus:bg-white/[0.04] transition-all"
                        placeholder="Nome da Empresa"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-space font-bold">E-mail Executivo</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm font-space focus:outline-none focus:border-[#00F0FF] focus:bg-white/[0.04] transition-all"
                      placeholder="executivo@suaempresa.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-space font-bold">O Gargalo / Desafio Operacional</label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm font-space focus:outline-none focus:border-[#00F0FF] focus:bg-white/[0.04] transition-all resize-none"
                      placeholder="Descreva brevemente a dor operacional ou o escopo de Squad demandado..."
                    />
                  </div>

                  <button
                    disabled={status === 'submitting'}
                    type="submit"
                    className="w-full relative px-8 py-4 bg-white text-black font-space font-bold uppercase text-xs tracking-widest rounded-xl overflow-hidden group inline-flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 transition-opacity"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Cpu className="w-4 h-4 animate-spin text-black" />
                        <span>Processando Sinal...</span>
                      </>
                    ) : (
                      <>
                        <span>Solicitar Sessão Estratégica</span>
                        <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="py-12 text-center space-y-6 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-16 h-16 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-8 h-8 text-[#00F0FF]" />
                  </div>
                  <h4 className="font-space text-2xl font-bold tracking-tight">Sinal Neural Recebido.</h4>
                  <p className="text-white/50 font-light text-sm max-w-sm leading-relaxed">
                    A transmissão foi completada de forma automática. Nossos arquitetos estruturais analisarão seus dados e entrarão em contato nas próximas 2 horas.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-xs font-space text-[#00F0FF] border-b border-[#00F0FF]/30 pb-0.5 hover:border-[#00F0FF] transition-colors"
                  >
                    Enviar nova requisição
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center text-[9px] sm:text-xs text-white/20 font-space tracking-widest pt-8 border-t border-white/5">
          <span className="text-left">ELEVATING CORPORATE INTELLIGENCE.</span>
          <span className="text-right">© {new Date().getFullYear()} WE EXPAND. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </main>
  );
}

function ExpertiseCard({ icon, title, desc, deliverable, delay }: { icon: any, title: string, desc: string, deliverable: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-12 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden backdrop-blur-sm rounded-2xl flex flex-col"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00F0FF]/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="mb-12 bg-black/50 w-20 h-20 flex items-center justify-center rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="font-space text-2xl font-bold mb-4">{title}</h3>
        <p className="text-white/50 leading-relaxed mb-8 min-h-[80px] font-light">{desc}</p>

        <div className="mt-auto pt-6 border-t border-white/5">
          <span className="text-[10px] uppercase tracking-widest text-[#00F0FF]/70 font-space font-bold block mb-2">Entrega</span>
          <p className="text-white/70 text-sm leading-relaxed">{deliverable}</p>
        </div>
      </div>
    </motion.div>
  );
}