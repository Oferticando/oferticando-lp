"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

/**
 * PartnershipSection Component
 * 
 * Renders the infrastructure partnership banner (featuring Unificando) and the
 * final conversion Call to Action (CTA) block.
 */
export function PartnershipSection() {
  const addToRefs = useScrollAnimation();

  return (
    <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 mt-28">
      
      {/* Banner do Ecossistema Unificando (Neo-Brutalist design system) */}
      <div
        ref={addToRefs}
        className="opacity-0 translate-y-8 transition-all duration-1000 ease-out border-2 border-gray-900 p-8 md:p-12 rounded-[2rem] bg-white hover:shadow-[8px_8px_0px_#ccff00] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-500 flex flex-col items-center text-center mb-28 group"
      >
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">
          Parceria de Infraestrutura
        </span>
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 tracking-tight leading-tight max-w-xl mb-6">
          Alimentado por tecnologia ultraveloz da{" "}
          <span className="font-semibold underline decoration-[#ccff00] decoration-4 underline-offset-4">
            Unificando
          </span>
        </h2>
        <p className="text-xs text-gray-500 font-light max-w-md leading-relaxed mb-8">
          Nossas vitrines públicas e sistemas de clonagem operam nos servidores dedicados da Unificando, garantindo 99.9% de uptime e entregas com latência quase nula.
        </p>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
          Servidores Conectados
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
        </div>
      </div>

      {/* CTA de Conversão Final */}
      <div
        ref={addToRefs}
        className="opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out text-center flex flex-col items-center"
      >
        <div className="w-px h-24 bg-secondary/30 mb-12" />

        <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight leading-tight mb-8">
          Pare de perder comissões no manual.
          <br />
          <span className="text-gray-400 font-light text-2xl md:text-3xl mt-4 block">
            Construa seu negócio de ofertas hoje.
          </span>
        </h2>

        <a
          href={`${APP_URL}/cadastro`}
          className="flex items-center justify-center text-white bg-[#ED6F1D] hover:bg-[#D16B20] rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] h-14 px-12 transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
        >
          Começar Agora Grátis
          <i className="pi pi-arrow-right text-[10px] ml-3" />
        </a>
      </div>
    </section>
  );
}
