'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Cpu, Network, Workflow, ArrowUpRight, Diamond, Zap } from 'lucide-react';

// LOGOTIPO PURO: Sem fundo, apenas o glifo vetorial de expansão.
const WeExpandLogo = () => (
  <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-700">
    <path 
      d="M20 35L40 65L60 35L80 65" 
      stroke="url(#logo-grad)" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]"
    />
    <defs>
      <linearGradient id="logo-grad" x1="20" y1="35" x2="80" y2="65">
        <stop stopColor="#00F0FF" />
        <stop offset="1" stopColor="#7000FF" />
      </linearGradient>
    </defs>
  </svg>
);

// BACKGROUND INTERATIVO: Partículas neurais delicadas
const NeuralBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020202]">
      {/* Luz ambiente que segue o mouse */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] transition-all duration-1000 ease-out"
        style={{ 
          background: 'radial-gradient(circle, #7000FF 0%, transparent 70%)',
          left: mousePos.x - 300,
          top: mousePos.y - 300 
        }}
      />
      
      {/* Grade de partículas estáticas sutis */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
      
      {/* Elementos flutuantes (Nodes) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            x: [Math.random() * 100, Math.random() * -100],
            y: [Math.random() * 100, Math.random() * -100]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%` 
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main ref={containerRef} className="relative min-h-screen text-white antialiased selection:bg-[#00F0FF]/30">
      
      <NeuralBackground />

      {/* HEADER PREMIUM */}
      <header className="fixed top-0 w-full z-50 px-8 py-6">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center bg-white/[0.03] border border-white/5 backdrop-blur-xl rounded-full px-8 h-20 transition-all duration-500 hover:border-white/10">
          <div 
            onClick={scrollToTop}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <WeExpandLogo />
            <span className="font-space font-bold text-xl tracking-tighter uppercase italic group-hover:tracking-normal transition-all duration-700">
              We<span className="text-white/40">Expand</span>
            </span>
          </div>

          <nav className="hidden md:flex gap-12 font-space text-[10px] font-black tracking-[0.3em] uppercase text-white/40">
            <a href="#vision" className="hover:text-white transition-colors">Strategy</a>
            <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
          </nav>

          <a href="#contact" className="bg-white text-black px-8 py-3 rounded-full font-space font-black uppercase text-[10px] tracking-widest hover:bg-[#00F0FF] transition-all duration-500 shadow-xl shadow-white/5">
            Get in Touch
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="vision" className="relative z-10 h-screen flex flex-col justify-center px-8">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-screen-2xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-space text-[10vw] md:text-[7vw] font-black leading-[0.8] tracking-tighter uppercase mb-12">
              Expanding <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F0FF] to-[#7000FF]">
                Boundaries.
              </span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-12 max-w-5xl">
              <p className="text-xl md:text-2xl font-light text-white/50 leading-relaxed max-w-2xl border-l border-white/10 pl-8">
                "A tecnologia é o que nos diferencia dos nossos ancestrais, <br/>mas a IA é o que nos diferenciará do nosso presente."
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center animate-bounce">
                  <Zap size={18} className="text-[#00F0FF]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* EXPERTISE SECTION */}
      <section id="expertise" className="relative z-10 py-40 px-8 bg-black/40 backdrop-blur-3xl border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid md:grid-cols-3 gap-1px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            <ExpertiseCard 
              icon={<Network className="w-8 h-8 text-[#00F0FF]" />}
              title="Predictive Discovery"
              desc="Auditamos o invisível. Mapeamos fluxos de dados para encontrar o ralo financeiro e transformá-lo em receita."
              index="01"
            />
            <ExpertiseCard 
              icon={<Workflow className="w-8 h-8 text-[#7000FF]" />}
              title="Neural Engines"
              desc="Desenvolvemos motores autônomos sob medida que aprendem e agem sem intervenção humana."
              index="02"
            />
            <ExpertiseCard 
              icon={<Cpu className="w-8 h-8 text-white" />}
              title="Elite Squads"
              desc="Alocação in-loco de engenheiros de IA sêniores para acelerar seu roadmap tecnológico."
              index="03"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="relative z-10 bg-black py-24 px-8 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div>
            <div className="flex items-center gap-4 mb-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <WeExpandLogo />
              <span className="font-space font-bold text-2xl tracking-tighter uppercase italic">We Expand</span>
            </div>
            <p className="text-3xl md:text-5xl font-space font-bold tracking-tighter leading-none mb-4">
              READY FOR THE <br /> <span className="text-white/20 uppercase italic">Next Step?</span>
            </p>
            <a href="mailto:hello@we-expand.com" className="text-xl font-space text-[#00F0FF] flex items-center gap-2 hover:gap-4 transition-all">
              hello@we-expand.com <ArrowUpRight />
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-6 font-space">
              <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">Navigation</span>
              <a href="#vision" className="text-sm text-white/40 hover:text-white transition-colors">Vision</a>
              <a href="#expertise" className="text-sm text-white/40 hover:text-white transition-colors">Expertise</a>
            </div>
            <div className="flex flex-col gap-6 font-space">
              <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">Presence</span>
              <span className="text-sm text-white/40">São Paulo, BR</span>
              <span className="text-sm text-white/40">Lisbon, PT</span>
            </div>
          </div>
        </div>
        <div className="mt-32 text-center font-space text-[10px] tracking-[0.5em] text-white/10 uppercase border-t border-white/5 pt-12">
          We Expand Consulting // Master of Artificial Intelligence
        </div>
      </footer>
    </main>
  );
}

function ExpertiseCard({ icon, title, desc, index }: { icon: any, title: string, desc: string, index: string }) {
  return (
    <div className="bg-[#050505] p-16 flex flex-col gap-12 group relative hover:bg-black transition-all duration-700">
      <span className="font-space font-black text-6xl text-white/5 absolute top-12 right-12 group-hover:text-[#00F0FF]/10 transition-colors">
        {index}
      </span>
      <div className="w-16 h-16 flex items-center justify-center border border-white/10 rounded-2xl group-hover:border-[#00F0FF]/50 transition-all duration-700">
        {icon}
      </div>
      <div>
        <h3 className="font-space text-2xl font-bold mb-6 uppercase tracking-tight">{title}</h3>
        <p className="text-white/40 leading-relaxed font-light text-lg">{desc}</p>
      </div>
    </div>
  );
}