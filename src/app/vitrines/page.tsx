import Link from "next/link";
import { ApiService } from "@/services";

export default async function PublicVitrinesPage() {
  const vitrines = await ApiService.vitrines.getAll().catch(() => []);

  return (
    <div className="px-6 py-16 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="space-y-4 border-b border-gray-100 pb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
            Diretório Público
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
            Vitrines ativas.
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Esta listagem reflete apenas vitrines públicas e ativas conforme o contrato do backend.
          </p>
        </header>

        {vitrines.length === 0 ? (
          <div className="border border-gray-100 p-10 text-center text-gray-500">
            Nenhuma vitrine pública encontrada.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vitrines.map((vitrine) => (
              <Link
                key={vitrine.id}
                href={`/v/${vitrine.slug}`}
                className="border border-gray-100 p-8 hover:border-gray-900 transition-colors bg-white"
              >
                <p className="text-2xl font-light text-gray-900 tracking-tight">
                  {vitrine.name}
                </p>
                <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                  {vitrine.description || "Sem descrição pública cadastrada."}
                </p>
                <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  /v/{vitrine.slug}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
