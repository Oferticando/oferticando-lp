"use client";

import { RefObject } from "react";
import { OfferResponseDto } from "@/models/offer.model";
import ModernOfferCard from "@/components/ItemPublicOffers/ModernOfferCard";
import ModernOfferCardSkeleton from "@/components/ItemPublicOffers/ModernOfferCardSkeleton";

interface VitrineGridProps {
  offers: OfferResponseDto[];
  loading: boolean;
  search: string;
  slug: string;
  primaryColor: string | undefined;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onClearSearch: () => void;
}

const VitrineGrid = ({
  offers,
  loading,
  search,
  slug,
  primaryColor,
  loadMoreRef,
  onClearSearch,
}: VitrineGridProps) => {
  if (offers.length === 0 && !loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center text-center py-28 px-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
          <svg
            className="w-7 h-7 text-gray-300"
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
        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
          Nenhuma oferta encontrada
        </h3>
        <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed">
          {search ? (
            <>
              Sem resultados para{" "}
              <span className="font-semibold text-gray-700">&ldquo;{search}&rdquo;</span>
            </>
          ) : (
            "Esta vitrine ainda não possui ofertas."
          )}
        </p>
        {search && (
          <button
            onClick={onClearSearch}
            className="px-8 py-3 text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-200 rounded-xl active:scale-95 cursor-pointer"
            style={{ backgroundColor: primaryColor || "#111827" }}
          >
            Ver todas as ofertas
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 pt-5">
      {!search && (
        <div className="flex items-center gap-2.5 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            Todas as Promoções
          </h2>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mb-4 md:mb-6 px-0.5">
        {offers.map((offer, i) => (
          <div key={offer.id} className="w-full">
            <ModernOfferCard offer={offer} vitrineSlug={slug} index={i} />
          </div>
        ))}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="w-full">
              <ModernOfferCardSkeleton />
            </div>
          ))}
      </div>

      <div ref={loadMoreRef} className="h-16" />
    </div>
  );
};

export default VitrineGrid;
