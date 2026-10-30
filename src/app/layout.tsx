import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/motion-bits";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/data";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { PwaProvider } from "@/components/pwa";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | گالری طلا و جواهرات ۱۸ عیار دست‌ساز`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "خرید طلا",
    "طلای ۱۸ عیار",
    "جواهرات دست‌ساز",
    "گردنبند طلا",
    "انگشتر الماس",
    "نیم‌ست عروس",
    "قیمت سکه",
    "گالری طلا تهران",
    "زرناب",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${site.url}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | جواهراتی که ارزش را به ارث می‌گذارند`,
    description: site.description,
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "کالکشن جواهرات زرناب" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | گالری طلا و جواهرات`,
    description: site.description,
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "shopping",
  applicationName: site.name,
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: [
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#16382f",
    "msapplication-TileImage": "/icons/icon-144.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7ef" },
    { media: "(prefers-color-scheme: dark)", color: "#16382f" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["JewelryStore", "LocalBusiness", "Organization"],
  "@id": `${site.url}/#organization`,
  name: site.legalName,
  alternateName: site.nameEn,
  url: site.url,
  image: `${site.url}/images/hero.jpg`,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  telephone: "+982191000884",
  email: site.email,
  priceRange: "$$$",
  currenciesAccepted: "IRR",
  paymentAccepted: "کارت بانکی، پرداخت آنلاین، کارت به کارت",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: site.city,
    addressRegion: "تهران",
    postalCode: site.postalCode,
    addressCountry: "IR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 35.7871, longitude: 51.4085 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  sameAs: [site.instagram, site.whatsapp],
  areaServed: { "@type": "Country", name: "Iran" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "412",
    bestRating: "5",
  },
  knowsAbout: [
    "طلای ۱۸ عیار",
    "جواهرات دست‌ساز ایرانی",
    "الماس و سنگ‌های شناسنامه‌دار",
    "سرمایه‌گذاری در طلا",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: "fa-IR",
  publisher: { "@id": `${site.url}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          rel="preload"
          href="/fonts/Vazirmatn.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Cormorant.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2 focus:text-sm focus:text-ivory"
          >
            رفتن به محتوای اصلی
          </a>
          <ScrollProgress />
          <Header announcement={settings.announcement} />
          <div className="pb-[calc(4.35rem+env(safe-area-inset-bottom))] lg:pb-0">
            <main id="main">{children}</main>
            <Footer />
          </div>
          <MobileTabBar />
          <PwaProvider />
        </CartProvider>
      </body>
    </html>
  );
}
