import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${site.legalName} | ${site.nameEn}`,
    short_name: site.name,
    description: site.description,
    lang: "fa-IR",
    dir: "rtl",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "any",
    background_color: "#fbf7ef",
    theme_color: "#16382f",
    categories: ["shopping", "lifestyle", "business"],
    prefer_related_applications: false,
    icons: [
      { src: "/icons/icon-48.png", sizes: "48x48", type: "image/png", purpose: "any" },
      { src: "/icons/icon-72.png", sizes: "72x72", type: "image/png", purpose: "any" },
      { src: "/icons/icon-96.png", sizes: "96x96", type: "image/png", purpose: "any" },
      { src: "/icons/icon-128.png", sizes: "128x128", type: "image/png", purpose: "any" },
      { src: "/icons/icon-144.png", sizes: "144x144", type: "image/png", purpose: "any" },
      { src: "/icons/icon-152.png", sizes: "152x152", type: "image/png", purpose: "any" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-256.png", sizes: "256x256", type: "image/png", purpose: "any" },
      { src: "/icons/icon-384.png", sizes: "384x384", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-master.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      {
        name: "فروشگاه جواهرات",
        short_name: "فروشگاه",
        description: "مرور همهٔ جواهرات طلای ۱۸ عیار زرناب",
        url: "/products",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "سبد خرید",
        short_name: "سبد",
        description: "تکمیل و پیگیری سفارش",
        url: "/cart",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "دانشنامهٔ طلا",
        short_name: "دانشنامه",
        description: "راهنمای خرید و نگهداری طلا",
        url: "/journal",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "مشاورهٔ اختصاصی",
        short_name: "مشاوره",
        description: "رزرو مشاورهٔ خرید با کارشناس زرناب",
        url: "/contact",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
