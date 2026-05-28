"use client";

import { useEffect, useState } from "react";
import { ApiService } from "@/services";
import { Plan } from "@/services/plans.service";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, Info, Sparkles } from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

// Planos padrão para Fallback Seguro caso o backend esteja offline
const FALLBACK_PLANS: Plan[] = [
  {
    id: "fallback-free",
    name: "Free",
    slug: "free",
    price: 0,
    description: "Ideal para começar e testar a plataforma sem custos.",
    maxVitrines: 1,
    maxOfertas: 20,
    maxGrupos: 1,
    maxWhatsappInstances: 0,
    isActive: true,
  },
  {
    id: "fallback-starter",
    name: "Starter",
    slug: "starter",
    price: 29.90,
    description: "Perfeito para afiliados em crescimento que precisam de mais canais.",
    maxVitrines: 3,
    maxOfertas: 100,
    maxGrupos: 5,
    maxWhatsappInstances: 1,
    isActive: true,
  },
  {
    id: "fallback-pro",
    name: "Pro",
    slug: "pro",
    price: 49.90,
    description: "Escala total e automação completa para afiliados profissionais.",
    maxVitrines: -1, // Ilimitado
    maxOfertas: -1,  // Ilimitado
    maxGrupos: -1,   // Ilimitado
    maxWhatsappInstances: -1, // Ilimitado
    isActive: true,
  },
];

export function PricingSection() {
  const addToRefs = useScrollAnimation();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    async function loadPlans() {
      try {
        const data = await ApiService.plans.getPublicPlans();
        if (data && data.length > 0) {
          // Filtra planos ativos, exclui plano 'admin' e ordena por preço ascendente
          const activePlans = data
            .filter((p) => p.isActive && p.slug !== "admin")
            .map((p) => ({
              ...p,
              price: Number(p.price),
              maxVitrines: Number(p.maxVitrines),
              maxOfertas: Number(p.maxOfertas),
              maxGrupos: Number(p.maxGrupos),
              maxWhatsappInstances: Number(p.maxWhatsappInstances),
            }))
            .sort((a, b) => a.price - b.price);
          setPlans(activePlans);
        } else {
          setPlans(FALLBACK_PLANS);
          setIsUsingFallback(true);
        }
      } catch (error) {
        console.warn("[Pricing] Falha ao carregar planos da API, usando fallback:", error);
        setPlans(FALLBACK_PLANS);
        setIsUsingFallback(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlans();
  }, []);

  const formatLimit = (value: number, pluralLabel: string, singularLabel: string) => {
    if (value === -1) return "Ilimitadas";
    if (value === 0) return "Não incluso";
    return `${value} ${value === 1 ? singularLabel : pluralLabel}`;
  };

  const formatGenericLimit = (value: number, pluralLabel: string, singularLabel: string) => {
    if (value === -1) return "Ilimitados";
    if (value === 0) return "Não incluso";
    return `${value} ${value === 1 ? singularLabel : pluralLabel}`;
  };


  return (
    <section id="planos" className="py-28 bg-[#ffffff] relative border-t border-b border-gray-100 overflow-hidden">
      {/* Detalhes de Background de Alta Qualidade */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4 block"
          >
            Tabela de Preços
          </span>
          <h2
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out text-3.5xl md:text-4.5xl font-light tracking-tight text-gray-900 leading-tight"
          >
            Escolha o plano ideal para a sua estrutura.
          </h2>
          <p
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 delay-150 ease-out text-sm text-gray-500 font-light mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Pague pelo que você precisa e aumente suas vendas de afiliado no piloto automático. Sem taxas surpresas. Cancelamento fácil a qualquer momento.
          </p>

          {isUsingFallback && (
            <div className="inline-flex items-center gap-2 mt-6 px-4 py-1.5 bg-gray-50 border border-gray-150 rounded-full text-[11px] text-gray-400 font-light">
              <Info className="w-3.5 h-3.5" />
              <span>Valores de planos padrão carregados off-line</span>
            </div>
          )}
        </div>

        {!mounted || isLoading ? (
          /* Shimmering Skeleton Loader */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-[2rem] p-8 bg-[#fafafa] animate-pulse flex flex-col gap-6"
              >
                <div className="h-6 w-1/3 bg-gray-200 rounded-sm" />
                <div className="h-10 w-1/2 bg-gray-200 rounded-sm" />
                <div className="h-4 w-5/6 bg-gray-200 rounded-sm" />
                <hr className="border-gray-100" />
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 w-4/5 bg-gray-200 rounded-sm" />
                  ))}
                </div>
                <div className="h-14 w-full bg-gray-200 rounded-sm mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          /* Grid de Planos Dinâmico */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch">
            {plans.map((plan, index) => {
              const isPro = plan.slug === "pro";
              const isStarter = plan.slug === "starter";

              return (
                <div
                  key={plan.id}
                  className={`flex flex-col border rounded-[2rem] p-8 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/80 ${
                    isPro
                      ? "border-2 border-gray-900 md:-translate-y-4 relative md:shadow-xl md:shadow-orange-500/5 hover:border-[#ED6F1D]!"
                      : "border-gray-150 hover:border-gray-900!"
                  }`}
                >
                  {isPro && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ED6F1D] text-white text-[9px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3 animate-pulse" />
                      Recomendado
                    </span>
                  )}

                  {/* Nome e Preço */}
                  <div className="mb-6">
                    <h3 className="text-xl font-normal tracking-tight text-gray-900 flex items-center justify-between">
                      {plan.name}
                      {isStarter && (
                        <span className="text-[9px] bg-blue-50 text-secondary border border-blue-100 px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold">
                          Popular
                        </span>
                      )}
                    </h3>
                    <p className="mt-3 text-xs text-gray-400 font-light leading-relaxed min-h-[36px]">
                      {plan.description}
                    </p>
                    <div className="mt-6 flex items-baseline">
                      <span className="text-4xl font-light text-gray-900 tracking-tighter">
                        {plan.price === 0 ? (
                          "Grátis"
                        ) : (
                          <>
                            <span className="text-lg font-light text-gray-400 mr-1">R$</span>
                            {plan.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </>
                        )}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-xs text-gray-400 font-light ml-1">/mês</span>
                      )}
                    </div>
                  </div>

                  <hr className="border-gray-100 my-6" />

                  {/* Limites e Funcionalidades */}
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start text-xs text-gray-600 font-light">
                      <div className={`p-0.5 rounded-full mr-3 mt-0.5 ${plan.maxVitrines > 0 || plan.maxVitrines === -1 ? "bg-orange-50 text-[#ED6F1D]" : "bg-gray-100 text-gray-400"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong>Vitrines:</strong> {formatGenericLimit(plan.maxVitrines, "vitrines", "vitrine")}
                      </span>
                    </li>
                    <li className="flex items-start text-xs text-gray-600 font-light">
                      <div className={`p-0.5 rounded-full mr-3 mt-0.5 ${plan.maxOfertas > 0 || plan.maxOfertas === -1 ? "bg-orange-50 text-[#ED6F1D]" : "bg-gray-100 text-gray-400"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong>Ofertas:</strong> {formatLimit(plan.maxOfertas, "ofertas ativas", "oferta ativa")}
                      </span>
                    </li>
                    <li className="flex items-start text-xs text-gray-600 font-light">
                      <div className={`p-0.5 rounded-full mr-3 mt-0.5 ${plan.maxGrupos > 0 || plan.maxGrupos === -1 ? "bg-orange-50 text-[#ED6F1D]" : "bg-gray-100 text-gray-400"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong>Grupos WhatsApp:</strong> {formatGenericLimit(plan.maxGrupos, "grupos monitorados", "grupo monitorado")}
                      </span>
                    </li>
                    <li className="flex items-start text-xs text-gray-600 font-light">
                      <div className={`p-0.5 rounded-full mr-3 mt-0.5 ${plan.maxWhatsappInstances > 0 || plan.maxWhatsappInstances === -1 ? "bg-orange-50 text-[#ED6F1D]" : "bg-gray-100 text-gray-400"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong>Envios Automatizados:</strong> {formatLimit(plan.maxWhatsappInstances, "instâncias ativas", "instância ativa")}
                      </span>
                    </li>
                    {isPro && (
                      <li className="flex items-start text-xs text-[#ED6F1D] font-medium">
                        <div className="p-0.5 rounded-full mr-3 mt-0.5 bg-orange-50 text-[#ED6F1D]">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>Suporte prioritário via WhatsApp</span>
                      </li>
                    )}
                  </ul>

                  {/* CTA Botão */}
                  <a
                    href={`${APP_URL}/cadastro?plan=${plan.slug}`}
                    className={`w-full flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] h-14 rounded-sm transition-all duration-300 ${
                      isPro
                        ? "text-white bg-[#ED6F1D] hover:bg-[#D16B20] shadow-lg shadow-orange-500/20"
                        : "text-gray-700 bg-gray-50 hover:bg-gray-900 hover:text-white border border-gray-200"
                    }`}
                  >
                    Começar Agora
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
