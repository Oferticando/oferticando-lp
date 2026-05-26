"use client";

import { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from "react";
import {
  VirtualScroller,
  VirtualScrollerLazyEvent,
} from "primereact/virtualscroller";

import ModernOfferCard from "@/components/ItemPublicOffers/ModernOfferCard";
import { OfferResponseDto } from "@/models/offer.model";
import { ApiService } from "@/services";

interface OffersListExceptCurrentProps {
  currentOfferId: number;
  vitrineSlug?: string | null;
}

const PAGE_SIZE = 12;

const OffersListExceptCurrent = ({
  currentOfferId,
  vitrineSlug,
}: OffersListExceptCurrentProps) => {
  const scrollerRef = useRef<VirtualScroller | null>(null);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);
  const loadedPagesRef = useRef<number[]>([]);
  const [offers, setOffers] = useState<OfferResponseDto[]>([]);

  // ── Controle de Colunas (Grid) ──
  const [cols, setCols] = useState(2);

  useLayoutEffect(() => {
    const handleResize = () => {
      // Ajuste de colunas para o widget lateral/inferior
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

  const fetchOffers = useCallback(
    async (page: number) => {
      if (loadedPagesRef.current.includes(page)) return;
      try {
        let response;

        if (vitrineSlug) {
          response = await ApiService.offers.getByVitrineSlugExceptId(
            vitrineSlug,
            currentOfferId,
            { page, limit: PAGE_SIZE },
          );
        } else {
          response = await ApiService.offers.getAllExceptId(currentOfferId, {
            page,
            limit: PAGE_SIZE,
          });
        }

        setOffers((prev) => {
          const merged =
            page === 1 ? Array(response.total).fill(undefined) : [...prev];
          (response.data ?? []).forEach((item: OfferResponseDto, i: number) => {
            const index = (page - 1) * PAGE_SIZE + i;
            if (index < merged.length) {
                merged[index] = item;
            }
          });
          return merged;
        });

        const next = page === 1 ? [1] : [...loadedPagesRef.current, page];
        loadedPagesRef.current = next;
        setLoadedPages(next);
      } catch (error) {
        console.error(error);
      }
    },
    [currentOfferId, vitrineSlug],
  );

  useEffect(() => {
    setOffers([]);
    setLoadedPages([]);
    loadedPagesRef.current = [];
    fetchOffers(1);
  }, [vitrineSlug, currentOfferId, fetchOffers]);

  const onLazyLoad = (event: VirtualScrollerLazyEvent) => {
    const lastRowIndex = typeof event.last === "number" ? event.last : 0;
    const lastItemIndex = (lastRowIndex + 1) * cols;
    const neededPage = Math.floor(lastItemIndex / PAGE_SIZE) + 1;
    if (!loadedPages.includes(neededPage)) fetchOffers(neededPage);
  };

  const itemTemplate = (
    rowItems: (OfferResponseDto | undefined)[],
    options: { index: number },
  ) => (
    <div 
      className="grid gap-4 md:gap-6 mb-8 px-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {rowItems.map((offer, i) => (
        <div key={offer?.id || `skeleton-related-${options.index}-${i}`} className="w-full">
          {offer ? (
            <ModernOfferCard
              offer={offer}
              vitrineSlug={vitrineSlug || undefined}
            />
          ) : (
            <div className="flex flex-col animate-pulse">
               <div className="aspect-square w-full bg-gray-50 rounded-2xl mb-3" />
               <div className="h-4 bg-gray-50 rounded-full w-2/3 mb-2" />
               <div className="h-4 bg-gray-50 rounded-full w-1/3" />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 bg-secondary rounded-full" />
        <h2 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
          Explorar mais
        </h2>
      </div>

      <VirtualScroller
        lazy
        showLoader
        ref={scrollerRef}
        itemSize={cols === 2 ? 300 : 380}
        items={rows}
        onLazyLoad={onLazyLoad}
        itemTemplate={itemTemplate}
        style={{ height: "800px" }}
        className="mobile-offers-scroller rounded-2xl overflow-y-auto overflow-x-hidden bg-transparent"
      />
    </section>
  );
};

export default OffersListExceptCurrent;
