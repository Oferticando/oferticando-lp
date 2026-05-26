"use client";

import { useState } from "react";

/**
 * DashboardMockup Component
 * 
 * Simulates a SaaS dashboard with three tabs: "Minha Vitrine" (My Shop window),
 * "Clonador" (Cloner log), and "Marketplace" (simulated affiliation interaction).
 */
export function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<"vitrine" | "clonagem" | "marketplace">("vitrine");
  const [isAffiliatedDell, setIsAffiliatedDell] = useState<boolean>(false);
  const [isAffiliatedTv, setIsAffiliatedTv] = useState<boolean>(false);

  return (
    <div className="bg-white border border-gray-200 rounded-[2rem] shadow-2xl shadow-gray-200/80 overflow-hidden">
      
      {/* Header do Mockup */}
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="bg-gray-100 border border-gray-200 text-gray-400 text-[9px] font-mono px-4 py-1 rounded-full uppercase tracking-wider">
          painel.oferticando.com.br
        </div>
        <div className="w-6" />
      </div>

      {/* Grid Interno do Dashboard Simulado */}
      <div className="grid grid-cols-12 min-h-[380px] bg-white">
        
        {/* Mini Sidebar do Painel */}
        <div className="col-span-4 border-r border-gray-100 p-4 flex flex-col gap-2 bg-gray-50/50">
          <div className="flex items-center gap-2 px-2 py-1 mb-4">
            <div className="w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center text-white text-xs font-black">
              O.
            </div>
            <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Oferticando</span>
          </div>

          <button
            onClick={() => setActiveTab("vitrine")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-colors duration-300 ${
              activeTab === "vitrine"
                ? "bg-white border border-gray-200 text-gray-900 font-bold"
                : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <i className="pi pi-globe text-xs" />
            <span className="text-[9px] uppercase tracking-wider font-semibold">Minha Vitrine</span>
          </button>

          <button
            onClick={() => setActiveTab("clonagem")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-colors duration-300 ${
              activeTab === "clonagem"
                ? "bg-white border border-gray-200 text-gray-900 font-bold"
                : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <i className="pi pi-whatsapp text-xs" />
            <span className="text-[9px] uppercase tracking-wider font-semibold">Clonador</span>
          </button>

          <button
            onClick={() => setActiveTab("marketplace")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-colors duration-300 ${
              activeTab === "marketplace"
                ? "bg-white border border-gray-200 text-gray-900 font-bold"
                : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <i className="pi pi-shopping-bag text-xs" />
            <span className="text-[9px] uppercase tracking-wider font-semibold">Marketplace</span>
          </button>
          
          {/* Indicador de rodapé da sidebar */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-1.5 px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Ativo</span>
          </div>
        </div>

        {/* Conteúdo Dinâmico Baseado na Aba */}
        <div className="col-span-8 p-6 flex flex-col justify-start">
          
          {/* ABA 1: VITRINE */}
          {activeTab === "vitrine" && (
            <div className="animate-in fade-in duration-300 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Design da Vitrine</span>
                <span className="bg-green-50 text-green-600 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border border-green-200 rounded-sm">No Ar</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Endereço Público</span>
                  <span className="text-[10px] font-mono bg-gray-50 border border-gray-100 p-2 rounded-sm text-gray-700 select-all">
                    oferticando.com.br/v/promo-bio
                  </span>
                </div>
                
                {/* Mini visualizador de celular */}
                <div className="mt-4 border border-gray-100 rounded-xl bg-gray-50/50 p-3 relative shadow-inner">
                  <div className="bg-white border border-gray-100 rounded-lg p-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-secondary text-xs font-bold">
                      %
                    </div>
                    <div className="flex-1 flex flex-col">
                      <span className="text-[9px] font-bold text-gray-900 leading-tight">iPhone 15 Pro Max 256GB</span>
                      <span className="text-[9px] font-normal text-secondary tracking-tight">R$ 6.899,00</span>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-gray-900 flex items-center justify-center">
                      <i className="pi pi-arrow-right text-[6px] text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 2: CLONAGEM */}
          {activeTab === "clonagem" && (
            <div className="animate-in fade-in duration-300 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Automação Ativa</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-bold uppercase text-green-600 tracking-wider">Monitorando</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-sm text-[9px]">
                  <span className="text-gray-500 font-semibold uppercase tracking-wider">Origem:</span>
                  <span className="text-gray-700 font-mono">Grupo Referência A</span>
                  <i className="pi pi-arrow-right text-gray-400 text-[8px]" />
                  <span className="text-gray-500 font-semibold uppercase tracking-wider">Destino:</span>
                  <span className="text-secondary font-bold font-mono">Meus Canais (4)</span>
                </div>
                
                {/* Live Console Output */}
                <div className="bg-gray-900 rounded-lg p-3 text-[8px] font-mono text-gray-300 leading-normal flex flex-col gap-1 shadow-md">
                  <div className="text-green-400 font-bold">&gt;_ SISTEMA DE CLONAGEM INICIADO</div>
                  <div>[19:54:10] Capturada oferta: Air Fryer Mondial</div>
                  <div className="text-orange-400">[19:54:11] Trocando link: afiliado_id=renato2026</div>
                  <div className="text-green-300">[19:54:12] Sucesso: Enviada para WhatsApp! ✔</div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: MARKETPLACE */}
          {activeTab === "marketplace" && (
            <div className="animate-in fade-in duration-300 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Ofertas Disponíveis</span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-secondary font-mono">Comissão Pronta</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {/* Item 1 */}
                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-900">Notebook Gamer Dell G15</span>
                    <span className="text-[8px] font-mono text-gray-400">R$ 4.599 • Comissão 10%</span>
                  </div>
                  <button 
                    onClick={() => setIsAffiliatedDell(!isAffiliatedDell)}
                    className={`rounded-sm text-[8px] font-bold uppercase tracking-wider px-3 h-7 transition-colors ${
                      isAffiliatedDell 
                        ? "bg-green-500 text-white border-none" 
                        : "bg-gray-900 hover:bg-black text-white"
                    }`}
                  >
                    {isAffiliatedDell ? "Afiliado! ✓" : "Afiliar Link"}
                  </button>
                </div>

                {/* Item 2 */}
                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-900">Smart TV 50&quot; Samsung 4K</span>
                    <span className="text-[8px] font-mono text-gray-400">R$ 2.199 • Comissão 8%</span>
                  </div>
                  <button 
                    onClick={() => setIsAffiliatedTv(!isAffiliatedTv)}
                    className={`rounded-sm text-[8px] font-bold uppercase tracking-wider px-3 h-7 transition-colors ${
                      isAffiliatedTv 
                        ? "bg-green-500 text-white border-none" 
                        : "bg-gray-900 hover:bg-black text-white"
                    }`}
                  >
                    {isAffiliatedTv ? "Afiliado! ✓" : "Afiliar Link"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
