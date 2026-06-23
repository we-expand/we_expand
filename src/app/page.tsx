'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// --- (Aqui entram os seus imports originais de componentes, ex: <InteractiveBackground />, <Hero /> etc) ---

export default function Home() {
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
    <main className="min-h-screen bg-black text-white">
      {/* COLE AQUI A ESTRUTURA DO SEU DESIGN ORIGINAL:
          <InteractiveBackground />
          <Header />
          <Hero />
          <Expertise />
      */}

      {/* RODAPÉ E FORMULÁRIO DE CONTATO */}
      <section id="contact" className="py-20 px-6">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <input 
            required name="name" placeholder="Nome" 
            className="w-full bg-neutral-900 p-3 rounded border border-white/10"
            value={formState.name}
            onChange={e => setFormState({...formState, name: e.target.value})}
          />
          <input 
            required type="email" name="email" placeholder="E-mail" 
            className="w-full bg-neutral-900 p-3 rounded border border-white/10"
            value={formState.email}
            onChange={e => setFormState({...formState, email: e.target.value})}
          />
          <input 
            required name="company" placeholder="Empresa" 
            className="w-full bg-neutral-900 p-3 rounded border border-white/10"
            value={formState.company}
            onChange={e => setFormState({...formState, company: e.target.value})}
          />
          <textarea 
            required name="message" placeholder="Mensagem" 
            className="w-full bg-neutral-900 p-3 rounded border border-white/10 h-32"
            value={formState.message}
            onChange={e => setFormState({...formState, message: e.target.value})}
          />
          
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full bg-cyan-500 text-black font-bold p-3 rounded hover:bg-cyan-400 transition"
          >
            {status === 'submitting' ? 'Enviando...' : 
             status === 'success' ? 'Sinal Neural Recebido!' : 'Solicitar Sessão Estratégica'}
          </button>
        </form>
      </section>
    </main>
  );
}