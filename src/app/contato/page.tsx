import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato — Oferticando",
  description:
    "Entre em contato com a equipe do Oferticando para dúvidas, sugestões, parcerias ou solicitações relacionadas à privacidade.",
};

const topics = [
  { icon: "pi-question-circle", label: "Dúvidas gerais" },
  { icon: "pi-tag", label: "Sugestão de oferta" },
  { icon: "pi-briefcase", label: "Parcerias" },
  { icon: "pi-lock", label: "Privacidade e dados (LGPD)" },
  { icon: "pi-flag", label: "Reportar conteúdo" },
];

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-background py-24 px-6 sm:px-8 selection:bg-orange-100 selection:text-secondary">
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
              Fale Conosco
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">
            Contato
          </h1>
          <p className="text-base text-gray-400 font-light leading-relaxed max-w-xl">
            Tem alguma dúvida, sugestão ou precisa exercer seus direitos de
            privacidade? Envie sua mensagem e retornaremos em breve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          {/* Formulário */}
          <div className="md:col-span-3">
            <form
              action="https://formsubmit.co/renato-bgs@live.com"
              method="POST"
              className="flex flex-col gap-6"
            >
              {/* Honeypot para evitar spam */}
              <input type="text" name="_honey" className="hidden" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_subject"
                value="Nova mensagem — Oferticando"
              />
              <input
                type="hidden"
                name="_next"
                value="https://oferticando.com.br/contato?enviado=true"
              />

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="nome"
                  className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]"
                >
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  required
                  placeholder="Seu nome"
                  className="w-full h-12 px-5 bg-white border border-gray-200 rounded-full text-sm text-gray-900 font-light placeholder-gray-400 outline-none focus:border-gray-400 transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full h-12 px-5 bg-white border border-gray-200 rounded-full text-sm text-gray-900 font-light placeholder-gray-400 outline-none focus:border-gray-400 transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="assunto"
                  className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]"
                >
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  required
                  className="w-full h-12 px-5 bg-white border border-gray-200 rounded-full text-sm text-gray-900 font-light outline-none focus:border-gray-400 transition-colors duration-300 appearance-none"
                >
                  <option value="">Selecione um assunto</option>
                  {topics.map((t) => (
                    <option key={t.label} value={t.label}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="mensagem"
                  className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={5}
                  placeholder="Descreva sua mensagem..."
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 font-light placeholder-gray-400 outline-none focus:border-gray-400 transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="self-start bg-gray-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] px-9 py-4 rounded-full transition-colors duration-300"
              >
                Enviar mensagem
              </button>
            </form>
          </div>

          {/* Sidebar informativa */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-5">
                Tópicos
              </p>
              <ul className="flex flex-col gap-4">
                {topics.map((t) => (
                  <li key={t.label} className="flex items-center gap-3">
                    <i className={`pi ${t.icon} text-gray-300 text-sm`} />
                    <span className="text-sm text-gray-500 font-light">
                      {t.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-3">
                Privacidade (LGPD)
              </p>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">
                Para solicitações de acesso, correção ou exclusão de dados
                pessoais, selecione o assunto{" "}
                <span className="text-gray-700">Privacidade e dados</span> no
                formulário.
              </p>
              <Link
                href="/politica-de-privacidade"
                className="text-xs text-gray-400 hover:text-gray-900 transition-colors underline underline-offset-2"
              >
                Ver Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
