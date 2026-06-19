'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Network, Workflow, ArrowUpRight, Diamond } from 'lucide-react';
import { useRef } from 'react';

const WeExpandLogo = () => (
  <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-700 ease-out">
    <rect width="120" height="120" rx="24" fill="url(#bg-grad)" fillOpacity="0.05" className="group-hover:fillOpacity-10 transition-all duration-700"/>
    <path d="M30 45L45 80L60 55L75 80L90 45" stroke="url(#line-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="90" cy="45" r="4" fill="#00F0FF" className="animate-pulse" />
    <circle cx="60" cy="55" r="4" fill="#7000FF" />
    <circle cx="30" cy="45" r="4" fill="#00F0FF" />
    <defs>
      <linearGradient id="bg-grad" x1="0" y1="0" x2="120" y2="120">
        <stop stopColor="#00F0FF" />
        <stop offset="1" stopColor="#7000FF" />
      </linearGradient>
      <linearGradient id="line-grad" x1="30" y1="62.5" x2="90" y2="62.5">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#050505]">
      
      {/* BACKGROUND VÍDEO */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505] z-10" />
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 mix-blend-screen">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-background-34633-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* HEADER ATUALIZADO COM LINKS FUNCIONAIS */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/40 backdrop-blur-2xl transition-all duration-500">
        <div className="max-w-[1440px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <WeExpandLogo />
            <span className="font-space font-bold text-2xl tracking-tighter text-white">We<span className="text-white/40">Expand</span></span>
          </div>
          <nav className="hidden md:flex gap-12 font-space text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
            <a href="#vision" className="hover:text-[#00F0FF] transition-colors">The Vision</a>
            <a href="#expertise" className="hover:text-[#00F0FF] transition-colors">Expertise</a>
          </nav>
          <a href="#contact" className="relative px-8 py-3 bg-white text-black font-space font-bold uppercase text-xs tracking-widest rounded-full overflow-hidden group inline-block text-center cursor-pointer">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Contact Us</span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </a>
        </div>
      </header>

      {/* HERO SECTION COM ID="vision" */}
      <section id="vision" className="relative z-10 h-screen flex items-center px-8">
        <motion.div style={{ y: yParallax, opacity: opacityFade }} className="max-w-[1440px] mx-auto w-full mt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-[#00F0FF]" />
              <span className="font-space text-[#00F0FF] uppercase tracking-[0.3em] text-xs font-bold">Consultoria de Elite em IA</span>
            </div>
            
            <h1 className="font-space text-[5rem] md:text-[8rem] leading-[0.85] font-bold tracking-tighter mb-10">
              ENGINEERED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
                FOR THE
              </span> <br />
              UNPREDICTABLE.
            </h1>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 max-w-4xl">
              <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-xl">
                Nós não prevemos o futuro da sua operação. <strong className="text-white font-medium">Nós o computamos.</strong> Desenhamos ecossistemas preditivos para operações de missão crítica.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SEPARADOR */}
      <section className="relative z-10 py-32 px-8 bg-[#050505]/90 border-t border-white/5 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <Diamond className="w-8 h-8 mx-auto mb-10 text-[#7000FF] opacity-50" />
          <h2 className="font-space text-3xl md:text-5xl font-light leading-tight">
            "A inteligência artificial não é apenas uma ferramenta operacional. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#7000FF] font-bold">É o novo alicerce do capital.</span>"
          </h2>
        </div>
      </section>

      {/* EXPERTISE COM ID="expertise" */}
      <section id="expertise" className="relative z-10 py-32 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <ExpertiseCard 
              icon={<Network className="w-10 h-10 text-[#00F0FF]" />}
              title="Strategic Discovery"
              desc="Auditoria cirúrgica. Encontramos o ralo financeiro invisível da sua operação e desenhamos a arquitetura neural para estancá-lo."
              delay={0}
            />
            <ExpertiseCard 
              icon={<Workflow className="w-10 h-10 text-[#7000FF]" />}
              title="Custom Engines"
              desc="Desenvolvimento in-house de sistemas de inteligência sob demanda. Orientação preditiva perfeitamente integrada ao seu ERP."
              delay={0.2}
            />
            <ExpertiseCard 
              icon={<Cpu className="w-10 h-10 text-white" />}
              title="Talent Outsourcing"
              desc="Esquadrões de alta performance alocados in-loco. Cientistas de dados e engenheiros focados exclusivamente no seu domínio."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* FOOTER COM ID="contact" */}
      <footer id="contact" className="relative z-10 bg-black pt-32 pb-12 px-8 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-end gap-16 mb-24">
          <div className="max-w-xl">
            <h2 className="font-space text-5xl font-bold tracking-tighter mb-8">Ready to Expand?</h2>
            <p className="text-white/40 mb-10">Agende uma sessão estratégica com nossos arquitetos de decisão. Vagas limitadas para projetos de alta complexidade.</p>
            <a href="mailto:hello@we-expand.com" className="inline-flex items-center gap-4 text-xl font-bold border-b border-[#00F0FF] pb-2 hover:text-[#00F0FF] transition-colors">
              hello@we-expand.com <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
          <div className="flex gap-16 text-sm font-space uppercase tracking-[0.1em] text-white/30">
            <div className="flex flex-col gap-4">
              <span className="text-white font-bold mb-2">Social</span>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter // X</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white font-bold mb-2">Office</span>
              <span>São Paulo, SP</span>
              <span>Brasil</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center text-xs text-white/20 font-space tracking-widest pt-8 border-t border-white/5">
          <span>© {new Date().getFullYear()} WE EXPAND. ALL RIGHTS RESERVED.</span>
          <span>ELEVATING CORPORATE INTELLIGENCE.</span>
        </div>
      </footer>
    </main>
  );
}

function ExpertiseCard({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-12 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden backdrop-blur-sm rounded-2xl"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00F0FF]/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className="mb-12 bg-black/50 w-20 h-20 flex items-center justify-center rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="font-space text-2xl font-bold mb-4">{title}</h3>
        <p className="text-white/50 leading-relaxed mb-12 min-h-[80px]">{desc}</p>
        
        <div className="flex items-center gap-3 text-xs font-space font-bold uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">
          <span className="w-8 h-[1px] bg-white/20 group-hover:bg-[#00F0FF] group-hover:w-12 transition-all duration-500" />
          Discover
        </div>
      </div>
    </motion.div>
  );
}