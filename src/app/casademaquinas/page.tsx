'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Globe, Palette, MapPin, Layers, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { AREA } from './area';
import DiagnosticForm from './DiagnosticForm';
import { AreaLockup, InteractiveBackground } from '../brand';
import { ProjectsSection } from '../projects';

const GLOW = '#00F0FF';

const OFFERS = [
  { icon: Globe, title: 'Sites', desc: 'Site institucional ou landing page com direção de arte própria, domínio e hospedagem inclusos.' },
  { icon: Palette, title: 'Identidade visual', desc: 'Logo, paleta, tipografia, papelaria e manual de marca. O sistema que dá coerência a tudo o que vem depois.' },
  { icon: MapPin, title: 'Presença local', desc: 'Perfil do Google otimizado, SEO local, publicações semanais e relatório mensal de resultado.' },
  { icon: Layers, title: 'Conteúdo', desc: 'Posts e stories prontos todo mês, com legendas e calendário, no padrão visual da sua marca.' },
  { icon: Smartphone, title: 'Mini-apps', desc: 'Agendamento online, cardápio digital, catálogo com pedido pelo WhatsApp, área do cliente.' },
];

const STEPS = [
  { title: 'Diagnóstico', desc: 'Analisamos sua presença digital e mostramos, com clareza, o que falta e o que vale fazer primeiro.' },
  { title: 'Produção', desc: 'Uma operação enxuta e automatizada desenha, escreve e constrói. Você aprova; não gerencia.' },
  { title: 'Entrega', desc: 'Tudo no ar, revisado ponto a ponto: tipografia, contraste, velocidade, texto. Depois, acompanhamento contínuo.' },
];

const eyebrow = 'font-space text-[11px] font-bold uppercase tracking-[0.3em]';

const ease = [0.16, 1, 0.3, 1] as const;

const lineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease },
  },
};

const HeroLine = ({ text, className }: { text: string; className?: string }) => (
  <span>
    {text.split(' ').map((w, i) => (
      <motion.span key={i} variants={word} className={`inline-block mr-[0.25em] last:mr-0 ${className ?? ''}`}>
        {w}
      </motion.span>
    ))}
  </span>
);

export default function AreaPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      <InteractiveBackground />

      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#050505]/50 backdrop-blur-2xl px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto h-20 flex items-center justify-between gap-4">
          <Link href="/" aria-label="Voltar para a WeExpand">
            <AreaLockup areaName={AREA.name} size="sm" />
          </Link>
          <a
            href="#diagnostico"
            className="relative px-5 md:px-7 py-2.5 md:py-3 bg-white text-black font-space font-bold uppercase text-[10px] md:text-xs tracking-widest rounded-full overflow-hidden group inline-block text-center cursor-pointer shrink-0 whitespace-nowrap"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Diagnóstico grátis</span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-8 pt-48 pb-32 md:pt-60 md:pb-44">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-12 h-[1px]" style={{ background: GLOW }} />
            <span className={`${eyebrow}`} style={{ color: GLOW }}>Uma operação We Expand</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={lineContainer}
            className="font-space font-bold tracking-tighter leading-[0.95] text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem]"
          >
            <HeroLine text={AREA.tagline[0]} />
            <br />
            <HeroLine
              text={AREA.tagline[1]}
              className="text-transparent bg-clip-text bg-gradient-to-r from-white/70 to-white/20"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-12 max-w-xl text-lg md:text-xl font-light leading-relaxed text-white/55"
          >
            Sites, identidade visual, presença no Google, conteúdo e mini-apps para negócios que valorizam a própria marca.
            Nada aparece. Tudo funciona.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-12"
          >
            <a href="#diagnostico" className="relative px-8 py-4 bg-white text-black font-space font-bold uppercase text-xs tracking-widest rounded-full overflow-hidden group inline-flex items-center gap-2 cursor-pointer">
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Pedir diagnóstico gratuito</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* O QUE FAZEMOS */}
      <section className="relative z-10 px-6 md:px-8 py-28 border-t border-white/5 bg-[#050505]/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-16">
          <p className={`${eyebrow} text-white/40`}>O que fazemos</p>
          <ol>
            {OFFERS.map((o, i) => {
              const Icon = o.icon;
              return (
                <motion.li
                  key={o.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease }}
                  className="group grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-x-6 gap-y-2 py-8 border-t border-white/10 first:border-t-0 first:pt-0"
                >
                  <h2 className="font-space text-2xl font-bold tracking-tight flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#00F0FF] opacity-70 group-hover:opacity-100 transition-opacity" />
                    {o.title}
                  </h2>
                  <p className="text-white/50 font-light leading-relaxed">{o.desc}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="relative z-10 px-6 md:px-8 py-28 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-16">
          <p className={`${eyebrow} text-white/40`}>Como funciona</p>
          <div className="grid md:grid-cols-3 gap-12">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease }}
              >
                <span className="block w-8 h-px mb-8" style={{ background: GLOW }} aria-hidden />
                <h3 className="font-space text-xl font-bold tracking-tight mb-4">
                  <span className="text-white/30 mr-3 tabular-nums">{i + 1}</span>{s.title}
                </h3>
                <p className="text-white/50 font-light leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsSection accent={GLOW} />

      {/* DIAGNÓSTICO */}
      <section id="diagnostico" className="relative z-10 px-6 md:px-8 py-28 md:py-40 border-t border-white/5 bg-[#050505]/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
          >
            <p className={`${eyebrow} mb-8`} style={{ color: GLOW }}>Diagnóstico gratuito</p>
            <h2 className="font-space text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
              Comece pelo que<br />ninguém te mostrou.
            </h2>
            <p className="mt-8 max-w-md text-white/50 font-light leading-relaxed">
              Conte sobre o seu negócio. Devolvemos uma leitura franca da sua presença digital e o próximo passo que mais gera retorno.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-3xl backdrop-blur-md"
          >
            <DiagnosticForm />
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 px-6 md:px-8 py-10 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto flex justify-between gap-4 font-space text-[10px] sm:text-xs tracking-widest uppercase text-white/25">
          <span>{AREA.name} · We Expand</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
