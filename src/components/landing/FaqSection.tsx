"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "Preciso saber programar ou criar sites?",
    answer: "Absolutamente não. O Oferticando foi criado especialmente para ser 100% no-code. Toda a estrutura da sua vitrine de ofertas, os robôs de clonagem e os redirecionamentos são configurados em um painel simples e intuitivo."
  },
  {
    question: "Como o sistema garante que eu receba as comissões?",
    answer: "Você insere suas credenciais de parceiro (como Shopee App ID, Amazon Tag e Mercado Livre Cookie) uma única vez no seu perfil de forma totalmente segura. A partir daí, nossa tecnologia reescreve todos os links em tempo real, inserindo suas credenciais nas ofertas geradas ou clonadas."
  },
  {
    question: "O que é e como funciona a clonagem de grupos?",
    answer: "A clonagem é a automação definitiva para economizar tempo. Você seleciona canais ou grupos do WhatsApp e Telegram de referência e nossos robôs monitoram esses feeds. Assim que uma oferta é postada lá, nós a copiamos, convertemos os links originais para os seus links de afiliado e enviamos automaticamente para as suas próprias vitrines e redes."
  },
  {
    question: "É seguro contra bloqueios no WhatsApp?",
    answer: "Sim! Implementamos práticas recomendadas e limites inteligentes para garantir a máxima segurança dos seus números de disparo. Nosso sistema conta com filas de espera distribuídas e delays configuráveis para simular envios perfeitamente seguros."
  },
  {
    question: "Posso cancelar a assinatura quando quiser?",
    answer: "Sim! Não há fidelidade ou contratos de longo prazo. Você pode cancelar sua assinatura, pausar ou alterar seu plano a qualquer momento diretamente pela área logada da plataforma, sem burocracias."
  }
];

function AccordionItem({ question, answer, isOpen, onClick }: FaqItem & { isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0 py-6">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-gray-900 group-hover:text-secondary transition-colors duration-300">
          {question}
        </span>
        <span className={`w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-secondary group-hover:border-secondary/20 transition-all duration-300 transform ${isOpen ? "rotate-180 bg-secondary/5 text-secondary border-secondary/10" : ""}`}>
          <i className="pi pi-chevron-down text-[10px]" />
        </span>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-gray-500 font-light leading-relaxed max-w-3xl">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const addToRefs = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 bg-[#fafafa] relative border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Cabeçalho */}
        <div className="text-center mb-20">
          <span
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4 block"
          >
            Dúvidas Frequentes
          </span>
          <h2
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out text-3xl font-light tracking-tight text-gray-900"
          >
            Tudo o que você precisa saber sobre o <span className="text-secondary font-normal">Oferticando</span>.
          </h2>
        </div>

        {/* Bloco Accordion */}
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out bg-white border border-gray-200 rounded-[2rem] px-8 py-6 md:p-12 shadow-xl shadow-gray-100/50"
        >
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleIndex(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
