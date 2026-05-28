"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    title: "Crie sua Vitrine Exclusiva",
    description: "Defina o nome da sua vitrine, configure o link da bio (ex: oferticando.com.br/v/suamarca) e personalize as cores e logos em menos de 1 minuto. Sem tocar em uma linha de código.",
    icon: "pi-compass",
    badge: "No-Code"
  },
  {
    number: "02",
    title: "Automatize seus Grupos",
    description: "Integre seus grupos de WhatsApp ou canais do Telegram. Nosso sistema lê as ofertas dos canais de referência em tempo real, substitui o link original pelo seu ID de afiliado e posta na sua vitrine e grupos.",
    icon: "pi-sync",
    badge: "100% Automático"
  },
  {
    number: "03",
    title: "Monetize Todo o Tráfego",
    description: "Cada clique que seus seguidores derem na sua vitrine ou nos seus grupos é rastreado. Eles compram diretamente nas maiores lojas (Shopee, Amazon, M. Livre) e a comissão vai direto para a sua conta.",
    icon: "pi-wallet",
    badge: "Escala Real"
  }
];

export function HowItWorksSection() {
  const addToRefs = useScrollAnimation();

  return (
    <section id="como-funciona" className="py-32 bg-white relative border-b border-gray-100">
      {/* Detalhe de fundo em degradê */}
      <div className="absolute inset-0 bg-linear-to-tr from-gray-50/50 via-white to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4 block"
          >
            Fluxo Simplificado
          </span>
          <h2
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out text-3xl md:text-4xl font-light tracking-tight text-gray-900 leading-tight"
          >
            Do zero ao faturamento no piloto automático em <span className="text-secondary font-normal">3 passos</span>.
          </h2>
        </div>

        {/* Grade de Passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Linha conectora apenas visível no desktop */}
          <div className="hidden md:block absolute top-[68px] left-[15%] right-[15%] h-[1px] bg-linear-to-r from-transparent via-gray-100 to-transparent -z-10" />

          {steps.map((s, i) => (
            <div
              key={s.number}
              ref={addToRefs}
              className="opacity-0 translate-y-8 transition-all duration-1000 ease-out flex flex-col items-center text-center p-8 bg-white border border-gray-100/60 rounded-3xl hover:border-gray-200 hover:shadow-xl hover:shadow-gray-50/50 transition-all duration-300 relative group"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Número do Passo */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gray-900 text-white font-mono text-[10px] font-bold tracking-widest shadow-md">
                PASSO {s.number}
              </span>

              {/* Ícone */}
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-secondary mb-8 group-hover:scale-110 transition-transform duration-300">
                <i className={`pi ${s.icon} text-xl`} />
              </div>

              {/* Tag Destaque */}
              <span className="text-[9px] font-bold px-2.5 py-1 rounded-md bg-secondary/5 text-secondary uppercase tracking-widest mb-4">
                {s.badge}
              </span>

              {/* Título */}
              <h3 className="text-lg font-medium text-gray-900 tracking-tight mb-4">
                {s.title}
              </h3>

              {/* Descrição */}
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
