'use client';
import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

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
        const errorData = await response.text();
        console.error('Erro na resposta da API:', errorData);
        alert('Falha na transmissão do sinal. Verifique o console.');
        setStatus('idle');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro de conexão com a rede neural.');
      setStatus('idle');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      {/* Aqui entra o seu conteúdo existente */}
      
      <section id="contact" className="mt-20">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <input 
            required 
            placeholder="Nome" 
            className="w-full bg-neutral-900 p-3 rounded"
            value={formState.name}
            onChange={e => setFormState({...formState, name: e.target.value})}
          />
          <input 
            required type="email" 
            placeholder="E-mail" 
            className="w-full bg-neutral-900 p-3 rounded"
            value={formState.email}
            onChange={e => setFormState({...formState, email: e.target.value})}
          />
          <input 
            required 
            placeholder="Empresa" 
            className="w-full bg-neutral-900 p-3 rounded"
            value={formState.company}
            onChange={e => setFormState({...formState, company: e.target.value})}
          />
          <textarea 
            required 
            placeholder="Mensagem" 
            className="w-full bg-neutral-900 p-3 rounded h-32"
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