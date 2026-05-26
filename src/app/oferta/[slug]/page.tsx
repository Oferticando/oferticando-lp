import { Metadata } from "next";
import OfferDetailsClient from "./components/OfferDetailsClient";
import JsonLd from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

const SITE_URL = "https://oferticando.com.br";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getOffer(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const res = await fetch(`${apiUrl}/offers/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const offer = await getOffer(params.slug);

  if (!offer) return { title: "Oferta não encontrada | Oferticando" };

  const parsedPrice = offer.price ? Number(offer.price).toFixed(2) : undefined;
  const discountText = offer.discount_percentage ? ` (${offer.discount_percentage}% OFF)` : "";

  return {
    title: `${offer.title}${discountText} | Oferticando`,
    description: `Aproveite essa promoção por ${parsedPrice ? `R$ ${parsedPrice}` : 'um super preço'}! ${offer.description || ''}`,
    openGraph: {
      title: `${offer.title} - Promoção Imperdível`,
      description: `Compre gora na ${offer.store?.name || 'loja'} economizando com o Oferticando.`,
      images: offer.image_url ? [{ url: offer.image_url, alt: offer.title }] : [{ url: `${SITE_URL}/og-image.png` }],
      url: `${SITE_URL}/oferta/${offer.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${offer.title} - Aproveite o Desconto!`,
      description: `Corre que o preço caiu 🔥. ${offer.description || ''}`,
      images: offer.image_url ? [offer.image_url] : [`${SITE_URL}/og-image.png`],
    }
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const offer = await getOffer(params.slug);

  const productSchema = offer
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: offer.title,
        description: offer.description || offer.title,
        image: offer.image_url,
        url: `${SITE_URL}/oferta/${offer.slug}`,
        brand: offer.store?.name
          ? { "@type": "Brand", name: offer.store.name }
          : undefined,
        offers: {
          "@type": "Offer",
          url: offer.affiliate_link || `${SITE_URL}/oferta/${offer.slug}`,
          priceCurrency: "BRL",
          price: offer.price,
          availability: "https://schema.org/InStock",
          seller: offer.store?.name
            ? { "@type": "Organization", name: offer.store.name }
            : undefined,
        },
      }
    : null;

  return (
    <>
      {productSchema && <JsonLd data={productSchema} />}
      <OfferDetailsClient />
    </>
  );
}
