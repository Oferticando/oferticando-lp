"use client";

import { Vitrine } from "@/models/vitrine.model";

interface VitrineHeroProps {
  vitrine: Vitrine;
  totalOffers: number;
}

const VitrineHero = ({ vitrine, totalOffers }: VitrineHeroProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 pt-14 md:pt-18">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

        {/* Avatar */}
        <div className="relative group flex-shrink-0">
          <div
            className="absolute -inset-1 rounded-full opacity-75 blur transition duration-500 group-hover:opacity-100"
            style={{
              backgroundImage:
                vitrine.primary_color && vitrine.secondary_color
                  ? `linear-gradient(to top right, ${vitrine.primary_color}, ${vitrine.secondary_color})`
                  : "linear-gradient(to top right, #0071e3, #00c6ff)",
            }}
          />
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-white p-1 overflow-hidden flex items-center justify-center border border-gray-100 shadow-xl">
            {vitrine.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={vitrine.imageUrl}
                alt={vitrine.name}
                className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <span className="text-5xl font-extralight text-gray-300">
                {vitrine.name?.charAt(0) || "V"}
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none text-gray-900">
              {vitrine.name}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: vitrine.primary_color || "#0071e3" }}
              />
              Vitrine Verificada
            </span>
          </div>

          <p className="text-gray-500 font-light text-sm md:text-base max-w-xl leading-relaxed">
            {vitrine.description ||
              "Bem-vindo à minha vitrine oficial de ofertas. Curadoria diária com os melhores cupons e preços do mercado."}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="font-bold text-gray-900 tabular-nums">{totalOffers}</span>
              <span className="text-gray-400 font-medium">ofertas publicadas</span>
            </div>

            {vitrine.instagram && (
              <a
                href={`https://instagram.com/${vitrine.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 font-bold text-gray-600 hover:text-black transition-all duration-200 group"
              >
                <svg
                  className="w-3.5 h-3.5 text-gray-400 group-hover:text-pink-500 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                @{vitrine.instagram.replace("@", "")}
              </a>
            )}
          </div>
        </div>

      </div>

      <div className="w-full h-px bg-gray-100 mt-10" />
    </div>
  );
};

export default VitrineHero;
