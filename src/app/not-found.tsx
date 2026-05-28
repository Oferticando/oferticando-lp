import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-60 h-60 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-lg flex flex-col items-center">
        {/* Aesthetic visual badge */}
        <div className="w-20 h-20 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 shadow-xs animate-bounce duration-1000">
          <i className="pi pi-exclamation-triangle text-3xl text-orange-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          Vitrine ou Página Não Encontrada
        </h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-md">
          O link que você acessou pode estar incorreto, a vitrine pode ter sido renomeada ou está temporariamente indisponível.
        </p>

        {/* Premium Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 bg-gray-950 hover:bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <i className="pi pi-home text-xs" />
            Ir para o Início
          </Link>
          <Link
            href="/ofertas"
            className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 text-[11px] font-bold uppercase tracking-widest rounded-2xl border border-gray-200 hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <i className="pi pi-tag text-xs" />
            Explorar Ofertas
          </Link>
        </div>
      </div>
    </div>
  );
}
