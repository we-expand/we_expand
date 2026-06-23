'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Send, CheckCircle } from 'lucide-react';

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

  // ... (Mantenha aqui todo o seu design, InteractiveBackground, Header, Hero, Expertise, etc.)
  // IMPORTANTE: No rodapé, onde está o seu <form>, garanta que ele use:
  // onSubmit={handleSubmit}
  // E que os inputs tenham o onChange={e => setFormState({...formState, nomeDoCampo: e.target.value})}
  
  return (
    <main>
       {/* SEU DESIGN COMPLETO AQUI */}
       {/* APENAS CERTIFIQUE-SE DE QUE O FORMULÁRIO ESTÁ CONECTADO AO handleSubmit */}
    </main>
  );
}