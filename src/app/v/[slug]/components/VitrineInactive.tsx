"use client";

import Link from "next/link";
import { ROUTES } from "@/shared/routes";

export default function VitrineInactive() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-20 text-center font-sans tracking-wide">
      
      <div className="max-w-2xl w-full flex flex-col items-center">
        <div className="w-px h-16 bg-gray-200 mb-12" />
        
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 tracking-tight leading-loose mb-6">
          Vitrine Temporariamente Inativa.
        </h1>
        
        <p className="text-gray-400 font-light text-base md:text-lg mb-16 leading-relaxed max-w-lg">
          O curador desativou esta página. O conteúdo que você está procurando não está mais disponível no diretório.
        </p>

        <div className="flex gap-8">
          <Link
            href={ROUTES.OFFERS.LIST}
            className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors border-b border-transparent hover:border-gray-900 pb-1"
          >
            Explorar Diretório
          </Link>
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors border-b border-transparent hover:border-gray-900 pb-1"
          >
            Página Inicial
          </Link>
        </div>
      </div>
      
    </div>
  );
}
