"use client";

import { useState, useEffect, useRef, useCallback, useLayoutEffect, useMemo } from "react";
import {
  VirtualScroller,
  VirtualScrollerLazyEvent,
} from "primereact/virtualscroller";

import { OfferResponseDto } from "@/models/offer.model";
import { Vitrine } from "@/models/vitrine.model";
import { ApiService } from "@/services";
import { PaginatedResponse } from "@/models/paginated-response.model";
import ModernOfferCard from "@/components/ItemPublicOffers/ModernOfferCard";

const PAGE_SIZE = 12;

interface VitrineClientProps {
  slug: string;
  initialVitrine?: Vitrine | null;
  initialOffers?: PaginatedResponse<OfferResponseDto>;
}

const VitrineClient = ({
  slug,
  initialVitrine,
  initialOffers,
}: VitrineClientProps) => {
  const scrollerRef = useRef<VirtualScroller | null>(null);

  const [vitrine, setVitrine] = useState<Vitrine | null>(
    initialVitrine || null,
  );
  const [offers, setOffers] = useState<OfferResponseDto[]>(() => {
    if (initialOffers) {
      const merged = Array(initialOffers.total).fill(undefined);
      (initialOffers.data || []).forEach((item, i) => {
        merged[i] = item;
      });
      return merged;
    }
    return [];
  });
  const [loading, setLoading] = useState(!initialOffers);
  const [loadedPages, setLoadedPages] = useState<number[]>(
    initialOffers ? [1] : [],
  );
  const loadedPagesRef = useRef<number[]>(initialOffers ? [1] : []);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const hasInitialized = useRef(false);
  const [linkCopied, setLinkCopied] = useState(false);

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

  // ── Buscar Ofertas da Vitrine ──
  const fetchOffers = useCallback(
    async (page: number, searchValue = search) => {
      if (!slug) return;
      if (loadedPagesRef.current.includes(page) && !searchValue) return;

      try {
        const response = await ApiService.offers.getByVitrineSlug(slug, {
          page,
          limit: PAGE_SIZE,
          search: searchValue,
        });

        const { vitrine: vitrineData, ofertas } = response.data;

        if (!vitrine && vitrineData) {
          setVitrine(vitrineData);
        }

        setOffers((prev) => {
          const merged =
            page === 1 ? Array(ofertas.total).fill(undefined) : [...prev];
          (ofertas.data || []).forEach((item: OfferResponseDto, i: number) => {
            const index = (page - 1) * PAGE_SIZE + i;
            if (index < merged.length) {
              merged[index] = item;
            }
          });
          return merged;
        });

        setLoadedPages((prev) => {
          const next = page === 1 ? [1] : [...prev, page];
          loadedPagesRef.current = next;
          return next;
        });
      } catch (err) {
        console.error("Erro ao carregar ofertas:", err);
      } finally {
        setLoading(false);
      }
    },
    [slug, search, vitrine],
  );

  useEffect(() => {
    if (!hasInitialized.current && initialOffers && !search) {
      hasInitialized.current = true;
      setLoading(false);
      return;
    }

    hasInitialized.current = true;
    setLoading(true);
    setLoadedPages([]);
    loadedPagesRef.current = [];
    fetchOffers(1, search);
  }, [slug, search, fetchOffers, initialOffers]);

  const onLazyLoad = (event: VirtualScrollerLazyEvent) => {
    const lastRowIndex = typeof event.last === "number" ? event.last : 0;
    const lastItemIndex = (lastRowIndex + 1) * cols;
    const neededPage = Math.floor(lastItemIndex / PAGE_SIZE) + 1;
    if (!loadedPages.includes(neededPage)) fetchOffers(neededPage, search);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearch(searchInput);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const itemTemplate = (rowItems: (OfferResponseDto | undefined)[], options: { index: number }) => (
    <div 
      className="grid gap-4 md:gap-6 mb-8 px-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {rowItems.map((offer, i) => (
        <div key={offer?.id || `skeleton-vitrine-${options.index}-${i}`} className="w-full">
          {offer ? (
             <ModernOfferCard offer={offer} vitrineSlug={slug} />
          ) : (
            <div className="flex flex-col animate-pulse">
               <div className="aspect-square w-full bg-gray-50 rounded-2xl md:rounded-3xl mb-3" />
               <div className="h-4 bg-gray-50 rounded-full w-2/3 mb-2" />
               <div className="h-4 bg-gray-50 rounded-full w-1/3" />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  if (!vitrine && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-12 h-12 rounded-full border border-secondary/20 animate-ping" />
          <span className="absolute w-6 h-6 rounded-full border border-secondary/40 animate-ping [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-100 selection:text-gray-900 pt-20 md:pt-32 pb-0">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        
        {/* Header Estilo Perfil de Rede Social */}
        <header className="mb-20 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          {/* Avatar / Logo */}
          <div className="relative w-32 h-32 md:w-44 md:h-44 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-gray-100 to-gray-50 p-1 border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center">
              {vitrine?.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={vitrine.imageUrl} 
                  alt={vitrine.name || "Avatar"} 
                  className="w-full h-full object-cover rounded-full" 
                />
              ) : (
                <span className="text-4xl md:text-6xl font-light text-gray-300">
                  {vitrine?.name?.charAt(0) || "V"}
                </span>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col flex-1 text-center md:text-left pt-2">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                {vitrine?.name}
              </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="bg-[#0071e3] text-white text-sm font-semibold py-2 px-6 rounded-lg hover:bg-[#0077ed] transition-colors"
                >
                  {linkCopied ? "Copiado!" : "Seguir"}
                </button>
                <button
                   onClick={handleCopy}
                   className="bg-gray-100 text-gray-900 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <i className="pi pi-share-alt" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-8 mb-6 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-900">{offers.filter(o => o !== undefined).length}</span>
                <span className="text-gray-500">ofertas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-900">Admin</span>
                <span className="text-gray-500">curador</span>
              </div>
            </div>

            <p className="text-gray-600 font-normal text-sm md:text-base max-w-lg leading-relaxed mb-6">
              {vitrine?.description || "Bem-vindo à minha vitrine oficial de ofertas. Curadoria diária com os melhores cupons e preços do mercado."}
            </p>

            {vitrine?.instagram && (
              <a
                href={`https://instagram.com/${vitrine.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-secondary flex items-center justify-center md:justify-start gap-2"
              >
                <i className="pi pi-instagram" /> @{vitrine.instagram.replace("@", "")}
              </a>
            )}
          </div>
        </header>

        <div className="w-full h-px bg-gray-50 mb-12" />

        {/* Search Bar - Novo Estilo */}
        <div className="mb-8 sticky top-[60px] md:top-[80px] z-40 bg-white/80 backdrop-blur-md py-4 md:py-6 -mx-6 px-6 sm:-mx-12 sm:px-12 transition-all">
          <form
            onSubmit={handleSearch}
            className="relative w-full group"
          >
            <i className="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-gray-900" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onBlur={() => handleSearch()}
              placeholder="Pesquisar nesta vitrine..."
              className="
                w-full bg-gray-50 border-none py-3 pl-12 pr-4
                text-sm md:text-base font-normal text-gray-900 placeholder-gray-400
                rounded-xl focus:bg-white focus:ring-1 focus:ring-gray-200 outline-none transition-all duration-300
              "
            />
          </form>
        </div>

        {/* Lista de Ofertas em Grade */}
        <div className="w-full min-h-[400px]">
          {offers.length === 0 && !loading ? (
            <div className="py-32 flex flex-col items-center justify-center text-center opacity-40">
              <i className="pi pi-box text-3xl mb-6" />
              <p className="font-light text-lg">Nenhuma oferta encontrada nesta vitrine.</p>
            </div>
          ) : (
            <div className="relative border-t border-gray-50">
              <VirtualScroller
                lazy
                showLoader
                ref={scrollerRef}
                items={rows}
                itemSize={cols === 2 ? 300 : 380}
                onLazyLoad={onLazyLoad}
                itemTemplate={itemTemplate}
                style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}
                className="mobile-offers-scroller w-full bg-transparent pt-8"
              />
            </div>
          )}
        </div>
      </div>

      {/* Rodapé mínimo */}
      <footer className="border-t border-gray-50 py-12 mt-20">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300 text-center font-light">
          {vitrine?.name} | Oferticando Aesthetic Feed v1
        </p>
      </footer>
    </div>
  );
};

export default VitrineClient;
