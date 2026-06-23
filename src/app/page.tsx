'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Network, Workflow, ArrowUpRight, Diamond } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// LOGOTIPO VETORIAL PURO (SEM FUNDO)
const WeExpandLogo = () => (
  <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-700 ease-out">
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
  </svg>
);

// BACKGROUND NEURAL INTERATIVO E DELICADO
const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#050505] z-0" />
      
      {/* Malha sutil de dados */}
      <div className="absolute inset-0 z-10 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Luz difusa inteligente guiada pelo usuário */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-[130px] transition-transform duration-500 ease-out z-20"
        style={{ 
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(112, 0, 255, 0.05) 40%, transparent 70%)',
          transform: `translate(${mousePosition.x - 400}px, ${mousePosition.y - 400}px)`
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505] z-30" />
    </div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#050505]">
      
      <InteractiveBackground />

      {/* HEADER COESO COM CLIQUE NO LOGO PARA RETORNO */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/40 backdrop-blur-2xl transition-all duration-500">
        <div className="max-w-[1440px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={scrollToTop}>
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

      {/* HERO SECTION CONCEITUAL */}
      <section id="vision" className="relative z-10 h-screen flex items-center px-8">
        <motion.div style={{ y: yParallax, opacity: opacityFade }} className="max-w-[1440px] mx-auto w-full mt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-[#00F0FF]" />
              <span className="font-space text-[#00F0FF] uppercase tracking-[0.3em] text-xs font-bold">Engenharia de Decisão e Ativos Cognitivos</span>
            </div>
            
            <h1 className="font-space text-[5rem] md:text-[8rem] leading-[0.85] font-bold tracking-tighter mb-10">
              ENGINEERED