"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/shared/routes";
import { OfferResponseDto } from "@/models/offer.model";

interface ModernOfferCardProps {
  offer: OfferResponseDto;
  vitrineSlug?: string;
  index?: number;
}

const ModernOfferCard = ({ offer, vitrineSlug, index = 0 }: ModernOfferCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!offer.coupon) return;

    navigator.clipboard.writeText(offer.coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (offer.affiliateLink) {
      window.open(offer.affiliateLink, "_blank", "noopener,noreferrer");
    }
  };

  const url = useMemo(() => {
    let base = ROUTES.OFFERS.VIEW(offer?.slug);
    if (vitrineSlug) base += `?vs=${vitrineSlug}`;
    return base;
  }, [offer?.slug, vitrineSlug]);

  const discountAmount = useMemo(() => {
    if (!offer?.oldPrice || !offer?.price) return null;
    const old = Number(offer.oldPrice);
    const curr = Number(offer.price);
    if (isNaN(old) || isNaN(curr) || old <= curr) return null;
    const pct = Math.round(((old - curr) / old) * 100);
    return pct > 0 ? pct : null;
  }, [offer]);

  const formattedPrice = useMemo(
    () =>
      Number(offer.price).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [offer.price],
  );

  const formattedOldPrice = useMemo(
    () =>
      offer?.oldPrice
        ? Number(offer.oldPrice).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : null,
    [offer?.oldPrice],
  );

  const isNew = useMemo(() => {
    if (!offer.createdAt) return false;
    return Date.now() - new Date(offer.createdAt).getTime() < 24 * 60 * 60 * 1000;
  }, [offer.createdAt]);

  return (
    <Link
      href={url}
      style={{ animationDelay: `${index * 40}ms` }}
      className="group relative flex w-full flex-col bg-white rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 hover:border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
    >
      {/* ── Imagem ── */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F9F9F9] rounded-2xl md:rounded-3xl">
        {offer?.imageUrl ? (
          <Image
            src={offer.imageUrl}
            alt={offer?.title ?? ""}
            fill
            className="object-contain p-3 md:p-4 transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* Badges flutuantes */}
        <div className="absolute inset-x-2 top-2 flex items-start justify-between z-10">
          {offer?.store?.logo && (
            <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-md border border-white/60">
              <Image
                src={offer.store.logo}
                alt={offer.store.name}
                width={18}
                height={18}
                className="w-4 h-4 md:w-[18px] md:h-[18px] object-contain"
              />
            </div>
          )}

          <div className="flex flex-col items-end gap-1 ml-auto">
            {isNew && (
              <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-lg shadow-emerald-500/30 leading-none tracking-tight">
                NOVO
              </span>
            )}
            {discountAmount && (
              <span className="bg-[#FF3B30] text-white text-[10px] md:text-xs font-black px-2 py-1 rounded-xl shadow-lg shadow-red-500/30 leading-none tracking-tight">
                -{discountAmount}%
              </span>
            )}
          </div>
        </div>

        {/* Overlay CTA no hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 p-2.5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <span className="flex items-center justify-center gap-1.5 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/25">
            Ver oferta
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* ── Informações ── */}
      <div className="flex flex-col pt-3 pb-3 px-2">
        {/* Cupom */}
        {offer.coupon && (
          <div className="mb-2">
            <button
              onClick={handleCopyCoupon}
              className={`
                inline-flex items-center gap-1.5 px-2.5 py-1 
                text-[9px] md:text-[10px] font-bold rounded-xl 
                border border-dashed uppercase tracking-wider
                transition-all duration-300 transform active:scale-95 cursor-pointer
                ${copied 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-300 scale-105 shadow-sm shadow-emerald-500/10" 
                  : "bg-blue-50/80 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300"
                }
              `}
            >
              {copied ? (
                <>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-bounce"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copiado!
                </>
              ) : (
                <>
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 6l1.5-1.5V3h1.5L5.5 1.5 7 3l1.5-1.5L10 3v1.5L11.5 6 10 7.5V9H8.5L7 10.5 5.5 9 4 10.5H2.5V7.5L1 6Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {offer.coupon}
                </>
              )}
            </button>
          </div>
        )}

        {/* Preços */}
        <div className="flex flex-col mb-1.5">
          {formattedOldPrice && (
            <span className="text-[10px] md:text-xs text-gray-400 line-through font-medium leading-none mb-0.5">
              R$ {formattedOldPrice}
            </span>
          )}
          <div className="flex items-baseline gap-0.5 leading-none">
            <span className="text-xs font-semibold text-gray-500 mr-0.5">R$</span>
            <span className="text-lg md:text-xl font-black tracking-tight text-gray-900 leading-none">
              {formattedPrice}
            </span>
          </div>
        </div>

        {/* Título */}
        <h2 className="line-clamp-2 text-[11px] md:text-xs font-medium leading-[1.4] text-gray-500 group-hover:text-gray-900 transition-colors duration-200">
          {offer?.title}
        </h2>
      </div>
    </Link>
  );
};

export default ModernOfferCard;
