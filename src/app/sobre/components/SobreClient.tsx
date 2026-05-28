"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

const pillars = [
  {
    icon: "pi-palette",
    title: "Vitrine Premium (Zero Code)",
    description:
      "Crie sua loja de ofertas elegante e totalmente otimizada para o link da bio do Instagram ou TikTok em menos de um minuto, sem precisar programar nada.",
  },
  {
    icon: "pi-bolt",
    title: "Automação de Conteúdo",
    description:
      "Nossa inteligência puxa automaticamente os títulos, imagens e metadados das principais lojas, gerando links encurtados já com a sua tag de afiliado.",
  },
  {
    icon: "pi-whatsapp",
    title: "Sincronização em Canais",
    description:
      "Copie e formate ofertas instantaneamente para disparar em grupos de WhatsApp e canais de Telegram, mantendo seu público ativo e engajado.",
  },
  {
    icon: "pi-wallet",
    title: "Comissões 100% Suas",
    description:
      "Diferente de outras plataformas, não cobramos taxa sobre suas vendas e não dividimos sua comissão. Todo o lucro do seu trabalho vai direto para você.",
  },
];

export function SobreClient() {
  const addToRefs = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-100 selection:text-secondary antialiased py-24 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho & Botão Voltar */}
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-gray-400 uppercase tracking-[0.2em] hover:text-gray-900 transition-colors mb-8 group"
          >
            <i className="pi pi-arrow-left text-[10px] transition-transform group-hover:-translate-x-1" />
            Início
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em]">
              Visão do Produto
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1] mb-8">
            Criamos a ferramenta que{" "}
            <span className="font-semibold text-secondary">
              nós mesmos precisávamos.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-3xl">
            O Oferticando não nasceu em uma sala de reuniões corporativa. Ele
            surgiu de uma necessidade real, no dia a dia de quem precisava
            divulgar promoções de forma profissional, sem perder comissões e sem
            depender de layouts travados.
          </p>
        </div>

        {/* Divisor */}
        <div className="w-px h-16 bg-gray-200 mb-16" />

        {/* Seção 1: De Dor Pessoal a SaaS */}
        <section
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 tracking-tight">
                De criador para criadores.
              </h2>
              <p className="text-base text-gray-500 font-light leading-relaxed">
                Tudo começou como uma ferramenta interna. Eu precisava de uma
                página rápida e bonita para reunir cupons e ofertas, mantendo o
                controle total dos links e dos meus afiliados. Nenhuma solução
                do mercado entregava o visual premium e a velocidade de
                carregamento que meu público merecia.
              </p>
              <p className="text-base text-gray-500 font-light leading-relaxed">
                Ao ver a conversão de vendas disparar e a economia de tempo
                diária ser absurda, percebi que essa experiência não deveria ser
                só minha. O Oferticando foi completamente reconstruído como um
                **SaaS de alta performance**, pronto para que qualquer afiliado
                ou criador de conteúdo crie seu próprio império de vendas.
              </p>
            </div>

            {/* Widget Visual - Vitrine Preview */}
            <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-[4rem]" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Plataforma Ativa
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400 font-light">
                      Sua Vitrine Online
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      oferticando.com.br/v/seu-nome
                    </p>
                  </div>
                  <i className="pi pi-check-circle text-emerald-500 text-lg" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                    <p className="text-xs text-gray-400 font-light">
                      Taxa de Cliques
                    </p>
                    <p className="text-lg font-bold text-secondary">+28.4%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                    <p className="text-xs text-gray-400 font-light">
                      Comissão SaaS
                    </p>
                    <p className="text-lg font-bold text-gray-800">100% Sua</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Toda a tecnologia necessária para simplificar o seu fluxo de
                vendas, eliminando tarefas manuais e maximizando o retorno dos
                seus cliques.
              </p>
            </div>
          </div>
        </section>

        {/* Seção 2: Pilares / Valores do SaaS */}
        <section
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out mb-24"
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em]">
              O que nos torna únicos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white border border-gray-100/70 p-8 rounded-3xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 mb-6 group-hover:bg-secondary/5 group-hover:text-secondary transition-colors">
                    <i className={`pi ${pillar.icon} text-base`} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção 3: Idealização & Tecnologia (Unificando) */}
        <section
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out mb-24 relative overflow-hidden bg-white border-2 border-gray-900 rounded-[2.5rem] p-10 md:p-14 group transition-all duration-300 hover:shadow-[8px_8px_0px_#020617] hover:-translate-x-1 hover:-translate-y-1"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00] rounded-bl-[5rem] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 border border-gray-100">
                  Idealização & Tecnologia
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter leading-tight">
                A força por trás do <br />
                <span className="text-secondary">Oferticando.</span>
              </h2>

              <div className="space-y-4">
                <p className="text-base text-gray-500 font-light leading-relaxed">
                  Este ecossistema SaaS é idealizado e desenvolvido sob a
                  mentoria tecnológica da
                  <strong className="text-gray-900 font-bold">
                    {" "}
                    Unificando
                  </strong>
                  , uma agência boutique especializada em transformar negócios e
                  alavancar vendas através de automação, inteligência artificial
                  e ecossistemas digitais de altíssima escala.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {[
                    "Automação de WhatsApp",
                    "Ecossistemas em Escala",
                    "Performance Web Máxima",
                    "IA Aplicada a Afiliados",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="https://unificando.com.br/"
                  target="_blank"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#ccff00] border-2 border-gray-900 text-gray-900 font-black text-xs uppercase tracking-widest rounded-full transition-all hover:bg-white hover:shadow-[4px_4px_0px_#020617] active:translate-y-0 active:shadow-none"
                >
                  Conheça a Unificando
                  <i className="pi pi-external-link ml-3 text-[10px]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 4: CTA de Conversão Premium */}
        <section
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out mb-12 bg-gray-950 text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl group"
        >
          {/* Luz de Fundo Decorativa */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] group-hover:bg-secondary/20 transition-all duration-700 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-[10px] font-bold text-secondary uppercase tracking-[0.3em] mb-4">
              Comece Hoje
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6 leading-tight">
              Pronto para elevar o nível das{" "}
              <span className="font-semibold text-secondary">
                suas ofertas?
              </span>
            </h2>
            <p className="text-base text-gray-400 font-light leading-relaxed mb-10">
              Junte-se a centenas de criadores de conteúdo e afiliados que
              transformaram seus links da bio em vitrines automáticas, limpas e
              de alto faturamento. Leva menos de 60 segundos para começar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`${APP_URL}/cadastro`}
                className="inline-flex items-center justify-center text-gray-950 bg-white hover:bg-gray-100 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] h-14 px-8 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Criar Minha Vitrine Grátis
                <i className="pi pi-arrow-right text-[10px] ml-3" />
              </a>
              <a
                href="https://wa.me/5581973038013?text=Ol%C3%A1!%20Estou%20na%20p%C3%A1gina%20Sobre%20e%20gostaria%20de%20falar%20com%20o%20Suporte%20do%20Oferticando."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-white border border-gray-800 hover:border-white rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] h-14 px-8 transition-colors duration-300"
              >
                Falar com Suporte
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
