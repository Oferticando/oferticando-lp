"use client";

import { ROUTES } from "@/shared/routes";
import { OfferResponseDto } from "@/models/offer.model";
import { Vitrine } from "@/models/vitrine.model";

interface HighlightOffer extends OfferResponseDto {
  discountAmount: number;
}

interface VitrineHighlightsProps {
  highlights: HighlightOffer[];
  vitrine: Vitrine | null;
  slug: string;
}

const VitrineHighlights = ({ highlights, vitrine, slug }: VitrineHighlightsProps) => {
  if (highlights.length === 0) return null;

  const gradientStyle =
    vitrine?.primary_color && vitrine?.secondary_color
      ? `linear-gradient(to top right, ${vitrine.primary_color}, ${vitrine.secondary_color})`
      : "linear-gradient(to top right, #0071e3, #00c6ff)";

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
          Super Destaques
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        {highlights.map((offer) => (
          <div key={`highlight-${offer.id}`} className="w-[280px] sm:w-[320px] flex-shrink-0">
            <div className="relative group rounded-3xl p-px bg-gradient-to-tr from-gray-100 to-gray-50 transition-all duration-300 hover:shadow-xl hover:shadow-black/8 h-full">
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundImage: gradientStyle }}
                aria-hidden="true"
              />

              <div className="relative rounded-[23px] bg-white p-4 h-[172px] flex gap-4 border border-gray-100 group-hover:border-transparent transition-colors duration-300">
                {/* Imagem */}
                <div className="relative w-28 h-full bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100">
                  {offer.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="object-contain p-2 w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-[10px] text-gray-300">Sem Foto</span>
                  )}
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-sm shadow-red-500/20">
                    -{offer.discountAmount}%
                  </span>
                </div>

                {/* Informações */}
                <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                  <div>
                    {offer.store?.logo && (
                      <div className="flex items-center gap-1.5 mb-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={offer.store.logo} alt={offer.store.name} className="w-3.5 h-3.5 object-contain" />
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide truncate">
                          {offer.store.name}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-relaxed">
                      {offer.title}
                    </h3>
                    <div className="flex flex-col mt-2">
                      {offer.oldPrice && (
                        <span className="text-[9px] font-medium text-gray-400 line-through">
                          R$ {Number(offer.oldPrice).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      )}
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-[10px] font-black" style={{ color: vitrine?.primary_color || "#111827" }}>
                          R$
                        </span>
                        <span
                          className="text-base font-black leading-none tracking-tight"
                          style={{ color: vitrine?.primary_color || "#111827" }}
                        >
                          {Number(offer.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={ROUTES.OFFERS.VIEW(offer.slug) + `?vs=${slug}`}
                    className="inline-flex items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white py-2 rounded-xl transition-all cursor-pointer bg-gray-900 hover:bg-black"
                  >
                    Aproveitar
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VitrineHighlights;
