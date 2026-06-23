'use client';
import { useState } from 'react';

// IMPORTANTE: Mantenha aqui as importações dos seus componentes originais
// ex: import Hero from './components/Hero'; 

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
        setFormState({ name: '', email: '', company: '', message: '' });
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
      {/* Abaixo, insira os seus componentes de design originais.
        O código que você tinha antes deveria ser inserido nestes locais.
      */}
      
      {/* Exemplo: <InteractiveBackground /> */}
      {/* Exemplo: <Header /> */}
      {/* Exemplo: <Hero /> */}
      {/* Exemplo: <Expertise /> */}

      {/* Seção de Contato - Integrada ao seu layout */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Solicitar Sessão Estratégica</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
               status === 'success' ? 'Sinal Neural Recebido!' : 'Enviar Solicitação'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}