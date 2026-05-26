import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PushNotificationBanner from "@/components/pwa/PushNotificationBanner";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import CookieConsent from "@/components/CookieConsent";
import GlobalBackground from "@/components/layout/GlobalBackground";
import JsonLd from "@/components/seo/JsonLd";
import GlobalRequestOverlay from "@/components/feedback/GlobalRequestOverlay";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oferticando — As Melhores Promoções, Cupons e Ofertas Online!",
  description:
    "Encontre os melhores cupons de desconto, promoções, ofertas e preços exclusivos em produtos das maiores lojas do Brasil. Economize de verdade com o Oferticando!",
  keywords: [
    "ofertas",
    "cupons",
    "desconto",
    "promoção",
    "produtos baratos",
    "compras online",
    "Shopee",
    "Mercado Livre",
    "Amazon",
    "Oferticando",
  ],
  alternates: {
    canonical: "https://oferticando.com.br",
  },
  openGraph: {
    title: "Oferticando — As Melhores Promoções e Cupons!",
    description:
      "Descubra cupons, descontos e promoções exclusivas nas principais lojas do Brasil.",
    url: "https://oferticando.com.br",
    siteName: "Oferticando",
    images: [
      {
        url: "https://oferticando.com.br/og-image.png", // crie e coloque essa imagem na pasta public depois!
        width: 1200,
        height: 630,
        alt: "Oferticando — Cupons e Promoções",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seleção de Ofertas",
    description: "Cupons, descontos e ofertas exclusivas nas melhores lojas.",
    site: "@oferticando",
    images: ["https://oferticando.com.br/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Oferticando",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#0071e3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const SITE_URL = "https://oferticando.com.br";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Oferticando",
  url: SITE_URL,
  description:
    "Seleção das melhores promoções, cupons e ofertas das principais lojas do Brasil.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/ofertas?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Oferticando",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    "Seleção das melhores promoções, cupons e ofertas das principais lojas do Brasil.",
  sameAs: [`${SITE_URL}`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <QueryProvider>
          <JsonLd data={[websiteSchema, organizationSchema]} />
          <GlobalBackground />
          <ServiceWorkerRegister />
          <GlobalRequestOverlay />

          <Suspense fallback={null}>
            <Navbar />
          </Suspense>

          <main className="flex-1 w-full max-w-(--container-max-w) mx-auto">
            {children}
          </main>

          <Footer />
          <PushNotificationBanner />
          <CookieConsent />
        </QueryProvider>
      </body>
    </html>
  );
}
