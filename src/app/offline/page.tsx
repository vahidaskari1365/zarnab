import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { IconPhone, IconSparkle, IconWhatsapp } from "@/components/icons";

export const metadata: Metadata = {
  title: "حالت آفلاین",
  description: "اتصال اینترنت قطع است؛ به‌محض بازگشت اتصال، گالری زرناب در دسترس خواهد بود.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="container-x flex min-h-[62vh] flex-col items-center justify-center py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full border border-gold/40 bg-gradient-to-br from-gold-pale to-cream font-display text-2xl font-semibold text-gold-deep">
        Z
      </span>
      <h1 className="mt-5 text-2xl font-extrabold text-ink">اتصال اینترنت برقرار نیست</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-muted">
        صفحه‌هایی که قبلاً دیده‌اید در حالت آفلاین در دسترس هستند. پس از بازگشت اینترنت، گالری، سبد
        خرید و سفارش‌ها به‌صورت خودکار به‌روزرسانی می‌شوند.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-gold text-xs">
          <IconSparkle className="size-4" />
          تلاش دوباره
        </Link>
        <a href={`tel:${site.phoneHref}`} className="btn btn-outline text-xs">
          <IconPhone className="size-4" />
          تماس با گالری
        </a>
        <a href={site.whatsapp} className="btn btn-outline text-xs" target="_blank" rel="noopener noreferrer">
          <IconWhatsapp className="size-4" />
          واتس‌اپ
        </a>
      </div>
    </div>
  );
}
