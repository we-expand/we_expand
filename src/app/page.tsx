'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Mantenha suas importações originais aqui (Cpu, Network, etc)

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
    <main className="bg-[#050505] text-white min-h-screen">
      {/* COLE AQUI TODO O SEU DESIGN ORIGINAL:
         <InteractiveBackground />
         <Header />
         <Hero />
         <Expertise />
      */}

      {/* NO RODAPÉ, ONDE ESTÁ O SEU FORMULÁRIO, USE ESTE BLOCO: */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          required 
          name="name"
          placeholder="Seu Nome" 
          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3"
          value={formState.name}
          onChange={e => setFormState({...formState, name: e.target.value})}
        />
        <input 
          required type="email" 
          name="email"
          placeholder="E-mail Executivo" 
          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3"
          value={formState.email}
          onChange={e => setFormState({...formState, email: e.target.value})}
        />
        <input 
          required 
          name="company"
          placeholder="Corporação" 
          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3"
          value={formState.company}
          onChange={e => setFormState({...formState, company: e.target.value})}
        />
        <textarea 
          required 
          name="message"
          rows={4}
          placeholder="Desafio Operacional" 
          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3"
          value={formState.message}
          onChange={e => setFormState({...formState, message: e.target.value})}
        />
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-white text-black font-bold py-4 rounded-xl"
        >
          {status === 'submitting' ? 'Processando...' : 
           status === 'success' ? 'Sinal Neural Recebido!' : 'Solicitar Sessão Estratégica'}
        </button>
      </form>
    </main>
  );
}