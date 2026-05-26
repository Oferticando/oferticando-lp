"use client";

import { useRef, useLayoutEffect, useMemo, useState } from "react";
import {
  VirtualScroller,
  VirtualScrollerLazyEvent,
} from "primereact/virtualscroller";
import type { VirtualScroller as VirtualScrollerType } from "primereact/virtualscroller";

import { OfferResponseDto } from "@/models/offer.model";
import ModernOfferCard from "@/components/ItemPublicOffers/ModernOfferCard";
import ModernOfferCardSkeleton from "@/components/ItemPublicOffers/ModernOfferCardSkeleton";
import { useOffers } from "@/hooks/useOffers";

const PublicOfferList = () => {
  const scrollerRef = useRef<VirtualScrollerType | null>(null);
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

  // ── Controle de Colunas (Grid) ──
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

  // Agrupa as ofertas em "linhas" para o VirtualScroller
  const rows = useMemo(() => {
    const chunks: (OfferResponseDto | undefined)[][] = [];
    for (let i = 0; i < offers.length; i += cols) {
      chunks.push(offers.slice(i, i + cols));
    }
    return chunks;
  }, [offers, cols]);

  // Detecta o scroll para colapsar o header de forma suave
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollTop = (e.target as HTMLElement).scrollTop;
    if (scrollTop > 60 && !isCollapsed) setIsCollapsed(true);
    else if (scrollTop <= 10 && isCollapsed) setIsCollapsed(false);
  };

  const onLazyLoad = (event: VirtualScrollerLazyEvent) => {
    const lastRowIndex = typeof event.last === "number" ? event.last : 0;
    const lastItemIndex = (lastRowIndex + 1) * cols;
    loadMore(lastItemIndex);
  };

  const itemTemplate = (
    rowItems: (OfferResponseDto | undefined)[],
    options: { index: number },
  ) => (
    <div
      className="grid gap-4 md:gap-8 mb-10 px-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {rowItems.map((offer, i) => (
        <div
          key={offer?.id || `skeleton-${options.index}-${i}`}
          className="w-full"
        >
          {offer ? (
            <ModernOfferCard offer={offer} />
          ) : (
            <ModernOfferCardSkeleton />
          )}
        </div>
      ))}
    </div>
  );

  const totalResults = offers.length;

  const handleClearSearch = () => {
    setSearchInput("");
    // Executa a busca com string vazia
    // O hook useOffers usa setSearch(searchInput) em handleSearch,
    // mas aqui precisamos sincronizar.
    // Como handleSearch depende do estado searchInput interno dele,
    // vamos garantir que ele veja o ""
    setTimeout(() => handleSearch(), 0);
  };

  return (
    <div className="flex flex-col h-screen bg-white selection:bg-orange-100 selection:text-secondary overflow-hidden">
      {/* ── Header Area ── */}
      <div
        className={`px-6 sm:px-8 max-w-7xl mx-auto w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isCollapsed ? "pt-4 md:pt-6" : "pt-24 md:pt-32"}`}
      >
        {/* ── Hero Area (Colapsável) ── */}
        <div
          className={`
            overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${isCollapsed ? "max-h-0 opacity-0 mb-0" : "max-h-80 opacity-100 mb-12 md:mb-16"}
          `}
        >
          <div className="flex flex-col items-center text-center">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary mb-6 animate-pulse" />
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight leading-tight mb-6">
              Nossas Ofertas
            </h1>
            <p className="text-gray-400 font-light text-base md:text-lg max-w-xl leading-relaxed">
              Acesse a nossa seleção completa de ofertas validadas. Procure
              pelas marcas que você ama e economize agora.
            </p>
          </div>
        </div>

        {/* ── Search bar (Sticky-like) ── */}
        <div
          className={`transition-all duration-500 z-30 ${isCollapsed ? "pb-4" : "mb-12"}`}
        >
          <form onSubmit={handleSearch} className="relative w-full group">
            <i className="pi pi-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 text-lg transition-colors duration-300 group-focus-within:text-gray-900 pointer-events-none" />

            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="O que você procura..."
              className="
                  w-full h-16
                  pl-16 pr-32 sm:pr-40
                  bg-gray-50/50
                  border border-transparent
                  rounded-2xl md:rounded-3xl
                  text-gray-900 text-base font-light
                  placeholder-gray-400
                  outline-none
                  group-focus-within:bg-white group-focus-within:border-gray-200 group-focus-within:shadow-sm
                  transition-all duration-500
                "
            />

            <div className="absolute right-2 top-2 bottom-2 flex items-center gap-1">
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                  aria-label="Limpar busca"
                >
                  <i className="pi pi-times text-[10px]" />
                </button>
              )}
              <button
                type="submit"
                aria-label="Buscar"
                className="
                    h-full px-4 sm:px-8
                    flex items-center justify-center
                    bg-gray-900 hover:bg-black
                    text-white font-medium text-[10px] tracking-widest uppercase
                    rounded-xl md:rounded-2xl
                    transition-all duration-300
                  "
              >
                <span className="sm:hidden">
                  <i className="pi pi-arrow-right text-xs" />
                </span>
                <span className="hidden sm:inline">Buscar</span>
              </button>
            </div>
          </form>

          {/* Contador de resultados */}
          <div
            className={`mt-4 flex items-center justify-between transition-all duration-500 ${totalResults > 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Ofertas
              </span>
              <span className="h-5 px-2 flex items-center justify-center rounded-full bg-gray-900 text-white text-[9px] font-bold">
                {totalResults}
              </span>
            </div>
            {search && (
              <p className="text-[10px] font-medium tracking-tight text-gray-400">
                Resultados para{" "}
                <span className="text-gray-900 italic font-bold">
                  &ldquo;{search}&rdquo;
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Content Area (Flex-1) ── */}
      <div className="flex-1 min-h-0 w-full relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8">
          {offers.length === 0 && !rows.length && !loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700 pb-20">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                <i className="pi pi-search text-gray-200 text-2xl" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2 tracking-tight">
                Sem ofertas encontradas
              </h3>
              <p className="text-gray-400 font-light text-sm max-w-xs mb-8 leading-relaxed">
                Não encontramos nada correspondente aos termos usados. Tente
                algo diferente ou explore nossa lista completa.
              </p>
              <button
                onClick={handleClearSearch}
                className="px-8 py-3 bg-gray-900 hover:bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-xl shadow-lg shadow-gray-200"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="h-full relative border-t border-gray-100/60 pt-6">
              <VirtualScroller
                lazy
                showLoader
                itemSize={cols === 2 ? 320 : 400}
                ref={scrollerRef}
                items={rows}
                onLazyLoad={onLazyLoad}
                onScroll={handleScroll}
                itemTemplate={itemTemplate}
                aria-label="Lista de promoções filtradas"
                className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide"
                pt={{
                  content: { className: "pb-40" }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicOfferList;
