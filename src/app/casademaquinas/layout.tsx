import type { Metadata } from 'next';
import { AREA } from './area';

export const metadata: Metadata = {
  title: `${AREA.name} · We Expand`,
  description: 'Sites, identidade visual, presença no Google, conteúdo e mini-apps para negócios locais de alto padrão. Uma operação We Expand.',
};

export default function AreaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
