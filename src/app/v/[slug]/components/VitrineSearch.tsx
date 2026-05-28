"use client";

import { Vitrine } from "@/models/vitrine.model";

interface VitrineSearchProps {
  vitrine: Vitrine | null;
  isCollapsed: boolean;
  searchInput: string;
  search: string;
  loading: boolean;
  offerCount: number;
  totalOffers: number;
  onInputChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onClear: () => void;
}

const VitrineSearch = ({
  vitrine,
  isCollapsed,
  searchInput,
  search,
  loading,
  offerCount,
  totalOffers,
  onInputChange,
  onSubmit,
  onClear,
}: VitrineSearchProps) => {
  return (
    <header
      className={`sticky top-14 md:top-16 z-40 w-full backdrop-blur-md transition-all duration-300 mb-8 bg-white/80 border-b ${
        isCollapsed ? "border-gray-100" : "border-transparent"
      }`}
    >
      <div className="px-4 sm:px-8 max-w-7xl mx-auto w-full py-3.5">

        <form onSubmit={onSubmit} className="relative group">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 transition-colors duration-200 group-focus-within:text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="search"
            value={searchInput}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Pesquisar nesta vitrine..."
            aria-label="Buscar ofertas na vitrine"
            className="w-full pl-11 pr-28 sm:pr-36 h-11 rounded-2xl border border-transparent text-sm outline-none transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 group-focus-within:bg-white group-focus-within:border-gray-200 group-focus-within:shadow-sm"
          />

          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchInput && (
              <button
                type="button"
                onClick={onClear}
                aria-label="Limpar busca"
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors rounded-xl hover:bg-gray-100 cursor-pointer"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              aria-label="Buscar"
              className="flex items-center justify-center h-8 px-3 sm:px-5 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer"
              style={{ backgroundColor: vitrine?.primary_color || "#111827" }}
            >
              <svg className="w-3.5 h-3.5 sm:hidden" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
        </form>

        <div
          className={`mt-2 flex items-center justify-between transition-all duration-300 ${
            totalOffers > 0 || loading || search ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2">
            {loading && (
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: vitrine?.primary_color || "#111827" }}
              />
            )}
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              {loading ? "Carregando..." : "Resultados"}
            </span>
            {!loading && offerCount > 0 && (
              <span
                className="h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full text-white text-[9px] font-bold tabular-nums"
                style={{ backgroundColor: vitrine?.primary_color || "#111827" }}
              >
                {offerCount}
              </span>
            )}
          </div>
          {search && (
            <p className="text-[10px] font-medium text-gray-400">
              para{" "}
              <span className="text-gray-900 font-bold italic">&ldquo;{search}&rdquo;</span>
            </p>
          )}
        </div>

      </div>
    </header>
  );
};

export default VitrineSearch;
