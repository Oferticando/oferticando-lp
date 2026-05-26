"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";
import { DashboardMockup } from "./DashboardMockup";

/**
 * HeroSection Component
 * 
 * Renders the main landing header including copy, CTAs, decorative gradients,
 * and the CSS-based dashboard simulation.
 */
export function HeroSection() {
  const addToRefs = useScrollAnimation();

  return (
    <section className="relative pt-24 pb-32 md:pt-36 md:pb-44 border-b border-gray-100 bg-white">
      {/* Gradiente sutil decorativo - Marca Registrada do Oferticando */}
      <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-linear-to-b from-orange-50/20 to-transparent -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Esquerda: Conteúdo e Copy direcionada a Iniciantes */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div
              ref={addToRefs}
              className="opacity-0 translate-y-8 transition-all duration-1000 ease-out flex items-center gap-3 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-[0.25em]">
                Plataforma SaaS Tudo-em-Um para Afiliados
              </span>
            </div>

            <h1
              ref={addToRefs}
              className="opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1] mb-6"
            >
              Seu próprio império de ofertas.
              <br />
              <span className="text-secondary font-normal">Sem precisar programar nada.</span>
            </h1>

            <p
              ref={addToRefs}
              className="opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out text-base md:text-lg text-gray-500 font-light max-w-xl leading-relaxed mb-10"
            >
              Chega de copiar links manualmente e perder comissões. O <strong>Oferticando</strong> unifica tudo o que você precisa: crie uma vitrine premium para seu link da bio, clone grupos lucrativos de ofertas no WhatsApp e acesse um marketplace inteligente. Pareça gigante e fature como os profissionais desde o primeiro dia.
            </p>

            <div
              ref={addToRefs}
              className="opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href={`${APP_URL}/cadastro`}
                className="flex items-center justify-center text-white bg-gray-900 hover:bg-black rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] h-14 px-10 transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg animate-in fade-in"
              >
                Criar Minha Conta Grátis
                <i className="pi pi-arrow-right text-[10px] ml-3 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#recursos"
                className="flex items-center justify-center text-gray-900 bg-white border border-gray-200 hover:border-gray-900 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] h-14 px-10 transition-all duration-300"
              >
                Ver Como Funciona
              </a>
            </div>
          </div>

          {/* Direita: Mockup Interativo em CSS do SaaS (Fator "Wow") */}
          <div 
            ref={addToRefs}
            className="lg:col-span-6 opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out w-full"
          >
            <DashboardMockup />
          </div>

        </div>
      </div>
    </section>
  );
}
