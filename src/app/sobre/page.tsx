import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre — Oferticando",
  description:
    "Conheça o Oferticando: nossa missão é selecionar as melhores promoções, cupons e ofertas do Brasil para que você economize de verdade.",
};

const values = [
  {
    icon: "pi-verified",
    title: "Seleção rigorosa",
    description:
      "Cada oferta publicada passa por uma análise antes de chegar até você. Filtramos o ruído para entregar apenas o que realmente vale.",
  },
  {
    icon: "pi-tag",
    title: "Cupons testados",
    description:
      "Validamos os códigos promocionais regularmente. Sem perder tempo com cupons expirados ou que nunca funcionaram.",
  },
  {
    icon: "pi-shield",
    title: "Lojas confiáveis",
    description:
      "Trabalhamos com marketplaces consolidados e reconhecidos no Brasil. Sua segurança na hora de comprar é prioridade.",
  },
  {
    icon: "pi-users",
    title: "Comunidade de parceiros",
    description:
      "Parceiros cadastrados podem criar suas próprias vitrines e publicar ofertas, expandindo o diretório para toda a comunidade.",
  },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background py-24 px-6 sm:px-8 selection:bg-orange-100 selection:text-secondary">
      <div className="max-w-4xl mx-auto">

        {/* Cabeçalho */}
        <div className="mb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-gray-400 uppercase tracking-[0.2em] hover:text-gray-900 transition-colors mb-10"
          >
            <i className="pi pi-arrow-left text-[10px]" />
            Início
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em]">
              Sobre o Oferticando
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-gray-900 leading-[1.2] mb-8 max-w-2xl">
            Economize de verdade.{" "}
            <span className="font-semibold text-secondary">
              Sem ruído, apenas valor.
            </span>
          </h1>

          <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl">
            O Oferticando nasceu com uma missão simples: vasculhar os maiores
            e-commerces do Brasil, selecionar o que realmente é oportunidade e
            apresentar de forma clara para que você não precise gastar horas
            comparando preços.
          </p>
        </div>

        {/* Divisor */}
        <div className="w-px h-16 bg-gray-200 mb-20" />

        {/* Nossa missão */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 tracking-tight mb-6">
                Nossa missão
              </h2>
              <p className="text-base text-gray-500 font-light leading-relaxed mb-5">
                Acreditamos que todo consumidor merece acesso fácil às melhores
                ofertas — sem ter que assinar newsletters duvidosas, entrar em
                grupos de WhatsApp lotados ou perder tempo em comparadores lentos.
              </p>
              <p className="text-base text-gray-500 font-light leading-relaxed">
                Por isso, montamos uma equipe dedicada a monitorar preços,
                validar cupons e organizar tudo em um diretório limpo, rápido e
                acessível de qualquer dispositivo.
              </p>
            </div>
            <div className="bg-white border border-gray-100 p-8 rounded-2xl">
              <p className="text-sm font-semibold text-gray-900 mb-3 tracking-tight">
                Lojas monitoradas
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {["Mercado Livre", "Amazon", "Shopee", "Magazine Luiza", "Americanas"].map(
                  (store) => (
                    <span
                      key={store}
                      className="text-xs text-gray-500 font-light bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full"
                    >
                      {store}
                    </span>
                  )
                )}
              </div>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                E outras dezenas de lojas parceiras adicionadas continuamente
                pela nossa comunidade de parceiros.
              </p>
            </div>
          </div>
        </section>

        {/* Desenvolvedor / Unificando */}
        <section className="mb-24 relative overflow-hidden bg-white border-2 border-gray-900 rounded-[2.5rem] p-10 md:p-14 group transition-all hover:shadow-[8px_8px_0px_#020617] hover:-translate-x-1 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00] rounded-bl-[5rem] opacity-10 group-hover:opacity-20 transition-opacity" />
          
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 border border-gray-100">
                  Idealização & Tecnologia
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter leading-tight">
                A força por trás do <br/>
                <span className="text-secondary">Oferticando.</span>
              </h2>
              
              <div className="space-y-4">
                <p className="text-base text-gray-500 font-light leading-relaxed">
                  Este projeto é propriedade da <strong className="text-gray-900 font-bold">Unificando</strong>, uma agência especializada em transformar empresas através de automação, inteligência artificial e ecossistemas digitais de alta performance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {[
                    "Automação de WhatsApp",
                    "Ecossistemas em Escala",
                    "Performance SEO",
                    "IA Aplicada a Vendas"
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="https://unificando.com.br/"
                  target="_blank"
                  className="inline-flex items-center justify-center px-10 py-5 bg-[#ccff00] border-2 border-gray-900 text-gray-900 font-black text-xs uppercase tracking-widest rounded-full transition-all hover:bg-white hover:shadow-[4px_4px_0px_#020617] active:translate-y-0 active:shadow-none"
                >
                  Conheça a Unificando
                  <i className="pi pi-external-link ml-3 text-[10px]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos valores */}
        <section className="mb-24">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-12">
            O que nos guia
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {values.map((v) => (
              <div key={v.title}>
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 mb-5">
                  <i className={`pi ${v.icon} text-sm`} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 tracking-tight">
                  {v.title}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="border-t border-gray-100 pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-base font-light text-gray-900 mb-1">
              Tem alguma dúvida?
            </p>
            <p className="text-sm text-gray-400 font-light">
              Nossa equipe está pronta para ajudar.
            </p>
          </div>
          <Link
            href="/contato"
            className="inline-flex items-center gap-3 text-secondary font-medium text-sm hover:text-gray-900 transition-colors group"
          >
            Fale conosco
            <span className="w-7 h-7 flex items-center justify-center rounded-full border border-secondary group-hover:border-gray-900 transition-colors">
              <i className="pi pi-arrow-right text-xs" />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
