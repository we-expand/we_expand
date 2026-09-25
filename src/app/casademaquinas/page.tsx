import type { Metadata } from 'next';
import Link from 'next/link';
import { WeExpandLogo, InteractiveBackground } from '../components/brand';
import { AREA } from './area';
import DiagnosticForm from './DiagnosticForm';

export const metadata: Metadata = {
  title: `${AREA.name} · We Expand`,
  description: 'Sites, identidade visual, presença no Google, conteúdo e mini-apps para negócios locais de alto padrão. Uma operação We Expand.',
};

const OFFERS = [
  { title: 'Sites', desc: 'Site institucional ou landing page com direção de arte própria, domínio e hospedagem inclusos.' },
  { title: 'Identidade visual', desc: 'Logo, paleta, tipografia, papelaria e manual de marca. O sistema que dá coerência a tudo o que vem depois.' },
  { title: 'Presença local', desc: 'Perfil do Google otimizado, SEO local, publicações semanais e relatório mensal de resultado.' },
  { title: 'Conteúdo', desc: 'Posts e stories prontos todo mês, com legendas e calendário, no padrão visual da sua marca.' },
  { title: 'Mini-apps', desc: 'Agendamento online, cardápio digital, catálogo com pedido pelo WhatsApp, área do cliente.' },
];

const STEPS = [
  { title: 'Diagnóstico', desc: 'Analisamos sua presença digital e mostramos, com clareza, o que falta e o que vale fazer primeiro.' },
  { title: 'Produção', desc: 'Uma operação enxuta e automatizada desenha, escreve e constrói. Você aprova; não gerencia.' },
  { title: 'Entrega', desc: 'Tudo no ar, revisado ponto a ponto: tipografia, contraste, velocidade, texto. Depois, acompanhamento contínuo.' },
];

// Mesma linguagem da home: fundo #050505 com a rede neural, Space Grotesk,
// ciano #00F0FF e violeta #7000FF, fios de 12px antes dos rótulos, cards de vidro.
const Eyebrow = ({ children, center = false }: { children: React.ReactNode; center?: boolean }) => (
  <div className={`flex items-center gap-3 mb-8 ${center ? 'justify-center' : ''}`}>
    <span className="w-12 h-[1px] bg-[#00F0FF]" />
    <span className="font-space text-[#00F0FF] uppercase tracking-[0.3em] text-xs font-bold">{children}</span>
    {center && <span className="w-12 h-[1px] bg-[#00F0FF]" />}
  </div>
);

// Assinatura provisória WeExpand / Casa de Máquinas, até o logo oficial sair do marketing.
const AreaLockup = () => (
  <Link href="/" className="flex items-center gap-1 md:gap-2 shrink-0">
    <WeExpandLogo />
    <span className="font-space font-bold text-lg md:text-2xl tracking-tighter text-white whitespace-nowrap">
      We<span className="text-white/40">Expand</span>
      <span className="text-[#00F0FF] mx-2 font-light">/</span>
      <span className="text-white/90">{AREA.name}</span>
    </span>
  </Link>
);

const CTA = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a href={href} className="relative px-6 md:px-8 py-3 md:py-4 bg-white text-black font-space font-bold uppercase text-[10px] md:text-xs tracking-widest rounded-full overflow-hidden group inline-block whitespace-nowrap">
    <span className="relative z-10 group-hover:text-white transition-colors duration-500">{children}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
  </a>
);

export default function AreaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <InteractiveBackground />

      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/40 backdrop-blur-2xl px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto h-20 md:h-24 flex items-center justify-between gap-3">
          <AreaLockup />
          <nav className="hidden lg:flex gap-12 font-space text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
            <a href="#frentes" className="hover:text-[#00F0FF] transition-colors">O que fazemos</a>
            <a href="#processo" className="hover:text-[#00F0FF] transition-colors">Como funciona</a>
          </nav>
          <CTA href="#diagnostico">Diagnóstico</CTA>
        </div>
      </header>

      <section className="relative z-10 min-h-screen flex items-center px-6 md:px-8 pt-40 pb-20">
        <div className="max-w-[1440px] mx-auto w-full">
          <Eyebrow>Uma operação We Expand</Eyebrow>
          <h1 className="font-space text-[2.75rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6.5rem] leading-[0.95] font-bold tracking-tighter mb-10">
            {AREA.tagline[0]}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-white">{AREA.tagline[1]}</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-2xl mb-10">
            Sites, identidade visual, presença no Google, conteúdo e mini-apps para negócios que valorizam a própria marca. Nada aparece. Tudo funciona.
          </p>
          <CTA href="#diagnostico">Pedir diagnóstico gratuito</CTA>
        </div>
      </section>

      <section id="frentes" className="relative z-10 py-32 px-6 md:px-8 bg-[#050505]/90 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <Eyebrow center>O que fazemos</Eyebrow>
          <h2 className="font-space text-3xl md:text-5xl font-bold tracking-tighter text-center mb-20 max-w-3xl mx-auto">
            Cinco frentes. Uma operação.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OFFERS.map((o, i) => (
              <div key={o.title} className="group relative p-8 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 backdrop-blur-sm rounded-2xl">
                <span className="font-space text-xs text-[#00F0FF]/70 tabular-nums tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-space text-2xl font-bold mt-6 mb-4">{o.title}</h3>
                <p className="text-white/50 leading-relaxed font-light">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="processo" className="relative z-10 py-32 px-6 md:px-8 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <Eyebrow center>Como funciona</Eyebrow>
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {STEPS.map((s, i) => (
              <div key={s.title}>
                <span className="block w-12 h-[1px] bg-gradient-to-r from-[#00F0FF] to-[#7000FF] mb-8" />
                <h3 className="font-space text-xl font-bold tracking-tight mb-4">
                  <span className="text-white/30 mr-3 tabular-nums">{i + 1}</span>{s.title}
                </h3>
                <p className="text-white/50 font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="diagnostico" className="relative z-10 bg-black pt-32 pb-12 px-6 md:px-8 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          <div className="max-w-xl">
            <Eyebrow>Diagnóstico gratuito</Eyebrow>
            <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tighter mb-8">Comece pelo que ninguém te mostrou.</h2>
            <p className="text-white/40 leading-relaxed">
              Conte sobre o seu negócio. Devolvemos uma leitura franca da sua presença digital e o próximo passo que mais gera retorno.
            </p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-3xl backdrop-blur-md">
            <DiagnosticForm />
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center text-[9px] sm:text-xs text-white/20 font-space tracking-widest pt-8 border-t border-white/5">
          <span>{AREA.name.toUpperCase()} · WE EXPAND</span>
          <span>© {new Date().getFullYear()} WE EXPAND. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </main>
  );
}
