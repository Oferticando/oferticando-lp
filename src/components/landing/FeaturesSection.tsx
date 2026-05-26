"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const saasFeatures = [
  {
    icon: "pi-globe",
    title: "A Vitrine Premium",
    description:
      "Seu próprio site de ofertas personalizado, ultraveloz e otimizado para celulares. Coloque no link da bio do Instagram ou TikTok e passe autoridade absoluta desde o primeiro dia. Seus clientes buscam e encontram em milissegundos.",
  },
  {
    icon: "pi-whatsapp",
    title: "Clonagem Evolution",
    description:
      "Chega de perder tempo digitando ou convertendo links um por um. Monitore canais de referência, copie as melhores ofertas e republique automaticamente em múltiplos grupos de WhatsApp com o seu ID de afiliado inserido.",
  },
  {
    icon: "pi-shopping-bag",
    title: "Marketplace de Feeds",
    description:
      "Conecte-se e cresça com o ecossistema. Descubra ofertas quentes cadastradas por outros parceiros, insira suas credenciais em um clique e publique direto na sua vitrine. Compartilhe inteligência e acelere seus resultados.",
  },
];

/**
 * FeaturesSection Component
 * 
 * Renders the triple-feature columns that highlight the core offerings of Oferticando.
 */
export function FeaturesSection() {
  const addToRefs = useScrollAnimation();

  return (
    <section id="recursos" className="py-32 bg-white relative border-t border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="max-w-3xl mb-24">
          <h2
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4"
          >
            Tecnologia Integrada
          </h2>
          <p
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out text-3xl md:text-4xl font-light tracking-tight text-gray-900"
          >
            Tudo o que você precisa em uma única assinatura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 text-left">
          {saasFeatures.map((f, i) => (
            <div
              key={f.title}
              ref={addToRefs}
              className="opacity-0 translate-y-8 transition-all duration-1000 ease-out flex flex-col items-start"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Ícone customizado circular com borda sutil */}
              <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-gray-50 border border-gray-100 text-secondary mb-8 shadow-sm">
                <i className={`pi ${f.icon} text-lg`} />
              </div>
              
              <h3 className="text-xl font-normal tracking-tight text-gray-900 mb-4">
                {f.title}
              </h3>
              
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
