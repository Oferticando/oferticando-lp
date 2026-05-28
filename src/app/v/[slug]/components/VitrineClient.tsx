"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { OfferResponseDto } from "@/models/offer.model";
import { Vitrine } from "@/models/vitrine.model";
import { ApiService } from "@/services";
import { PaginatedResponse } from "@/models/paginated-response.model";
import VitrineNavbar from "./VitrineNavbar";
import VitrineHero from "./VitrineHero";
import VitrineSearch from "./VitrineSearch";
import VitrineStoreFilter from "./VitrineStoreFilter";
import VitrineHighlights from "./VitrineHighlights";
import VitrineGrid from "./VitrineGrid";

const PAGE_SIZE = 12;

interface VitrineClientProps {
  slug: string;
  initialVitrine?: Vitrine | null;
  initialOffers?: PaginatedResponse<OfferResponseDto>;
}

const VitrineClient = ({ slug, initialVitrine, initialOffers }: VitrineClientProps) => {
  const [vitrine, setVitrine] = useState<Vitrine | null>(initialVitrine || null);
  const [offers, setOffers] = useState<OfferResponseDto[]>(initialOffers?.data || []);
  const [totalOffers, setTotalOffers] = useState(initialOffers?.total || 0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | number | null>(null);

  const hasInitialized = useRef(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Buscar ofertas
  const fetchOffers = useCallback(
    async (pageToFetch: number, searchValue = search) => {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await ApiService.offers.getByVitrineSlug(slug, {
          page: pageToFetch,
          limit: PAGE_SIZE,
          search: searchValue,
        });
        const { vitrine: vitrineData, ofertas } = response.data;
        if (!vitrine && vitrineData) setVitrine(vitrineData);
        const newOffers = ofertas.data || [];
        setOffers((prev) => {
          if (pageToFetch === 1) return newOffers;
          const existingIds = new Set(prev.map((o) => o.id));
          return [...prev, ...newOffers.filter((o) => !existingIds.has(o.id))];
        });
        setTotalOffers(ofertas.total);
        setPage(pageToFetch);
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
      return;
    }
    hasInitialized.current = true;
    fetchOffers(1, search);
  }, [slug, search, fetchOffers, initialOffers]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && offers.length < totalOffers) {
          fetchOffers(page + 1, search);
        }
      },
      { threshold: 0.1 },
    );
    const sentinel = loadMoreRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, offers.length, totalOffers, page, search, fetchOffers]);

  // Colapsar header ao rolar
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80) setIsCollapsed(true);
      else if (y <= 10) setIsCollapsed(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearch(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  // Estado derivado
  const highlights = useMemo(() => {
    return [...offers]
      .filter((o) => o.oldPrice && o.price && Number(o.oldPrice) > Number(o.price))
      .map((o) => ({
        ...o,
        discountAmount: Math.round(
          ((Number(o.oldPrice) - Number(o.price)) / Number(o.oldPrice)) * 100,
        ),
      }))
      .sort((a, b) => b.discountAmount - a.discountAmount)
      .slice(0, 4);
  }, [offers]);

  const stores = useMemo(() => {
    const seen = new Set<string | number>();
    return offers.reduce<{ id: string | number; name: string; logo: string }[]>((acc, o) => {
      if (o.store?.id && !seen.has(o.store.id)) {
        seen.add(o.store.id);
        acc.push({ id: o.store.id, name: o.store.name, logo: o.store.logo });
      }
      return acc;
    }, []);
  }, [offers]);

  const filteredDisplayOffers = useMemo(() => {
    if (!selectedStoreId) return offers;
    return offers.filter((o) => o.store?.id === selectedStoreId);
  }, [offers, selectedStoreId]);

  const dynamicStyles = useMemo(() => {
    if (!vitrine) return "";
    const p = vitrine.primary_color || "#0071e3";
    const s = vitrine.secondary_color || "#0077ed";
    return `
      :root { --color-theme-primary: ${p}; --color-theme-secondary: ${s}; }
      .bg-theme-primary { background-color: ${p} !important; }
      .text-theme-primary { color: ${p} !important; }
      .border-theme-primary { border-color: ${p} !important; }
    `;
  }, [vitrine]);

  if (!vitrine && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-12 h-12 rounded-full border border-gray-200 animate-ping" />
          <span className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased pb-16">
      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />

      {/* Ambient blur de fundo */}
      <div className="absolute inset-x-0 top-0 h-72 md:h-96 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {vitrine?.imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center scale-110 blur-3xl opacity-20 transition-all duration-1000"
            style={{ backgroundImage: `url(${vitrine.imageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-50 opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-white z-10" />
      </div>

      <VitrineNavbar vitrine={vitrine} linkCopied={linkCopied} onCopy={handleCopy} />

      {vitrine && <VitrineHero vitrine={vitrine} totalOffers={totalOffers} />}

      <VitrineSearch
        vitrine={vitrine}
        isCollapsed={isCollapsed}
        searchInput={searchInput}
        search={search}
        loading={loading}
        offerCount={filteredDisplayOffers.length}
        totalOffers={totalOffers}
        onInputChange={setSearchInput}
        onSubmit={handleSearch}
        onClear={handleClearSearch}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 w-full min-h-[400px]">
        {!search && (
          <VitrineStoreFilter
            stores={stores}
            selectedStoreId={selectedStoreId}
            primaryColor={vitrine?.primary_color}
            onSelect={setSelectedStoreId}
          />
        )}

        {!search && (
          <VitrineHighlights highlights={highlights} vitrine={vitrine} slug={slug} />
        )}

        <VitrineGrid
          offers={filteredDisplayOffers}
          loading={loading}
          search={search}
          slug={slug}
          primaryColor={vitrine?.primary_color}
          loadMoreRef={loadMoreRef}
          onClearSearch={handleClearSearch}
        />
      </main>

      <footer className="border-t border-gray-100 py-10 mt-16">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300 text-center font-light">
          {vitrine?.name} | Curadoria Exclusiva
        </p>
      </footer>
    </div>
  );
};

export default VitrineClient;
