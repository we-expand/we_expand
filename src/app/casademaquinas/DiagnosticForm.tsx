'use client';

import { useState } from 'react';
import { AREA } from './area';

const field = 'w-full bg-transparent border-b border-white/15 py-3 text-base font-light placeholder:text-white/25 focus:outline-none focus:border-[#00F0FF] transition-colors';
const label = 'font-space text-[10px] font-bold uppercase tracking-[0.25em] text-white/40';

export default function DiagnosticForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, company: `[${AREA.name}] ${form.company}` }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="py-12">
        <p className="font-space text-2xl font-bold tracking-tight">Recebido.</p>
        <p className="mt-4 text-white/50 font-light">Respondemos por e-mail em até um dia útil.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid sm:grid-cols-2 gap-10">
        <label className="block space-y-2">
          <span className={label}>Nome</span>
          <input required name="name" value={form.name} onChange={onChange} className={field} />
        </label>
        <label className="block space-y-2">
          <span className={label}>Negócio</span>
          <input required name="company" value={form.company} onChange={onChange} className={field} />
        </label>
      </div>
      <label className="block space-y-2">
        <span className={label}>E-mail</span>
        <input required type="email" name="email" value={form.email} onChange={onChange} className={field} />
      </label>
      <label className="block space-y-2">
        <span className={label}>Site ou Instagram atual</span>
        <textarea required rows={2} name="message" value={form.message} onChange={onChange} className={`${field} resize-none`} placeholder="Link e, se quiser, o que mais te incomoda hoje" />
      </label>
      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="relative px-8 py-4 rounded-full bg-white text-black font-space text-xs font-bold uppercase tracking-widest overflow-hidden group disabled:opacity-50 cursor-pointer"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">
            {status === 'sending' ? 'Enviando' : 'Pedir diagnóstico'}
          </span>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
        </button>
        {status === 'error' && <span className="text-sm text-white/50">Não foi possível enviar. Tente de novo.</span>}
      </div>
    </form>
  );
}
