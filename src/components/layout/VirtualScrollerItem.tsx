"use client";

import React from "react";
import { OfferResponseDto } from "@/models/offer.model";

interface VirtualScrollerItemProps {
  item: OfferResponseDto | null;
  index: number;
  skeletonHeight?: string;
  renderOffer: (offer: OfferResponseDto) => React.ReactNode;
  className?: string; // Para espaçamento externo (ex: mb-4 ou py-2)
}

/**
 * Componente padronizado para itens dentro de um VirtualScroller (ofertas e ads).
 * Garante que skeletons, containers de ads e o espaçamento entre itens sejam consistentes.
 */
const VirtualScrollerItem = ({
  item,
  skeletonHeight = "120px",
  renderOffer,
  className = "mb-4",
}: VirtualScrollerItemProps) => {


  if (!item) {
    return (
      <div
        className={`
          w-full max-w-full overflow-hidden rounded-3xl bg-white border border-gray-50
          flex items-center p-4 md:p-5 gap-4 md:gap-6 animate-pulse ${className}
          shadow-sm
        `}
        style={{ height: skeletonHeight }}
      >
        <div className="w-24 h-24 md:w-32 md:h-28 rounded-2xl bg-gray-50 flex-shrink-0" />
        <div className="flex-1 space-y-3 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-50" />
            <div className="h-3 bg-gray-50 rounded-full w-24" />
          </div>
          <div className="h-4 bg-gray-50 rounded-full w-full" />
          <div className="h-4 bg-gray-50 rounded-full w-2/3" />
          <div className="flex items-baseline gap-3 mt-4">
            <div className="h-8 bg-orange-50/50 rounded-xl w-24" />
            <div className="h-4 bg-gray-50 rounded-full w-16" />
          </div>
        </div>
      </div>
    );
  }

  // ── Renderização da Oferta Real ──
  return (
    <div className={`w-full max-w-full overflow-hidden ${className}`}>
      {renderOffer(item)}
    </div>
  );
};

export default VirtualScrollerItem;
