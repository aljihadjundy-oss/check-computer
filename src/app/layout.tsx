import type { Metadata } from "next";
import { Bebas_Neue, Sora, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://checkcomputer.pages.dev"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "servis laptop Ciputat",
    "servis PC Ciputat",
    "jual beli laptop Ciputat",
    "rakit PC Ciputat",
    "servis iPhone Ciputat",
    "servis MacBook Tangerang Selatan",
    "Check Computer",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    name: SITE.name,
    description: SITE.description,
    image: "https://checkcomputer.pages.dev/logo.png",
    telephone: `+${SITE.phoneWa}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Semanggi II No.16b, Cemp. Putih",
      addressLocality: "Ciputat Timur",
      addressRegion: "Tangerang Selatan, Banten",
      postalCode: "15412",
      addressCountry: "ID",
    },
    openingHours: "Mo-Su 09:00-21:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating,
      reviewCount: SITE.reviewCount,
    },
    sameAs: [SITE.instagramUrl],
  };

  return (
    <html
      lang="id"
      className={`${bebas.variable} ${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-paper">{children}</body>
    </html>
  );
}
