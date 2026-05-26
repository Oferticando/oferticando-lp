import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade — Oferticando",
  description:
    "Saiba como o Oferticando coleta, utiliza e protege seus dados pessoais, incluindo o uso de cookies e serviços de publicidade de terceiros.",
};

const sections = [
  {
    title: "1. Quem somos",
    content: `O Oferticando (oferticando.com.br) é uma plataforma que seleciona ofertas, promoções e cupons de desconto das principais lojas do Brasil. Nosso objetivo é ajudar consumidores a economizar de forma segura e prática.`,
  },
  {
    title: "2. Quais dados coletamos",
    content: `Podemos coletar as seguintes informações:

• Dados de navegação: páginas acessadas, tempo de permanência, cliques em links e ofertas, endereço IP (anonimizado), tipo de dispositivo e navegador.
• Dados de conta (usuários cadastrados): nome, e-mail e apelido informados no momento do cadastro.
• Cookies e tecnologias similares: conforme detalhado na seção 4 abaixo.

Não coletamos dados sensíveis como documentos de identidade, dados bancários ou informações de saúde.`,
  },
  {
    title: "3. Para que usamos seus dados",
    content: `Utilizamos as informações coletadas para:

• Personalizar a experiência de navegação e exibir conteúdo relevante;
• Analisar o desempenho e o tráfego do site para melhorar nossos serviços;
• Comunicar atualizações e novidades (apenas para usuários que optaram por isso);
• Cumprir obrigações legais.`,
  },
  {
    title: "4. Cookies",
    content: `Utilizamos cookies próprios para:
• Manter preferências de navegação (ex.: aceite desta política);
• Melhorar a performance do site.

Você pode gerenciar ou desativar cookies nas configurações do seu navegador. A desativação pode afetar algumas funcionalidades do site.`,
  },
  {
    title: "5. Compartilhamento de dados",
    content: `Não vendemos nem alugamos seus dados pessoais. Podemos compartilhá-los somente:

• Com o Google (serviços de análise e publicidade), conforme as políticas de privacidade do próprio Google;
• Quando exigido por lei, ordem judicial ou autoridade regulatória competente.`,
  },
  {
    title: "6. Segurança",
    content: `Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum sistema é 100% seguro, e não podemos garantir segurança absoluta na transmissão de informações pela internet.`,
  },
  {
    title: "7. Seus direitos (LGPD)",
    content: `Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:

• Confirmar a existência de tratamento dos seus dados;
• Acessar, corrigir ou atualizar seus dados;
• Solicitar a exclusão dos dados tratados com base no seu consentimento;
• Revogar o consentimento a qualquer momento;
• Obter informações sobre o compartilhamento de dados.

Para exercer qualquer desses direitos, entre em contato conosco pela página de Contato.`,
  },
  {
    title: "8. Links externos",
    content: `O Oferticando contém links para lojas e sites parceiros. Não nos responsabilizamos pelas práticas de privacidade desses sites. Recomendamos que você leia as políticas de privacidade de cada site que visitar.`,
  },
  {
    title: "9. Alterações nesta política",
    content: `Podemos atualizar esta Política de Privacidade periodicamente. Quando isso ocorrer, a data de "última atualização" será revisada. O uso continuado do site após as alterações implica aceite das novas condições.`,
  },
  {
    title: "10. Contato",
    content: `Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, entre em contato pelo formulário disponível na nossa página de Contato.`,
  },
];

export default function PoliticaDePrivacidadePage() {
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
            Política de Privacidade
          </h1>
          <p className="text-sm text-gray-400 font-light">
            Última atualização: {updatedAt}
          </p>
        </div>

        {/* Introdução */}
        <p className="text-base text-gray-600 font-light leading-relaxed mb-12 pb-12 border-b border-gray-100">
          Sua privacidade é importante para nós. Esta Política descreve como o
          Oferticando coleta, utiliza e protege suas informações ao usar nosso
          site. Ao navegar em oferticando.com.br, você concorda com as práticas
          descritas abaixo.
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
            href="/termos-de-uso"
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors font-light"
          >
            Termos de Uso →
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
