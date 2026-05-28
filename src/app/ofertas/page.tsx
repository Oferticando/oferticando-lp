"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";

import ModernOfferCard from "@/components/ItemPublicOffers/ModernOfferCard";
import ModernOfferCardSkeleton from "@/components/ItemPublicOffers/ModernOfferCardSkeleton";
import { useOffers } from "@/hooks/useOffers";

const POPULAR_SEARCHES = ["Fone de ouvido", "Tênis", "Notebook", "Relógio"];

const PublicOfferList = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {
    offers,
    search,
    searchInput,
    setSearchInput,
    handleSearch,
    loadMore,
    loading,
  } = useOffers();

  const [cols, setCols] = useState(2);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCols(4);
      else if (window.innerWidth >= 768) setCols(3);
      else setCols(2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore(offers.length);
        }
      },
      { threshold: 0.1 },
    );

    const sentinel = loadMoreRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, offers.length, loadMore]);

  useEffect(() => {
    const handleWindowScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 80) setIsCollapsed(true);
      else if (scrollTop <= 10) setIsCollapsed(false);
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const totalResults = offers.length;

  const handleClearSearch = () => {
    setSearchInput("");
    setTimeout(() => handleSearch(), 0);
  };

  const applyPopularSearch = (term: string) => {
    setSearchInput(term);
    setTimeout(() => handleSearch(), 0);
  };

  return (
    <div className="w-full bg-white selection:bg-orange-100 selection:text-secondary">

      <header
        className="sticky top-[72px] z-30 w-full border-b border-transparent bg-white/80 backdrop-blur-md transition-colors duration-300"
        style={{ borderColor: isCollapsed ? "rgb(243 244 246)" : "transparent" }}
      >
        <div className="px-4 sm:px-8 max-w-7xl mx-auto w-full">

          <div
            className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isCollapsed
                ? "max-h-0 opacity-0 pt-0 pb-0"
                : "max-h-[420px] opacity-100 pt-14 md:pt-20 pb-8 md:pb-10"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
                  Ofertas verificadas
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95] mb-4">
                As melhores{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-secondary">ofertas</span>
                  <span
                    className="absolute -bottom-1 left-0 w-full h-2 bg-secondary/15 rounded-full"
                    aria-hidden="true"
                  />
                </span>
                <br className="hidden md:block" />
                {" "}em um só lugar
              </h1>

              <p className="text-gray-400 font-light text-sm md:text-base max-w-sm md:max-w-md leading-relaxed">
                Produtos selecionados e validados. Procure pela marca ou produto
                e economize agora.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-500 ${isCollapsed ? "py-3" : "pb-4"}`}>
            <form onSubmit={handleSearch} className="relative w-full group">
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 transition-colors duration-300 group-focus-within:text-gray-700 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar produto, marca ou categoria..."
                aria-label="Buscar ofertas"
                className={`w-full pl-14 pr-32 sm:pr-40 bg-gray-50 border border-transparent rounded-2xl text-gray-900 text-sm font-normal placeholder-gray-400 outline-none group-focus-within:bg-white group-focus-within:border-gray-200 group-focus-within:shadow-md group-focus-within:shadow-black/5 transition-all duration-300 ${isCollapsed ? "h-12" : "h-14 md:h-16"}`}
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Limpar busca"
                    className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors rounded-xl hover:bg-gray-100 cursor-pointer"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Buscar"
                  className={`flex items-center justify-center bg-gray-900 hover:bg-black text-white font-semibold text-[10px] tracking-widest uppercase rounded-xl transition-all duration-200 active:scale-95 cursor-pointer px-4 sm:px-7 ${isCollapsed ? "h-9" : "h-10 md:h-12"}`}
                >
                  <span className="sm:hidden">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="hidden sm:inline">Buscar</span>
                </button>
              </div>
            </form>

            {!search && !isCollapsed && (
              <div className="mt-3 flex items-center gap-2 flex-wrap justify-center">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  Popular:
                </span>
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => applyPopularSearch(term)}
                    className="text-[11px] font-medium text-gray-500 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-200 transition-all duration-200 cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}

            <div
              className={`mt-3 flex items-center justify-between transition-all duration-400 ${totalResults > 0 || loading || search ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
            >
              <div className="flex items-center gap-2">
                {loading && (
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                )}
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                  {loading ? "Carregando..." : "Resultados"}
                </span>
                {!loading && totalResults > 0 && (
                  <span className="h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full bg-gray-900 text-white text-[9px] font-bold tabular-nums">
                    {totalResults}
                  </span>
                )}
              </div>
              {search && (
                <p className="text-[10px] font-medium text-gray-400">
                  para{" "}
                  <span className="text-gray-900 font-bold italic">
                    &ldquo;{search}&rdquo;
                  </span>
                </p>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Único elemento com scroll — a grid cresce naturalmente dentro dele */}
      <div
        className="w-full"
        aria-label="Lista de promoções filtradas"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {offers.length === 0 && !loading ? (
            <div className="w-full flex flex-col items-center justify-center text-center py-32 px-4 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                Nenhuma oferta encontrada
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed">
                Não encontramos resultados para{" "}
                {search ? (
                  <>
                    <span className="font-semibold text-gray-700">
                      &ldquo;{search}&rdquo;
                    </span>
                    .{" "}
                  </>
                ) : (
                  "sua busca. "
                )}
                Tente outros termos ou explore todas as ofertas.
              </p>
              <button
                onClick={handleClearSearch}
                className="px-8 py-3 bg-gray-900 hover:bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-200 rounded-xl active:scale-95 cursor-pointer"
              >
                Ver todas as ofertas
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-100/60 pt-5">
              <div
                className="grid gap-3 md:gap-5 mb-4 md:mb-6 px-0.5"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
              >
                {offers.map((offer) => (
                  <div key={offer.id} className="w-full">
                    <ModernOfferCard offer={offer} />
                  </div>
                ))}
                {loading &&
                  Array.from({ length: cols }).map((_, i) => (
                    <div key={`skeleton-${i}`} className="w-full">
                      <ModernOfferCardSkeleton />
                    </div>
                  ))}
              </div>

              {/* Sentinel do Intersection Observer — dispara loadMore quando visível */}
              <div ref={loadMoreRef} className="h-20" />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default PublicOfferList;
