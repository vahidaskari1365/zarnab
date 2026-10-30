"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { navigation, site, toPersianDigits } from "@/lib/site";
import {
  IconCart,
  IconClose,
  IconMenu,
  IconPhone,
  IconSearch,
  IconSparkle,
  IconWhatsapp,
} from "./icons";

export function Header({ announcement, rates = [] }: { announcement?: string; rates?: string[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { count, lastAdded } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    startTransition(() => {
      setMenuOpen(false);
      setSearchOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const query = term.trim();
    setSearchOpen(false);
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  return (
    <>
      <div className="relative z-50 bg-forest-deep text-gold-pale">
        <div className="container-x flex h-9 items-center gap-4 text-[11px]">
          <div className="marquee relative min-w-0 flex-1 overflow-hidden" aria-hidden={false}>
            <div className="marquee-track">
              {[...rates, ...rates].map((rate, index) => (
                <span
                  key={index}
                  style={{ paddingInlineEnd: "2.5rem" }}
                  className={index % 2 === 0 ? "whitespace-nowrap text-gold-light" : "whitespace-nowrap text-ivory/60"}
                >
                  {rate || announcement || "ارسال بیمه‌شدهٔ رایگان بالای ۳۰ میلیون تومان"}
                </span>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-forest-deep to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-forest-deep to-transparent" />
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <a href={`tel:${site.phoneHref}`} className="flex items-center gap-1.5 hover:text-white">
              <IconPhone className="size-3.5" />
              <span className="hidden sm:inline">{site.phone}</span>
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <IconWhatsapp className="size-3.5" />
              <span className="hidden md:inline">مشاوره واتس‌اپ</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-line/70 bg-ivory/90 shadow-[0_18px_40px_-32px_rgba(70,49,20,0.7)] backdrop-blur-xl"
            : "bg-ivory/60 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="منو"
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-line text-espresso transition hover:border-gold hover:text-gold-deep lg:hidden"
            >
              <IconMenu className="size-5" />
            </button>

            <Link href="/" className="group flex items-center gap-3">
              <span className="relative grid size-11 place-items-center rounded-full border border-gold/40 bg-gradient-to-br from-gold-pale to-cream">
                <span className="font-display text-lg font-semibold text-gold-deep">Z</span>
                <span className="absolute inset-0 rounded-full border border-white/60" />
              </span>
              <span className="leading-tight">
                <span className="font-display block text-xl font-semibold tracking-[0.2em] text-ink sm:text-2xl sm:tracking-[0.3em]">
                  ZARNAB
                </span>
                <span className="block text-[9px] font-medium tracking-[0.2em] text-gold-deep sm:text-[10px] sm:tracking-[0.3em]">
                  گالری طلا و جواهر
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  className={`underline-sweep text-sm font-medium transition ${
                    active ? "text-gold-deep" : "text-espresso hover:text-gold-deep"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="جستجو"
              onClick={() => setSearchOpen(true)}
              className="hidden size-10 place-items-center rounded-full border border-transparent text-espresso transition hover:border-line hover:bg-white/60 sm:grid"
            >
              <IconSearch className="size-5" />
            </button>
            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="relative grid size-10 place-items-center rounded-full border border-line bg-white/60 text-espresso transition hover:border-gold hover:text-gold-deep"
            >
              <IconCart className="size-5" />
              {count > 0 && (
                <span className="absolute -top-1 -left-1 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-white">
                  {toPersianDigits(count)}
                </span>
              )}
            </Link>
            <Link href="/contact" className="btn btn-gold hidden !px-5 !py-2.5 text-xs xl:inline-flex">
              مشاورهٔ اختصاصی
            </Link>
          </div>
        </div>
        <div className="hairline" />
      </header>

      {lastAdded && (
        <div className="fixed bottom-[5.4rem] left-1/2 z-[62] -translate-x-1/2 px-3 lg:bottom-6">
          <div className="flex items-center gap-3 rounded-full border border-gold/40 bg-forest px-5 py-3 text-sm text-gold-pale shadow-2xl">
            <IconSparkle className="size-4 text-gold-light" />
            <span>«{lastAdded}» به سبد افزوده شد</span>
            <Link href="/cart" className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">
              مشاهده سبد
            </Link>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-forest-deep/55 px-4 pt-28 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-gold/25 bg-ivory p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-ink">جستجو در گالری زرناب</p>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="بستن"
                className="grid size-9 place-items-center rounded-full border border-line hover:border-gold"
              >
                <IconClose className="size-4" />
              </button>
            </div>
            <form onSubmit={submitSearch} className="flex items-center gap-3">
              <input
                autoFocus
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="گردنبند زمرد، انگشتر الماس، نیم‌ست عروس…"
                className="field"
              />
              <button type="submit" className="btn btn-gold shrink-0 !px-5">
                جستجو
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {["گردنبند", "انگشتر الماس", "نیم‌ست عروس", "سکه", "دستبند"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    router.push(`/products?q=${encodeURIComponent(tag)}`);
                  }}
                  className="rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs text-muted transition hover:border-gold hover:text-gold-deep"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="absolute inset-0 bg-forest-deep/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-ivory p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl tracking-[0.3em] text-ink">ZARNAB</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="بستن"
                className="grid size-9 place-items-center rounded-full border border-line"
              >
                <IconClose className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="mt-6 flex items-center gap-2 rounded-2xl border border-line bg-white/70 px-4 py-3 text-xs text-muted"
            >
              <IconSearch className="size-4 text-gold-deep" />
              جستجو در گالری زرناب…
            </button>
            <nav className="mt-4 flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-espresso transition hover:bg-cream hover:text-gold-deep"
                >
                  {item.label}
                  <span className="text-gold">←</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto space-y-3 rounded-2xl border border-line bg-cream/60 p-4 text-xs text-muted">
              <p className="flex items-center gap-2">
                <IconPhone className="size-4 text-gold-deep" /> {site.phone}
              </p>
              <p>{site.hours}</p>
              <p className="leading-relaxed">{site.addressShort}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
