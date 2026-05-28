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
