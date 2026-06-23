'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Cpu, Network, Workflow, ArrowUpRight, Diamond, CheckCircle, Send } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// --- LOGOTIPO E COMPONENTES ORIGINAIS (MANTIDOS) ---
const WeExpandLogo = () => (
  <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-700 ease-out">
    <path d="M30 45L45 80L60 55L75 80L90 45" stroke="url(#line-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="90" cy="45" r="4" fill="#00F0FF" className="animate-pulse" />
    <circle cx="60" cy="55" r="4" fill="#7000FF" />
    <circle cx="30" cy="45" r="4" fill="#00F0FF" />
    <defs><linearGradient id="line-grad" x1="30" y1="62.5" x2="90" y2="62.5"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#ffffff" stopOpacity="0.2" /></linearGradient></defs>
  </svg>
);

const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#050505] z-0" /><div className="absolute inset-0 z-10 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-[130px] transition-transform duration-500 ease-out z-20" style={{ background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(112, 0, 255, 0.05) 40%, transparent 70%)', transform: `translate(${mousePosition.x - 400}px, ${mousePosition.y - 400}px)` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505] z-30" />
    </div>
  );
};

function ExpertiseCard({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay }} className="p-12 bg-white/[0.02] border border-white/5 rounded-2xl">
      <div className="mb-12 bg-black/50 w-20 h-20 flex items-center justify-center rounded-2xl border border-white/10">{icon}</div>
      <h3 className="font-space text-2xl font-bold mb-4">{title}</h3>
      <p className="text-white/50">{desc}</p>
    </motion.div>
  );
}

// --- FUNÇÃO HOME COM FORMULÁRIO INTEGRADO ---
export default function Home() {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (response.ok) { setStatus('success'); setFormState({ name: '', email: '', company: '', message: '' }); }
      else { alert('Erro na transmissão.'); setStatus('idle'); }
    } catch (e) { alert('Erro de rede.'); setStatus('idle'); }
  };

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white">
      <InteractiveBackground />
      {/* HEADER, HERO, MANIFESTO E EXPERTISE... (Seu design original aqui) */}
      
      {/* RODAPÉ E FORMULÁRIO */}
      <footer id="contact" className="relative z-10 bg-black pt-32 pb-12 px-8 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16">
          <div><h2 className="text-5xl font-bold">The Algorithmic Advantage.</h2></div>
          <div className="bg-white/[0.01] border border-white/5 p-10 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input required name="name" placeholder="Nome" className="w-full bg-white/[0.02] p-3 rounded-xl border border-white/10" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
              <input required type="email" name="email" placeholder="E-mail" className="w-full bg-white/[0.02] p-3 rounded-xl border border-white/10" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
              <input required name="company" placeholder="Empresa" className="w-full bg-white/[0.02] p-3 rounded-xl border border-white/10" value={formState.company} onChange={e => setFormState({...formState, company: e.target.value})} />
              <textarea required name="message" placeholder="Mensagem" className="w-full bg-white/[0.02] p-3 rounded-xl border border-white/10 h-32" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
              <button type="submit" className="w-full bg-white text-black font-bold p-4 rounded-xl">{status === 'submitting' ? 'Enviando...' : 'Solicitar Sessão Estratégica'}</button>
            </form>
          </div>
        </div>
      </footer>
    </main>
  );
}