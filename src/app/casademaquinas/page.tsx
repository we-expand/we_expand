'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import {
  motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion,
  type MotionValue, type Variants,
} from 'framer-motion';
import { WeExpandLogo, InteractiveBackground } from '../components/brand';
import { AREA } from './area';
import DiagnosticForm from './DiagnosticForm';

const OFFERS = [
  { title: 'Sites', desc: 'Site institucional ou landing page com direção de arte própria, domínio e hospedagem inclusos.' },
  { title: 'Identidade visual', desc: 'Logo, paleta, tipografia, papelaria e manual de marca. O sistema que dá coerência a tudo o que vem depois.' },
  { title: 'Presença local', desc: 'Perfil do Google otimizado, SEO local, publicações semanais e relatório mensal de resultado.' },
  { title: 'Conteúdo', desc: 'Posts e stories prontos todo mês, com legendas e calendário, no padrão visual da sua marca.' },
  { title: 'Mini-apps', desc: 'Agendamento online, cardápio digital, catálogo com pedido pelo WhatsApp, área do cliente.' },
];

const STEPS = [
  { title: 'Diagnóstico', desc: 'Analisamos sua presença digital e mostramos, com clareza, o que falta e o que vale fazer primeiro.' },
  { title: 'Produção', desc: 'Uma operação enxuta e automatizada desenha, escreve e constrói. Você aprova; não gerencia.' },
  { title: 'Entrega', desc: 'Tudo no ar, revisado ponto a ponto: tipografia, contraste, velocidade, texto. Depois, acompanhamento contínuo.' },
];
// Linguagem da home (fundo #050505 com rede neural, Space Grotesk, ciano #00F0FF,
// violeta #7000FF), com movimento em todas as camadas. Tudo respeita
// prefers-reduced-motion: sem animação, a página chega pronta e estática.
const CYAN = '#00F0FF';
const VIOLET = '#7000FF';
const ease = [0.16, 1, 0.3, 1] as const;

const Eyebrow = ({ children, center = false }: { children: ReactNode; center?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, ease }}
    className={`flex items-center gap-3 mb-8 ${center ? 'justify-center' : ''}`}
  >
    <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }} className="w-12 h-[1px] bg-[#00F0FF] origin-left" />
    <span className="font-space text-[#00F0FF] uppercase tracking-[0.3em] text-xs font-bold">{children}</span>
    {center && <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }} className="w-12 h-[1px] bg-[#00F0FF] origin-right" />}
  </motion.div>
);

// Assinatura provisória WeExpand / Casa de Máquinas, até o logo oficial sair do marketing.
const AreaLockup = () => (
  <Link href="/" className="flex items-center gap-1 md:gap-2 shrink-0">
    <WeExpandLogo />
    <span className="font-space font-bold text-base md:text-2xl tracking-tighter text-white whitespace-nowrap">
      We<span className="text-white/40">Expand</span>
      <span className="text-[#00F0FF] mx-2 font-light">/</span>
      <span className="text-white/90">{AREA.name}</span>
    </span>
  </Link>
);

// Botão magnético: acompanha o cursor alguns pixels e volta com mola.
const MagneticCTA = ({ children, href, full = false }: { children: ReactNode; href: string; full?: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  return (
    <motion.a
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`relative px-6 md:px-8 py-3 md:py-4 bg-white text-black font-space font-bold uppercase text-[10px] md:text-xs tracking-widest rounded-full overflow-hidden group inline-block whitespace-nowrap text-center ${full ? 'w-full' : ''}`}
    >
      <span className="relative z-10 group-hover:text-white transition-colors duration-500">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
    </motion.a>
  );
};

// Título do hero: palavra por palavra, saindo do desfoque, como na home.
const titleWord: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
};
const Words = ({ text, className }: { text: string; className?: string }) => (
  <span className="block">
    {text.split(' ').map((w, i) => (
      <motion.span key={i} variants={titleWord} className={`inline-block mr-[0.22em] ${className ?? ''}`}>{w}</motion.span>
    ))}
  </span>
);

// O manômetro: a casa de máquinas em um símbolo. Anéis giram em sentidos
// opostos e o ponteiro segue o cursor pela página inteira, com mola.
const Gauge = ({ angle }: { angle: MotionValue<number> }) => {
  const reduce = useReducedMotion();
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="relative w-[440px] h-[440px] xl:w-[520px] xl:h-[520px]" aria-hidden>
      <div className="absolute inset-0 rounded-full blur-[90px] opacity-40" style={{ background: `radial-gradient(circle, ${CYAN}33, ${VIOLET}22 50%, transparent 70%)` }} />
      <motion.svg viewBox="0 0 400 400" className="absolute inset-0" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}>
        {ticks.map(i => {
          const a = (i / 60) * Math.PI * 2;
          const long = i % 5 === 0;
          const r1 = long ? 168 : 176;
          return <line key={i} x1={200 + Math.cos(a) * r1} y1={200 + Math.sin(a) * r1} x2={200 + Math.cos(a) * 184} y2={200 + Math.sin(a) * 184} stroke={long ? CYAN : '#ffffff'} strokeOpacity={long ? 0.8 : 0.18} strokeWidth={long ? 1.5 : 1} />;
        })}
      </motion.svg>
      <motion.svg viewBox="0 0 400 400" className="absolute inset-0" animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
        <defs>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1"><stop stopColor={CYAN} /><stop offset="1" stopColor={VIOLET} /></linearGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="none" stroke="#ffffff" strokeOpacity="0.06" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="url(#arc)" strokeWidth="2" strokeLinecap="round" strokeDasharray="260 682" />
        <circle cx="200" cy="200" r="118" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="2 8" />
      </motion.svg>
      <motion.div className="absolute inset-0" style={{ rotate: angle }}>
        <div className="absolute left-1/2 top-1/2 w-[2px] h-[38%] -translate-x-1/2 -translate-y-full origin-bottom rounded-full" style={{ background: `linear-gradient(to top, transparent, ${CYAN})`, boxShadow: `0 0 18px ${CYAN}` }} />
      </motion.div>
      <div className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_#00F0FF]" />
      <div className="absolute inset-x-0 bottom-[22%] text-center font-space text-[10px] tracking-[0.4em] uppercase text-white/40">Pressão operacional</div>
    </div>
  );
};

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const raw = useMotionValue(-30);
  const angle = useSpring(raw, { stiffness: 60, damping: 14 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  return (
    <section
      ref={ref}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        // ângulo do cursor em relação ao centro do manômetro (lado direito)
        const cx = r.left + r.width * 0.75;
        const cy = r.top + r.height * 0.5;
        raw.set((Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90);
      }}
      className="relative z-10 min-h-screen flex items-center px-6 md:px-8 pt-40 pb-20"
    >
      <motion.div style={{ y, opacity: fade }} className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-[1.25fr_1fr] items-center gap-10">
        <div>
          <Eyebrow>Uma operação We Expand</Eyebrow>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            className="font-space text-[2.6rem] sm:text-[3.2rem] md:text-[4.5rem] xl:text-[5.8rem] leading-[0.95] font-bold tracking-tighter mb-10"
          >
            <Words text={AREA.tagline[0]} />
            <Words text={AREA.tagline[1]} className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-white" />
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1, ease }} className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-2xl mb-10">
            Sites, identidade visual, presença no Google, conteúdo e mini-apps para negócios que valorizam a própria marca.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.3, ease }} className="flex flex-wrap items-center gap-6">
            <MagneticCTA href="#diagnostico">Pedir diagnóstico gratuito</MagneticCTA>
            <a href="#frentes" className="font-space text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-colors">Ver o que fazemos</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.85, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.8, delay: 0.4, ease }} className="hidden lg:flex justify-center">
          <Gauge angle={angle} />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Faixa contínua com as frentes, em contorno, passando por baixo da dobra.
const Marquee = () => {
  const reduce = useReducedMotion();
  const items = [...OFFERS, ...OFFERS].map(o => o.title);
  return (
    <div className="relative z-10 py-10 border-y border-white/5 bg-[#050505]/80 overflow-hidden" aria-hidden>
      <motion.div className="flex gap-16 whitespace-nowrap w-max" animate={reduce ? undefined : { x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-16 font-space text-5xl md:text-7xl font-bold tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}>
            {t}<span className="w-3 h-3 rounded-full bg-[#00F0FF]/70" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Card com inclinação 3D e um foco de luz que segue o cursor.
const OfferCard = ({ index, title, desc }: { index: number; title: string; desc: string }) => {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const glow = useTransform([mx, my] as MotionValue<number>[], ([x, y]: number[]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(0,240,255,0.14), transparent 45%)`);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease }}
      style={{ perspective: 900 }}
    >
      <motion.div
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group relative h-full p-8 bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors duration-500 backdrop-blur-sm rounded-2xl overflow-hidden"
      >
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: glow }} />
        <div className="relative" style={{ transform: 'translateZ(30px)' }}>
          <span className="block w-8 h-[1px] bg-[#00F0FF]/70" />
          <h3 className="font-space text-2xl font-bold mt-10 mb-4">{title}</h3>
          <p className="text-white/50 leading-relaxed font-light text-sm">{desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Manifesto que se acende palavra por palavra conforme a rolagem.
const ScrollStatement = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="font-space text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] max-w-5xl mx-auto text-center flex flex-wrap justify-center">
      {words.map((w, i) => (
        <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</ScrollWord>
      ))}
    </p>
  );
};
const ScrollWord = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const accent = children.startsWith('Tudo') || children.startsWith('funciona');
  return <motion.span style={{ opacity }} className={`mr-[0.25em] ${accent ? 'text-[#00F0FF]' : ''}`}>{children}</motion.span>;
};

// Processo: a linha se desenha com a rolagem e acende cada etapa ao passar.
const Process = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <div ref={ref} className="relative mt-20">
      <div className="hidden md:block absolute top-[7px] left-0 right-0 h-px bg-white/10" />
      <motion.div style={{ scaleX: line }} className="hidden md:block absolute top-[7px] left-0 right-0 h-px origin-left bg-gradient-to-r from-[#00F0FF] to-[#7000FF]" />
      <div className="grid md:grid-cols-3 gap-12">
        {STEPS.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay: i * 0.15, ease }}>
            <span className="relative block w-[15px] h-[15px] rounded-full border border-[#00F0FF] bg-[#050505] mb-10">
              <span className="absolute inset-[3px] rounded-full bg-[#00F0FF] shadow-[0_0_14px_#00F0FF]" />
            </span>
            <h3 className="font-space text-2xl font-bold tracking-tight mb-4">
              <span className="text-white/30 mr-3 tabular-nums">{i + 1}</span>{s.title}
            </h3>
            <p className="text-white/50 font-light leading-relaxed max-w-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function AreaPage() {
  const { scrollYProgress } = useScroll();
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <InteractiveBackground />
      {/* Barra de progresso de leitura, fina, no topo. */}
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 inset-x-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-[#00F0FF] to-[#7000FF]" />

      <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease }} className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/40 backdrop-blur-2xl px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto h-20 md:h-24 flex items-center justify-between gap-3">
          <AreaLockup />
          <nav className="hidden lg:flex gap-12 font-space text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
            <a href="#frentes" className="hover:text-[#00F0FF] transition-colors">O que fazemos</a>
            <a href="#processo" className="hover:text-[#00F0FF] transition-colors">Como funciona</a>
          </nav>
          <div className="hidden sm:block"><MagneticCTA href="#diagnostico">Diagnóstico</MagneticCTA></div>
        </div>
      </motion.header>

      <Hero />
      <Marquee />

      <section id="frentes" className="relative z-10 py-32 px-6 md:px-8 bg-[#050505]/90">
        <div className="max-w-[1440px] mx-auto">
          <Eyebrow center>O que fazemos</Eyebrow>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }} className="font-space text-3xl md:text-5xl font-bold tracking-tighter text-center mb-20 max-w-3xl mx-auto">
            Cinco frentes. Uma operação.
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OFFERS.map((o, i) => <OfferCard key={o.title} index={i} {...o} />)}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-40 px-6 md:px-8 border-t border-white/5">
        <ScrollStatement text="Seu cliente vê um site impecável. Não vê a operação por trás. Nada aparece. Tudo funciona." />
      </section>

      <section id="processo" className="relative z-10 py-32 px-6 md:px-8 border-t border-white/5 bg-[#050505]/90">
        <div className="max-w-[1440px] mx-auto">
          <Eyebrow>Como funciona</Eyebrow>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }} className="font-space text-3xl md:text-5xl font-bold tracking-tighter max-w-2xl">
            Você aprova. A casa de máquinas entrega.
          </motion.h2>
          <Process />
        </div>
      </section>

      <footer id="diagnostico" className="relative z-10 bg-black pt-32 pb-12 px-6 md:px-8 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          <div className="max-w-xl">
            <Eyebrow>Diagnóstico gratuito</Eyebrow>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }} className="font-space text-4xl md:text-5xl font-bold tracking-tighter mb-8">
              Comece pelo que ninguém te mostrou.
            </motion.h2>
            <p className="text-white/40 leading-relaxed">
              Conte sobre o seu negócio. Devolvemos uma leitura franca da sua presença digital e o próximo passo que mais gera retorno.
            </p>
          </div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }} className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-3xl backdrop-blur-md">
            <DiagnosticForm />
          </motion.div>
        </div>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-4 text-[9px] sm:text-xs text-white/20 font-space tracking-widest pt-8 border-t border-white/5">
          <span>{AREA.name.toUpperCase()} · WE EXPAND</span>
          <span>© {new Date().getFullYear()} WE EXPAND. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </main>
  );
}
