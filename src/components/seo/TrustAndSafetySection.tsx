import React from 'react';

const TrustAndSafetySection = () => {
  return (
    <section className="bg-transparent border-t border-gray-100 pt-20 mt-12 w-full">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 md:mb-24 text-center flex flex-col items-center">
          <span className="w-1.5 h-1.5 bg-gray-900 mb-6" />
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-gray-900 mb-6">Auditoria de Segurança</h2>
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-[0.2em]">Padrão rigoroso contra fraudes e descontos irreais.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-y-16 gap-x-12 lg:gap-x-24 border-b border-gray-100 pb-20">
          
          <div className="flex flex-col gap-5 group">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <i className="pi pi-verified text-gray-400 group-hover:text-gray-900 transition-colors text-sm" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">Operadores Validados</h3>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Toda extração é rigorosamente limitada a ecossistemas oficiais de e-commerce no Brasil. Redirecionamentos cegos e domínios não fiduciários são rejeitados pelo núcleo.
            </p>
          </div>

          <div className="flex flex-col gap-5 group">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <i className="pi pi-shield text-gray-400 group-hover:text-gray-900 transition-colors text-sm" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">Bloqueio Ativo</h3>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
               Nossa equipe atua como um firewall humano verificando o certificado de criptografia e conformidade dos lojistas, impedindo táticas de phishing nativamente.
            </p>
          </div>

          <div className="flex flex-col gap-5 group">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <i className="pi pi-chart-line text-gray-400 group-hover:text-gray-900 transition-colors text-sm" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">Métrica de Queda</h3>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Analisamos a curva de precificação temporal. Um desconto só é exposto se houver uma variação inferior legítima (Black Friday verídica) ou provimento de cashback/cupons.
            </p>
          </div>

          <div className="flex flex-col gap-5 group">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <i className="pi pi-question-circle text-gray-400 group-hover:text-gray-900 transition-colors text-sm" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">Sistema FAQs</h3>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              O acesso às exposições sempre será público e isento de taxas. Flutuações de mercado fazem o estoque alterar, seja imediato ou ative os disparos remotos (notificações).
            </p>
          </div>

        </div>

        <div className="mt-12 mb-16 text-center">
          <p className="text-[10px] text-gray-300 font-medium uppercase tracking-[0.1em] leading-relaxed max-w-3xl mx-auto">
            <span className="text-gray-400 font-bold tracking-[0.2em]">Nota de Transparência Institucional:</span> O Oferticando pode contabilizar originação de acessos através de programas de afiliação, sem alteração da precificação na ponta consumidora, em respeito integral às DIRETRIZES DA GOOGLE.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustAndSafetySection;
