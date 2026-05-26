import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso — Oferticando",
  description:
    "Leia os Termos de Uso do Oferticando e saiba as condições para utilizar nossa plataforma de ofertas e cupons.",
};

const sections = [
  {
    title: "1. Aceitação dos termos",
    content: `Ao acessar e utilizar o site Oferticando (oferticando.com.br), você declara ter lido, compreendido e concordado com estes Termos de Uso. Caso não concorde com alguma condição, pedimos que não utilize o site.`,
  },
  {
    title: "2. Descrição do serviço",
    content: `O Oferticando é uma plataforma de ofertas, promoções e cupons de desconto. Selecionamos e organizamos oportunidades de compra nas principais lojas do Brasil com o objetivo de ajudar consumidores a economizar.

Não somos uma loja virtual. Não vendemos produtos diretamente. As compras são realizadas nos sites das lojas parceiras, cujas políticas e condições são de responsabilidade exclusiva de cada loja.`,
  },
  {
    title: "3. Links de afiliados",
    content: `O Oferticando pode utilizar links de afiliados para alguns produtos e lojas parceiras. Isso significa que podemos receber uma comissão quando você realiza uma compra por meio de um link disponível em nosso site, sem qualquer custo adicional para você.`,
  },
  {
    title: "4. Precisão das informações",
    content: `Nos esforçamos para manter as informações de preços, disponibilidade e condições das ofertas atualizadas. No entanto, preços e condições podem mudar a qualquer momento sem aviso prévio pelas lojas parceiras.

O Oferticando não garante que os preços e condições exibidos estejam vigentes no momento do acesso. Sempre verifique os valores e condições diretamente no site da loja antes de finalizar uma compra.`,
  },
  {
    title: "5. Uso permitido",
    content: `Você pode utilizar o Oferticando para fins pessoais e não comerciais, desde que:

• Não utilize técnicas automatizadas (bots, scrapers) para coletar dados do site;
• Não reproduza, distribua ou modifique o conteúdo sem autorização expressa;
• Não pratique atos que possam prejudicar a infraestrutura ou outros usuários;
• Não publique conteúdo falso, ofensivo, ilegal ou que viole direitos de terceiros (para usuários cadastrados que publicam ofertas).`,
  },
  {
    title: "6. Contas de usuário (parceiros)",
    content: `Usuários cadastrados como parceiros (criadores de vitrines e ofertas) são responsáveis por:

• Manter a confidencialidade de suas credenciais de acesso;
• Garantir que o conteúdo publicado seja verdadeiro, legal e não viole direitos de terceiros;
• Notificar imediatamente o Oferticando em caso de uso não autorizado de sua conta.

Reservamo-nos o direito de suspender ou excluir contas que violem estes termos.`,
  },
  {
    title: "7. Propriedade intelectual",
    content: `O conteúdo editorial, design, logotipos e código-fonte do Oferticando são de propriedade do Oferticando ou de seus licenciantes. É vedada a reprodução total ou parcial sem autorização.

Imagens e marcas de produtos e lojas parceiras pertencem aos seus respectivos titulares e são utilizadas apenas para fins informativos.`,
  },
  {
    title: "8. Limitação de responsabilidade",
    content: `O Oferticando não se responsabiliza por:

• Problemas ocorridos nas lojas parceiras (entrega, qualidade do produto, cancelamentos);
• Variações de preço entre o momento da publicação e o momento da compra;
• Prejuízos decorrentes do uso das informações do site;
• Indisponibilidade temporária do serviço por manutenção ou falhas técnicas.`,
  },
  {
    title: "9. Alterações nos termos",
    content: `Podemos revisar estes Termos de Uso a qualquer momento. As alterações entram em vigor após a publicação no site. O uso continuado do serviço após a publicação das alterações implica aceite das novas condições.`,
  },
  {
    title: "10. Lei aplicável",
    content: `Estes Termos de Uso são regidos pelas leis brasileiras. Fica eleito o foro da comarca de domicílio do usuário para dirimir quaisquer controvérsias oriundas deste instrumento.`,
  },
];

export default function TermosDeUsoPage() {
  const updatedAt = "22 de março de 2026";

  return (
    <div className="min-h-screen bg-background py-24 px-6 sm:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-16">
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
              Legal
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">
            Termos de Uso
          </h1>
          <p className="text-sm text-gray-400 font-light">
            Última atualização: {updatedAt}
          </p>
        </div>

        {/* Introdução */}
        <p className="text-base text-gray-600 font-light leading-relaxed mb-12 pb-12 border-b border-gray-100">
          Estes Termos de Uso estabelecem as condições para o uso do Oferticando.
          Leia com atenção antes de utilizar o site. Ao acessar nossas páginas,
          você concorda com todos os termos aqui descritos.
        </p>

        {/* Seções */}
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-semibold text-gray-900 mb-4 tracking-tight">
                {section.title}
              </h2>
              <p className="text-sm text-gray-500 font-light leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Rodapé da página */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/politica-de-privacidade"
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors font-light"
          >
            ← Política de Privacidade
          </Link>
          <Link
            href="/contato"
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors font-light"
          >
            Fale Conosco →
          </Link>
        </div>
      </div>
    </div>
  );
}
