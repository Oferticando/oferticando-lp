"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * CalculatorSection Component
 * 
 * Provides interactive sliders to estimate how many manual hours and estimated outreach
 * the user can optimize and save by using Oferticando.
 */
export function CalculatorSection() {
  const addToRefs = useScrollAnimation();
  const [groupsCount, setGroupsCount] = useState<number>(3);
  const [offersPerDay, setOffersPerDay] = useState<number>(15);

  // Cálculos da Calculadora Interativa
  const timePerOfferManualInMinutes = 3.5; // Tempo para buscar, formatar, gerar link de afiliado e postar em grupos manualmente
  const timeSpentManualPerMonthInHours = Math.round((groupsCount * offersPerDay * timePerOfferManualInMinutes * 30) / 60);
  const timeSpentOferticandoPerMonthInHours = 0.5; // Apenas 30 minutos por mês de monitoramento básico
  const timeSavedHours = Math.max(1, Math.round(timeSpentManualPerMonthInHours - timeSpentOferticandoPerMonthInHours));
  const estimatedReach = (groupsCount * offersPerDay * 30 * 180).toLocaleString("pt-BR"); // Supondo média de 180 visualizações acumuladas por post

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4 block"
          >
            Calculadora de Eficiência
          </span>
          <h2
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out text-3xl font-light tracking-tight text-gray-900"
          >
            Descubra quanto tempo e dinheiro você economiza no automático.
          </h2>
        </div>

        {/* Container Principal da Calculadora */}
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out bg-white border border-gray-200 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Controles deslizantes (Sliders) */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              
              {/* Slider 1: Quantidade de Canais */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Grupos / Canais para Enviar:
                  </span>
                  <span className="text-lg font-bold text-secondary font-mono">{groupsCount}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={groupsCount}
                  onChange={(e) => setGroupsCount(parseInt(e.target.value))}
                  className="w-full accent-secondary cursor-pointer h-1.5 bg-gray-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono">
                  <span>1 canal</span>
                  <span>10 canais</span>
                  <span>20 canais</span>
                </div>
              </div>

              {/* Slider 2: Quantidade de Ofertas por dia */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Ofertas Curtidas / Dia:
                  </span>
                  <span className="text-lg font-bold text-secondary font-mono">{offersPerDay}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={offersPerDay}
                  onChange={(e) => setOffersPerDay(parseInt(e.target.value))}
                  className="w-full accent-secondary cursor-pointer h-1.5 bg-gray-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono">
                  <span>5 ofertas</span>
                  <span>25 ofertas</span>
                  <span>50 ofertas</span>
                </div>
              </div>

              <div className="p-4 border border-gray-100 bg-gray-50/50 rounded-lg">
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  *Estimativa de tempo manual baseada em 3,5 minutos por oferta para pesquisar, estruturar, trocar o link de afiliado no painel do parceiro e republicar em cada um dos seus grupos.
                </p>
              </div>
            </div>

            {/* Resultados (Métricas de impacto) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-12">
              
              {/* Bloco 1: Tempo Economizado */}
              <div className="flex flex-col gap-2 p-6 border border-gray-100 bg-[#fbfbfc] rounded-lg">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Tempo Economizado
                </span>
                <div className="text-3xl font-light text-gray-900 tracking-tight font-mono">
                  {timeSavedHours}h <span className="text-xs text-gray-400 font-light">/mês</span>
                </div>
                <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                  Você recupera horas preciosas para focar em parcerias e crescer sua audiência.
                </p>
              </div>

              {/* Bloco 2: Alcance Estimado de Mensagens */}
              <div className="flex flex-col gap-2 p-6 border border-gray-100 bg-[#fbfbfc] rounded-lg">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Alcance de Ofertas
                </span>
                <div className="text-3xl font-light text-secondary tracking-tight font-mono">
                  {estimatedReach}
                </div>
                <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                  Disparos automáticos garantem que nenhuma promoção quente expire antes de converter.
                </p>
              </div>

              {/* Bloco 3: Eficiência Total */}
              <div className="sm:col-span-2 flex flex-col gap-2 p-6 border border-gray-900 bg-gray-900 text-white rounded-lg">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Aumento de Eficiência
                </span>
                <div className="text-4xl font-light text-white tracking-tighter font-mono flex items-center gap-3">
                  99.2%
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
                </div>
                <p className="text-[10px] text-gray-300 font-light leading-relaxed">
                  A automação reduz o processo manual de horas de digitação e geração de links a apenas <strong>1 clique</strong>.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
