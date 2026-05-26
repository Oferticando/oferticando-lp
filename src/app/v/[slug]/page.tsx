import { Metadata } from "next";
import { notFound } from "next/navigation";
import VitrineClient from "./components/VitrineClient";
import VitrineInactive from "./components/VitrineInactive";
import { ApiService } from "@/services";
import { PaginatedResponse } from "@/models/paginated-response.model";
import { OfferResponseDto } from "@/models/offer.model";
import { Vitrine } from "@/models/vitrine.model";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  try {
    const vitrine = await ApiService.vitrines.getBySlug(params.slug);
    if (!vitrine) return { title: "Vitrine | Oferticando" };
    return {
      title: `${vitrine.name} | Oferticando`,
      description: vitrine.description,
    };
  } catch {
    return { title: "Vitrine | Oferticando" };
  }
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { slug } = params;

  let isInactive = false;
  let initialOffers: PaginatedResponse<OfferResponseDto> | undefined =
    undefined;
  let vitrine: Vitrine | null = null;

  try {
    const response = await ApiService.offers.getByVitrineSlug(slug, {
      page: 1,
      limit: 12,
    });

    if (response?.data) {
      vitrine = response.data.vitrine;
      initialOffers = response.data.ofertas;
    }
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };
    if (
      err.status === 404 &&
      err.message === "Esta vitrine está temporariamente inativa."
    ) {
      isInactive = true;
    }

    if (process.env.NODE_ENV === "development") {
      const message =
        error instanceof Error ? error.message : String(err.message || error);
      console.error("[Vitrine] Erro na API:", message);
    }
  }

  if (isInactive) {
    return <VitrineInactive />;
  }

  if (!vitrine) {
    notFound();
  }

  return (
    <VitrineClient
      slug={slug}
      initialVitrine={vitrine}
      initialOffers={initialOffers}
    />
  );
}
