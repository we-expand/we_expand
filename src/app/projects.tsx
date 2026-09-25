'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const PROJECTS = [
  {
    name: 'Neural Day Trader',
    tag: 'Quant Trading',
    desc: 'Plataforma de execução quantitativa para day trade: sinais validados por estatística fora da amostra, sentimento de mercado em tempo real cruzando 18 fontes de notícia e monitoramento de risco por posição, sem simulação e sem número inventado.',
    images: ['/projects/neural-1.png', '/projects/neural-2.png'],
  },
  {
    name: 'TáPago.pt',
    tag: 'Recuperação de crédito com IA',
    desc: 'Infraestrutura de cobrança autônoma para empresas: agentes de IA humanizados negociam por WhatsApp, SMS e voz, geram referência Multibanco e MB WAY nativamente na conversa e operam em modelo de success fee — a empresa só paga se recuperar.',
    images: ['/projects/tapago-1.png', '/projects/tapago-2.png'],
  },
  {
    name: 'Imob Hunter',
    tag: 'Inteligência de leads imobiliários',
    desc: 'Plataforma de geração de leads omnichannel para o mercado imobiliário: varre a web para encontrar proprietários reais sem intermediários, entrega leads em milissegundos e conecta direto ao WhatsApp, com compliance total a LGPD/GDPR.',
    images: ['/projects/imobhunter-1.png', '/projects/imobhunter-2.png'],
  },
];

export function ProjectsSection({ accent = '#7000FF' }: { accent?: string }) {
  return (
    <section id="projetos" className="relative z-10 py-28 md:py-32 px-6 md:px-8 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <span className="w-12 h-[1px]" style={{ background: accent }} />
          <span className="font-space uppercase tracking-[0.3em] text-xs font-bold" style={{ color: accent }}>Últimos projetos</span>
          <span className="w-12 h-[1px]" style={{ background: accent }} />
        </div>
        <h2 className="font-space text-3xl md:text-5xl font-bold tracking-tighter text-center mb-20 max-w-3xl mx-auto">
          Sistemas que colocamos em produção.
        </h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} {...p} accent={accent} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  name,
  tag,
  desc,
  images,
  accent,
  delay,
}: {
  name: string;
  tag: string;
  desc: string;
  images: string[];
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden backdrop-blur-sm rounded-2xl flex flex-col"
    >
      <div className="grid grid-cols-2 gap-px bg-white/5">
        {images.map((src) => (
          <div key={src} className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={src}
              alt={name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
          </div>
        ))}
      </div>
      <div className="relative z-10 p-8 md:p-10 flex flex-col flex-1">
        <span className="text-[10px] uppercase tracking-widest font-space font-bold block mb-3" style={{ color: `${accent}CC` }}>{tag}</span>
        <h3 className="font-space text-2xl font-bold mb-4 tracking-tight">{name}</h3>
        <p className="text-white/50 leading-relaxed font-light">{desc}</p>
      </div>
    </motion.div>
  );
}
