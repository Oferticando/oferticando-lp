"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/shared/routes";
import { OfferResponseDto } from "@/models/offer.model";

interface ModernOfferCardProps {
  offer: OfferResponseDto;
  vitrineSlug?: string;
}

const ModernOfferCard = ({ offer, vitrineSlug }: ModernOfferCardProps) => {
  const url = useMemo(() => {
    let base = ROUTES.OFFERS.VIEW(offer?.slug);
    if (vitrineSlug) {
      base += `?vs=${vitrineSlug}`;
    }
    return base;
  }, [offer?.slug, vitrineSlug]);

  const discountAmount = useMemo(() => {
    if (!offer?.old_price || !offer?.price) return null;
    const old = Number(offer.old_price);
    const curr = Number(offer.price);
    if (isNaN(old) || isNaN(curr) || old <= curr) return null;
    const pct = Math.round(((old - curr) / old) * 100);
    return pct > 0 ? `${pct}%` : null;
  }, [offer]);

  return (
    <Link
      href={url}
      className="group relative flex w-full flex-col bg-white overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02]"
    >
      {/* ── Imagem (Aspect Square) ── */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F9F9F9] rounded-2xl md:rounded-3xl">
        <Image
          src={offer?.image_url}
          alt={offer?.title}
          fill
          className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={false}
        />

        {/* Badges Flutuantes */}
        <div className="absolute inset-x-2 top-2 flex items-start justify-between z-10">
          {/* Loja */}
          {offer?.store?.logo && (
            <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-white/50">
              <Image
                src={offer.store.logo}
                alt={offer.store.name}
                width={16}
                height={16}
                className="w-4 h-4 md:w-5 md:h-5 object-contain"
              />
            </div>
          )}

          {/* Desconto */}
          {discountAmount && (
            <span className="bg-[#FF3B30] text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-lg shadow-lg shadow-red-500/20">
              {discountAmount} OFF
            </span>
          )}
        </div>

        {/* Overlay de Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>

      {/* ── Informações ── */}
      <div className="flex flex-col pt-3 pb-2 px-1">
        {/* Preços */}
        <div className="flex flex-col mb-1">
          {offer?.old_price && (
            <span className="text-[10px] md:text-xs text-gray-400 line-through font-medium">
              R$ {Number(offer.old_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
          <span className="text-base md:text-lg font-bold tracking-tight text-gray-900 leading-tight">
            <span className="text-xs md:text-sm font-semibold mr-0.5 text-gray-500">R$</span>
            {Number(offer.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Título */}
        <h2 className="line-clamp-2 text-[11px] md:text-[13px] font-medium leading-[1.3] text-gray-600 group-hover:text-black transition-colors">
          {offer?.title}
        </h2>
      </div>
    </Link>
  );
};

export default ModernOfferCard;
