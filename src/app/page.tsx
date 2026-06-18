'use client';

import { motion } from 'framer-motion';
import { Bot, Code2, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-blue-500/30">
      {/* HEADER */}
      <header className="fixed top-0 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter">
            We<span className="text-blue-500">Expand</span>
          </div>
          <a href="#contato" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-lg transition-colors">
            Falar com Especialista
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Inteligência Artificial como o <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                motor da sua operação.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl">
              Auditoria de processos, desenvolvimento de sistemas sob demanda e alocação de Squads de alta performance em IA. Escale sua empresa sem inflar seu RH.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#servicos" className="px-6 py-3 bg-white text-black text-center font-medium rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                Conhecer Soluções <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicos" className="py-24 bg-neutral-900 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como nós expandimos o seu negócio</h2>
            <p className="text-neutral-400 text-lg">Soluções de ponta a ponta para desafios complexos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-950 hover:border-blue-500/50 transition-colors">
              <Bot className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold mb-3">AI Product Discovery</h3>
              <p className="text-neutral-400 leading-relaxed">
                Mapeamento estratégico de gargalos operacionais e desenho da arquitetura de IA ideal para reduzir custos.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-950 hover:border-blue-500/50 transition-colors">
              <Code2 className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Sistemas Sob Demanda</h3>
              <p className="text-neutral-400 leading-relaxed">
                Desenvolvimento de ponta a ponta de motores autônomos e preditivos integrados ao banco de dados da sua empresa.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-950 hover:border-blue-500/50 transition-colors">
              <Cpu className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Outsourcing de Squads</h3>
              <p className="text-neutral-400 leading-relaxed">
                Alocação de esquadrões multidisciplinares in loco ou remotos, dedicados a executar o seu roadmap de tecnologia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Execução rápida. <br/>Risco mitigado.</h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Trabalhamos com a metodologia "Sell First, Hire Second". Nossos talentos já estão mapeados e prontos para entrar em operação assim que o seu projeto exigir.
            </p>
            <ul className="space-y-4">
              {['Profissionais de nível Sênior', 'Implementação em Shadow Mode', 'Arquitetura modular de rápida entrega'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 w-full aspect-square md:aspect-[4/3] bg-gradient-to-tr from-neutral-900 to-neutral-800 border border-neutral-800 rounded-3xl flex items-center justify-center p-8">
             {/* Placeholder visual para a arquitetura */}
             <div className="w-full h-full border border-neutral-700/50 rounded-xl bg-neutral-950/50 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <Cpu className="w-16 h-16 text-neutral-600 z-10 mb-4" />
                <p className="text-neutral-500 font-mono text-sm z-10">WeExpand_Engine_Active</p>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER & CTA */}
      <footer id="contato" className="bg-neutral-950 py-12 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-bold tracking-tighter">
            We<span className="text-blue-500">Expand</span>
          </div>
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} We Expand Consulting. Transformando operações corporativas com IA.
          </p>
        </div>
      </footer>
    </main>
  );
}