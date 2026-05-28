"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ApiStatusBadge from "./ApiStatusBadge";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

const footerLinks = {
  plataforma: [
    { label: "Como Funciona", href: "/#recursos" },
    { label: "Planos & Preços", href: "/#precos" },
    { label: "Ofertas Públicas", href: "/ofertas" },
  ],
  empresa: [
    { label: "Sobre o SaaS", href: "/sobre" },
    { label: "Área do Cliente", href: `${APP_URL}/login` },
  ],
  legal: [
    { label: "Privacidade", href: "/politica-de-privacidade" },
    { label: "Termos de Uso", href: "/termos-de-uso" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Páginas onde o footer não deve ser exibido (Áreas Logadas, Telas de Auth, Ofertas e Vitrines)
  const hidePaths = [
    "/admin",
    "/perfil",
    "/login",
    "/esqueci-senha",
    "/primeiro-acesso",
    "/ofertas",
    "/v/",
  ];
  const shouldHide = hidePaths.some((path) => pathname?.startsWith(path));

  if (shouldHide) {
    return null;
  }

  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Marca / Apresentação */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-900 tracking-tight">
              Oferticando
            </p>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs">
              A plataforma SaaS tudo-em-um para afiliados e criadores de
              conteúdo criarem vitrines premium de ofertas, automatizarem grupos
              de WhatsApp e escalarem suas vendas.
            </p>
          </div>

          {/* Coluna 1: Plataforma */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-6">
              Plataforma
            </p>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.plataforma.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 font-light hover:text-gray-900 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: Empresa */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-6">
              Empresa
            </p>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 font-light hover:text-gray-900 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 font-light hover:text-gray-900 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Unificando Promotion */}
          <div className="flex flex-col items-start">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-6">
              Idealização
            </p>
            <Link
              href="https://unificando.com.br/"
              target="_blank"
              className="group relative bg-white border-2 border-gray-900 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_#ccff00] active:translate-y-0 active:translate-x-0 active:shadow-none"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Desenvolvido por
                </span>
                <span className="text-lg font-black text-gray-900 tracking-tighter leading-none flex items-center gap-2">
                  Unificando
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
                </span>
              </div>
              <p className="text-[9px] text-gray-400 mt-2.5 font-medium leading-tight max-w-[140px]">
                Especialistas em automação e ecossistemas digitais.
              </p>
            </Link>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p className="text-xs text-gray-400 font-light">
              © {year} Oferticando. Todos os direitos reservados.
            </p>
            <div className="hidden sm:inline w-1 h-1 rounded-full bg-gray-200" />
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-gray-400 font-light hover:text-gray-900 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <ApiStatusBadge />
        </div>
      </div>
    </footer>
  );
}
