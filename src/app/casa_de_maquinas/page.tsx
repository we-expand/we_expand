import type { Metadata } from 'next';
import Link from 'next/link';
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

const eyebrow = 'font-space text-[11px] font-bold uppercase tracking-[0.3em]';

export default function AreaPage() {
  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#141414]/70 backdrop-blur-2xl px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-space text-sm md:text-base tracking-tight whitespace-nowrap">
            <Link href="/" className="font-bold text-white/40 hover:text-white transition-colors">We<span className="font-bold">Expand</span></Link>
            <span className="w-4 h-px bg-white/20" aria-hidden />
            <span className="font-bold">{AREA.name}</span>
          </div>
          <a href="#diagnostico" className={`${eyebrow} text-white/60 hover:text-[#B08D57] transition-colors whitespace-nowrap`}>
            Diagnóstico
          </a>
        </div>
      </header>

      {/* HERO: só tipografia. A marca é a própria ideia de não aparecer. */}
      <section className="px-6 md:px-8 pt-48 pb-32 md:pt-60 md:pb-44">
        <div className="max-w-[1200px] mx-auto">
          <p className={`${eyebrow} text-[#B08D57] mb-10`}>Uma operação We Expand</p>
          <h1 className="font-space font-bold tracking-tighter leading-[0.95] text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem]">
            {AREA.tagline[0]}
            <br />
            <span className="text-white/25">{AREA.tagline[1]}</span>
          </h1>
          <p className="mt-12 max-w-xl text-lg md:text-xl font-light leading-relaxed text-white/55">
            Sites, identidade visual, presença no Google, conteúdo e mini-apps para negócios que valorizam a própria marca.
            Nada aparece. Tudo funciona.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-8 py-28 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-16">
          <p className={`${eyebrow} text-white/40`}>O que fazemos</p>
          <ol>
            {OFFERS.map((o, i) => (
              <li key={o.title} className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_14rem_1fr] gap-x-6 gap-y-2 py-8 border-t border-white/10 first:border-t-0 first:pt-0">
                <span className="font-space text-sm text-white/30 tabular-nums pt-1">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="font-space text-2xl font-bold tracking-tight">{o.title}</h2>
                <p className="col-start-2 md:col-start-3 text-white/50 font-light leading-relaxed">{o.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 md:px-8 py-28 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-16">
          <p className={`${eyebrow} text-white/40`}>Como funciona</p>
          <div className="grid md:grid-cols-3 gap-12">
            {STEPS.map((s, i) => (
              <div key={s.title}>
                <span className="block w-8 h-px bg-[#B08D57] mb-8" aria-hidden />
                <h3 className="font-space text-xl font-bold tracking-tight mb-4">
                  <span className="text-white/30 mr-3 tabular-nums">{i + 1}</span>{s.title}
                </h3>
                <p className="text-white/50 font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnostico" className="px-6 md:px-8 py-28 md:py-40 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className={`${eyebrow} text-[#B08D57] mb-8`}>Diagnóstico gratuito</p>
            <h2 className="font-space text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
              Comece pelo que<br />ninguém te mostrou.
            </h2>
            <p className="mt-8 max-w-md text-white/50 font-light leading-relaxed">
              Conte sobre o seu negócio. Devolvemos uma leitura franca da sua presença digital e o próximo passo que mais gera retorno.
            </p>
          </div>
          <DiagnosticForm />
        </div>
      </section>

      <footer className="px-6 md:px-8 py-10 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto flex justify-between gap-4 font-space text-[10px] sm:text-xs tracking-widest uppercase text-white/25">
          <span>{AREA.name} · We Expand</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
