"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "oferticando-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      // localStorage pode não estar disponível em alguns contextos
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // silencia erros de storage
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm font-light text-gray-300 leading-relaxed max-w-2xl">
          Utilizamos cookies próprios e de terceiros para personalizar
          conteúdo e analisar o tráfego. Ao
          continuar navegando, você concorda com nossa{" "}
          <Link
            href="/politica-de-privacidade"
            className="text-white underline underline-offset-2 hover:text-gray-300 transition-colors"
          >
            Política de Privacidade
          </Link>
          .
        </p>

        <button
          onClick={handleAccept}
          className="flex-shrink-0 bg-white text-gray-900 text-xs font-semibold uppercase tracking-[0.15em] px-7 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
