import Link from "next/link";
import { site } from "@/lib/site";
import {
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconShield,
  IconWhatsapp,
} from "./icons";
import { NewsletterForm } from "./newsletter-form";

const shopLinks = [
  { href: "/products", label: "همهٔ جواهرات" },
  { href: "/collections/necklace", label: "گردنبند" },
  { href: "/collections/ring", label: "انگشتر" },
  { href: "/collections/bracelet", label: "دستبند" },
  { href: "/collections/earrings", label: "گوشواره" },
  { href: "/collections/set", label: "نیم‌ست عروس" },
  { href: "/collections/bullion", label: "سکه و شمش" },
];

const serviceLinks = [
  { href: "/about", label: "دربارهٔ زرناب" },
  { href: "/contact", label: "مشاورهٔ اختصاصی" },
  { href: "/contact?topic=سفارش%20طراحی%20اختصاصی", label: "سفارش طراحی سفارشی" },
  { href: "/faq", label: "پرسش‌های متداول" },
  { href: "/journal", label: "دانشنامه طلا" },
  { href: "/admin/login", label: "ورود مدیریت" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-forest-deep text-ivory">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full border border-gold/40 bg-white/5 font-display text-xl text-gold-light">
                Z
              </span>
              <div>
                <p className="font-display text-2xl tracking-[0.32em] text-ivory">ZARNAB</p>
                <p className="text-[10px] tracking-[0.3em] text-gold-light/80">FINE JEWELLERY · TEHRAN</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-7 text-ivory/65">
              زرناب از سال ۱۳۷۶ در تهران، طلای ۱۸ عیار و جواهرات دست‌ساز را با طراحی اصیل ایرانی و
              استانداردهای جهانی عرضه می‌کند.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام زرناب"
                className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold-light"
              >
                <IconInstagram className="size-4" />
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتس‌اپ زرناب"
                className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold-light"
              >
                <IconWhatsapp className="size-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="ایمیل زرناب"
                className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold-light"
              >
                <IconMail className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-gold-light">فروشگاه</p>
            <ul className="space-y-2.5 text-sm text-ivory/70">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-gold-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-gold-light">زرناب</p>
            <ul className="space-y-2.5 text-sm text-ivory/70">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-gold-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-gold-light">خبرنامهٔ خصوصی</p>
            <NewsletterForm />
            <ul className="mt-6 space-y-2.5 text-xs text-ivory/60">
              <li className="flex items-start gap-2">
                <IconPin className="mt-0.5 size-4 shrink-0 text-gold-light" />
                {site.address}
              </li>
              <li className="flex items-center gap-2">
                <IconPhone className="size-4 text-gold-light" />
                <a href={`tel:${site.phoneHref}`} className="hover:text-gold-light">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconShield className="size-4 text-gold-light" />
                دارای مجوز اتحادیهٔ طلا و جواهر تهران
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 hairline opacity-40" />

        <div className="flex flex-col items-center justify-between gap-4 text-[11px] text-ivory/45 md:flex-row">
          <p>© ۱۴۰۵ گالری طلا و جواهر زرناب. تمام حقوق محفوظ است.</p>
          <div className="flex items-center gap-4">
            <span>پرداخت امن</span>
            <span className="opacity-40">|</span>
            <span>ضمانت اصالت</span>
            <span className="opacity-40">|</span>
            <span>ارسال بیمه‌شده</span>
            <span className="opacity-40">|</span>
            <span>بازخرید تضمینی</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
