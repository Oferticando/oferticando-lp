"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

import { ApiService } from "@/services";
import { ROUTES } from "@/shared/routes";
import { OfferResponseDto } from "@/models/offer.model";
import OffersListExceptCurrent from "./OffersListExceptCurrent";


/* ─── helpers ───────────────────────────────────────────────── */
const formatPrice = (val: string | number) =>
  Number(val).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const discountPct = (old: number, cur: number | string) =>
  Math.round(100 - (Number(cur) / Number(old)) * 100);

const OfferBySlugPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const vitrineSlug = searchParams.get("vs");

  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentOffer, setCurrentOffer] = useState<OfferResponseDto | null>(
    null,
  );

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    ApiService.offers
      .getBySlug(slug)
      .then(setCurrentOffer)
      .catch(() => setCurrentOffer(null))
      .finally(() => setLoading(false));
  }, [slug]);

  /* ── share / copy ── */
  const handleGoToStore = () =>
    currentOffer?.affiliate_link &&
    window.open(currentOffer.affiliate_link, "_blank", "noopener,noreferrer");

  const handleCopyCoupon = () => {
    if (!currentOffer?.coupon) return;
    navigator.clipboard.writeText(currentOffer.coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1500);
  };

  /* ─── Loading (Clean Minimal) ────────────────────────────── */
  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-24 animate-pulse opacity-40">
          <div className="bg-gray-50 h-[500px] rounded-3xl" />
          <div className="flex flex-col justify-center space-y-8">
            <div className="h-4 bg-gray-100 w-32" />
            <div className="h-10 bg-gray-100 w-full" />
            <div className="h-16 bg-gray-50 w-1/2 mt-8" />
            <div className="h-14 bg-gray-100 w-full mt-12 rounded-full" />
          </div>
        </div>
      </main>
    );
  }

  /* ─── Not found ───────────────────────────────────────────── */
  if (!currentOffer) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="max-w-xl w-full text-center">
          <div className="w-px h-16 bg-gray-200 mx-auto mb-12" />
          <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-6">
            Página não encontrada.
          </h1>
          <p className="text-gray-400 font-light text-base mb-16 leading-relaxed">
            Esta oferta pode ter expirado ou o link foi removido.
            <br />
            Sinta-se à vontade para explorar nosso diretório atualizado.
          </p>
          <button
            onClick={() => router.push(ROUTES.HOME)}
            className="text-gray-900 uppercase text-xs tracking-widest border-b border-gray-900 pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors font-bold"
          >
            Retornar
          </button>
        </div>
      </main>
    );
  }

  const hasDiscount = !!(currentOffer.old_price && currentOffer.price);
  const pct = hasDiscount
    ? discountPct(currentOffer.old_price!, currentOffer.price)
    : 0;

  /* ─── Main ────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-gray-200 antialiased overflow-x-hidden pb-12">
      {/* Background Decor (Subtle light spots) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gray-100 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-[40%] -right-[15%] w-[50%] h-[50%] bg-gray-100 rounded-full blur-[150px] opacity-30" />
      </div>

      {/* Top Navigation Bar / Breadcrumb */}
      <div className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => vitrineSlug ? router.push(ROUTES.OFFERS.VITRINE(vitrineSlug)) : router.back()}
            className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-gray-900 transition-all group"
          >
            <i className="pi pi-arrow-left transition-transform group-hover:-translate-x-1" />
            <span>Voltar {vitrineSlug && "à vitrine"}</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleCopyLink}
              className="w-10 h-10 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shadow-sm"
              title="Compartilhar"
            >
              <i className={`pi ${copiedLink ? "pi-check text-green-500" : "pi-share-alt"} text-[10px]`} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-24">
        <div className="grid lg:grid-cols-11 gap-12 lg:gap-20 items-start">
          
          {/* LADO ESQUERDO: GALERIA/IMAGEM (Sticky on desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 space-y-8 animate-in slide-in-from-left-4 duration-1000">
            <div className="relative aspect-square lg:aspect-[4/5] bg-white border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-700">
              {/* Discount Float Badge */}
              {pct > 0 && (
                <div className="absolute top-8 left-8 z-10 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-xl shadow-gray-900/20">
                  {pct}% OFF
                </div>
              )}

              {/* Product Image */}
              <div className="w-full h-full flex items-center justify-center p-12 md:p-20">
                <Image
                  src={currentOffer.image_url}
                  alt={currentOffer.title}
                  width={1000}
                  height={1000}
                  unoptimized
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
              </div>

              {/* Glass footer info (Desktop only) */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/40 backdrop-blur-md border border-white/40 p-6 rounded-2xl hidden lg:block opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                 <p className="text-[9px] font-bold text-gray-900 uppercase tracking-widest text-center">Visualização Profissional</p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: INFOS & CTAS */}
          <div className="lg:col-span-5 space-y-10 animate-in slide-in-from-right-4 duration-1000 delay-200">
            
            <header className="space-y-6">
              <div className="flex items-center gap-4">
                {currentOffer.store?.name && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[9px] font-bold uppercase tracking-widest rounded-sm">
                    {currentOffer.store.name}
                  </span>
                )}
                {currentOffer.user?.name && (
                   <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                     Postado por {currentOffer.user.name}
                   </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-light text-gray-900 leading-[1.1] tracking-tight">
                {currentOffer.title}
              </h1>
            </header>

            {/* Price Visualization */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 h-6">
                 {currentOffer.old_price && (
                   <span className="text-xl text-gray-300 font-light line-through decoration-gray-300 transition-colors">
                     R$ {currentOffer.old_price}
                   </span>
                 )}
                 {pct > 0 && (
                   <span className="text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-sm border border-green-100 uppercase tracking-widest">
                     Melhor preço
                   </span>
                 )}
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-light text-gray-400 uppercase tracking-widest mb-2 block">R$</span>
                <span className="text-6xl md:text-8xl font-normal text-gray-900 tracking-tighter">
                  {formatPrice(currentOffer.price)}
                </span>
              </div>
            </div>

            {/* Ações Táticas */}
            <div className="space-y-6 pt-4">
              
              {/* Cupom se existir */}
              {currentOffer.coupon && (
                <div className="relative group overflow-hidden bg-white border border-gray-100 p-6 rounded-2xl flex items-center justify-between shadow-sm hover:border-gray-900 transition-colors duration-500">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Cupom Exclusivo</span>
                      <span className="text-xl font-light text-gray-900 tracking-widest uppercase">{currentOffer.coupon}</span>
                   </div>
                   <button
                    onClick={handleCopyCoupon}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-900 bg-gray-100 px-6 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-all shadow-sm"
                   >
                    {copied ? (
                      <span className="text-green-600 flex items-center gap-2">
                         <i className="pi pi-check" /> Copiado
                      </span>
                    ) : (
                      <>
                        <i className="pi pi-copy" /> Copiar
                      </>
                    )}
                   </button>
                </div>
              )}

              {/* Botão Principal Ver Oferta */}
              <button
                onClick={handleGoToStore}
                className="w-full h-20 bg-gray-900 text-white flex items-center justify-center gap-6 rounded-sm group hover:bg-black transition-all shadow-2xl shadow-gray-200/50 relative overflow-hidden active:scale-[0.98]"
              >
                <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:animate-sweep pointer-events-none" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Ir para a Loja</span>
                <i className="pi pi-arrow-right text-[10px] transform group-hover:translate-x-2 transition-transform duration-500" />
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full h-16 bg-white border border-gray-200 text-gray-900 flex items-center justify-center gap-4 rounded-sm hover:border-gray-900 transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-sm active:scale-[0.99]"
              >
                <i className={`pi ${copiedLink ? "pi-check text-green-500" : "pi-share-alt"} text-[10px]`} />
                <span>{copiedLink ? "Link Copiado" : "Compartilhar Oferta"}</span>
              </button>
            </div>

            {/* Informações Relevantes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-gray-100 rounded-2xl space-y-2 group hover:bg-gray-50 transition-colors">
                 <i className="pi pi-shield text-gray-400 text-xs group-hover:text-gray-900 transition-colors" />
                 <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Loja Validada</h4>
                 <p className="text-[10px] text-gray-400 leading-relaxed font-medium">Link seguro redirecionado diretamente para canal oficial.</p>
              </div>
              <div className="p-5 bg-white border border-gray-100 rounded-2xl space-y-2 group hover:bg-gray-50 transition-colors">
                 <i className="pi pi-bolt text-gray-400 text-xs group-hover:text-gray-900 transition-colors" />
                 <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Preço Volátil</h4>
                 <p className="text-[10px] text-gray-400 leading-relaxed font-medium">Ofertas expiram rápido. Atue com agilidade.</p>
              </div>
            </div>

            {/* Disclaimer sutil */}
            <div className="pt-6">
              <p className="text-[9px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest opacity-40 max-w-sm">
                * O Oferticando é um buscador de promoções. Não vendemos produtos diretamente.
              </p>
            </div>

          </div>
        </div>

        {/* ── Descrição Expandida ── */}
        {currentOffer.description && (
          <div className="mt-24 lg:mt-48 pt-24 border-t border-gray-100 flex flex-col items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-12">Detalhamento Técnico</span>
            <div className="max-w-4xl w-full">
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed whitespace-pre-line text-center px-4">
                {currentOffer.description}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ── Outras ofertas ── */}
      <section className="bg-white pt-32 pb-20 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <header className="mb-20 flex items-center justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Descubra mais</span>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">Curadoria Exclusiva</h2>
              </div>
           </header>
           
           <OffersListExceptCurrent
              currentOfferId={currentOffer?.id ?? 0}
              vitrineSlug={vitrineSlug}
            />
        </div>
      </section>

      {/* ── Footer Branding ── */}
      <footer className="bg-white py-20 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center gap-10">
          <div className="w-px h-12 bg-gray-100" />
          <a
            href="https://unificando.com.br/"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center gap-3"
          >
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Tecnologia por</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-gray-400 group-hover:text-gray-900 transition-colors tracking-tighter">
                Unificando
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            </div>
          </a>
        </div>
      </footer>

      {/* ── Sticky Mobile CTA / Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-2xl border-t border-gray-100 p-5 md:hidden animate-in slide-in-from-bottom duration-500 overflow-hidden">
        <div className="flex items-center gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate mb-1">{currentOffer.store?.name || 'Oferta'}</p>
            <p className="text-xl font-normal text-gray-900 tracking-tighter">R$ {formatPrice(currentOffer.price)}</p>
          </div>
          <button
            onClick={handleGoToStore}
            className="bg-gray-900 text-white px-8 h-12 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center shrink-0 shadow-lg active:scale-95 transition-transform"
          >
            Resgatar
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(12deg); }
          100% { transform: translateX(250%) skewX(12deg); }
        }
        .animate-sweep {
          animation: sweep 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default OfferBySlugPage;
