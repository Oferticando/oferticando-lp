"use client";

import { useState } from "react";
import Link from "next/link";
import LogoSVG from "@/assets/svg/LogoSVG";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/shared/routes";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

const primaryNavLinks = [
  { label: "Ofertas", href: ROUTES.OFFERS.LIST },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isVitrine = pathname?.startsWith("/v/");

  if (isVitrine) return null;

  return (
    <nav className="sticky top-0 w-full z-50">
      <div className="bg-white/70 backdrop-blur-3xl border-b border-gray-100/50 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-[72px]">
          {/* Logo */}
          <button
            onClick={() => router.push(ROUTES.HOME)}
            aria-label="Ir para a home"
            className="hover:scale-105 transition-transform duration-300 origin-left"
          >
            <LogoSVG width={120} />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {primaryNavLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className="text-[13px] font-medium tracking-tight text-gray-500 hover:text-[#0071e3] transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTAs Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`${APP_URL}/login`}
              className="px-5 py-2 text-sm font-medium tracking-tight text-gray-700 border border-gray-200 rounded-full hover:border-gray-400 hover:text-gray-900 transition-all duration-300"
            >
              Entrar
            </a>
            <a
              href={`${APP_URL}/cadastro`}
              className="px-5 py-2 bg-gray-900 text-white text-sm font-medium tracking-tight rounded-full hover:bg-black transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Cadastrar
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <i className={`pi ${menuOpen ? "pi-times" : "pi-bars"} text-sm`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[72px] h-[calc(100vh-72px)] bg-white/95 backdrop-blur-3xl z-40 transition-all duration-500 ${
          menuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
          <div className="flex-1 space-y-2">
            {primaryNavLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  router.push(link.href);
                  setMenuOpen(false);
                }}
                className="w-full text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-900 py-4 border-b border-gray-100 hover:text-gray-500 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-3 pb-10">
            <a
              href={`${APP_URL}/cadastro`}
              className="w-full py-5 bg-gray-900 text-white text-[10px] uppercase font-bold tracking-[0.2em] rounded-full text-center hover:bg-black transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Cadastrar Grátis
            </a>
            <a
              href={`${APP_URL}/login`}
              className="w-full py-4 border border-gray-200 text-gray-700 text-[10px] uppercase font-bold tracking-[0.2em] rounded-full text-center hover:border-gray-400 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Entrar
            </a>

            <div className="px-2 mt-4">
              <Link
                href="https://unificando.com.br/"
                target="_blank"
                className="flex flex-col gap-1.5"
              >
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">Tecnologia por</span>
                <span className="text-xs font-black text-gray-400 tracking-tighter flex items-center gap-2">
                  Unificando
                  <span className="w-1 h-1 rounded-full bg-[#ccff00]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
