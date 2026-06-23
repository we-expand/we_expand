'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Cpu, Network, Workflow, Diamond, CheckCircle, Send } from 'lucide-react';

// Logotipo WeExpand
const WeExpandLogo = () => (
  <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 45L45 80L60 55L75 80L90 45" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="90" cy="45" r="4" fill="#00F0FF" />
    <circle cx="60" cy="55" r="4" fill="#7000FF" />
    <circle cx="30" cy="45" r="4" fill="#00F0FF" />
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
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });

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
      } else {
        alert('Falha na transmissão.');
        setStatus('idle');
      }
    } catch (error) {
      alert('Erro de conexão.');
      setStatus('idle');
    }
  };

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white">
      <InteractiveBackground />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/40 backdrop-blur-2xl">
        <div className="max-w-[1440px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4"><WeExpandLogo /><span className="font-bold text-2xl">WeExpand</span></div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 h-screen flex items-center px-8">
        <motion.div style={{ y: yParallax }} className="max-w-[1440px] mx-auto">
          <h1 className="text-[5rem] md:text-[8rem] font-bold tracking-tighter leading-[0.85]">ENGINEERED <br/>FOR THE UNPREDICTABLE.</h1>
        </motion.div>
      </section>

      {/* RODAPÉ COM FORMULÁRIO INTEGRADO */}
      <footer id="contact" className="relative z-10 bg-black pt-32 pb-12 px-8 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-5xl font-bold mb-8">The Algorithmic Advantage.</h2>
            <p className="text-white/40">Agende uma sessão de Discovery.</p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-md">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input required name="name" placeholder="Nome" className="w-full bg-white/[0.02] border border-white/10 p-3 rounded-xl" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                  <input required type="email" name="email" placeholder="E-mail" className="w-full bg-white/[0.02] border border-white/10 p-3 rounded-xl" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                  <input required name="company" placeholder="Empresa" className="w-full bg-white/[0.02] border border-white/10 p-3 rounded-xl" value={formState.company} onChange={e => setFormState({...formState, company: e.target.value})} />
                  <textarea required name="message" placeholder="Mensagem" className="w-full bg-white/[0.02] border border-white/10 p-3 rounded-xl h-32" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
                  <button type="submit" disabled={status === 'submitting'} className="w-full bg-white text-black font-bold p-4 rounded-xl">
                    {status === 'submitting' ? 'Enviando...' : 'Solicitar Sessão Estratégica'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12"><CheckCircle className="w-16 h-16 text-[#00F0FF] mx-auto mb-4" /><h3 className="text-2xl font-bold">Sinal Neural Recebido.</h3></div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </footer>
    </main>
  );
}