'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Cpu, Network, Workflow, ArrowUpRight, Diamond, CheckCircle, Send } from 'lucide-react';
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
      <div className="absolute inset-0 z-10 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
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

      {/* HEADER COESO */}
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

      {/* HERO SECTION */}
      <section id="vision" className="relative z-10 h-screen flex items-center px-8">
        <motion.div style={{ y: yParallax, opacity: opacityFade }} className="max-w-[1440px] mx-auto w-full mt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-[#00F0FF]" />
              <span className="font-space text-[#00F0FF] uppercase tracking-[0.3em] text-xs font-bold">Engenharia de Decisão e Ativos Cognitivos</span>
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
                Nós não desenvolvemos softwares tradicionais. Nós construímos o <strong className="text-white font-medium">Sistema Nervoso</strong> da sua empresa. Transformamos dados mortos em inteligência preditiva e alocamos Esquadrões de IA de elite para tornar a sua operação autônoma, escalável e imune a falhas humanas.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MANIFESTO / SEPARADOR */}
      <section className="relative z-10 py-32 px-8 bg-[#050505]/90 border-t border-white/5 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <Diamond className="w-8 h-8 mx-auto mb-10 text-[#7000FF] opacity-50" />
          <h2 className="font-space text-3xl md:text-5xl font-light leading-tight">
            "O software tradicional dita como você trabalha hoje. A Inteligência Artificial preditiva dita <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#7000FF] font-bold">se você existirá amanhã.</span> Pare de comprar código obsoleto. Comece a treinar o cérebro da sua corporação."
          </h2>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section id="expertise" className="relative z-10 py-32 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <ExpertiseCard 
              icon={<Network className="w-10 h-10 text-[#00F0FF]" />}
              title="Cognitive Discovery"
              desc="Auditoria cirúrgica. Mapeamos o DNA da sua operação para encontrar ralos financeiros invisíveis. Desenhamos a arquitetura neural exata e o plano de ação para substituí-los por lucro e eficiência autônoma."
              delay={0}
            />
            <ExpertiseCard 
              icon={<Workflow className="w-10 h-10 text-[#7000FF]" />}
              title="Autonomous Engines"
              desc="Esqueça softwares de prateleira. Desenvolvemos ecossistemas de IA proprietários, motores de precificação e agentes de orientação em tempo real que se integram nativamente ao seu ERP."
              delay={0.2}
            />
            <ExpertiseCard 
              icon={<Cpu className="w-10 h-10 text-white" />}
              title="Neural Squads"
              desc="Não infle o seu RH corporativo. Alocamos in-loco (ou remotamente) nossos esquadrões sêniores de cientistas de dados e engenheiros de IA para executar o seu roadmap tecnológico em tempo recorde."
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
              Construir inteligência proprietária não é para qualquer operação. É um movimento estratégico para empresas que desejam dominar o seu setor. Agende uma sessão de Discovery com nossos arquitetos estruturais. Operamos com vagas limitadas de alocação de Squads para garantir excelência absoluta na entrega.
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
        <p className="text-white/50 leading-relaxed mb-12 min-h-[80px] font-light">{desc}</p>
        
        <div className="flex items-center gap-3 text-xs font-space font-bold uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">
          <span className="w-8 h-[1px] bg-white/20 group-hover:bg-[#00F0FF] group-hover:w-12 transition-all duration-500" />
          Discover
        </div>
      </div>
    </motion.div>
  );
}