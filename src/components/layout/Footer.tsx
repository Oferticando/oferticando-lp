"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ApiStatusBadge from "./ApiStatusBadge";

const footerLinks = {
  site: [
    { label: "Ofertas", href: "/ofertas" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ],
  legal: [
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
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
  const shouldHide = hidePaths.some(path => pathname?.startsWith(path));

  if (shouldHide) {
    return null;
  }

  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Marca */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3 tracking-tight">
              Oferticando
            </p>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs">
              O melhor site para encontrar promoções, cupons e ofertas das
              principais lojas do Brasil. Economia com qualidade.
            </p>
          </div>

          {/* Links do site */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-5">
              Navegação
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.site.map((link) => (
                <li key={link.href}>
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

          {/* Unificando Promotion */}
          <div className="flex flex-col items-start">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-5">
              Idealização
            </p>
            <Link
              href="https://unificando.com.br/"
              target="_blank"
              className="group relative bg-white border-2 border-gray-900 p-4 rounded-xl transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_#ccff00] active:translate-y-0 active:translate-x-0 active:shadow-none"
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
              <p className="text-[9px] text-gray-400 mt-2 font-medium leading-tight max-w-[140px]">
                Especialistas em automação e sites de alta performance.
              </p>
            </Link>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-gray-400 font-light">
            © {year} Oferticando. Todos os direitos reservados.
          </p>
          <ApiStatusBadge />
        </div>
      </div>
    </footer>
  );
}

