import Link from "next/link";
import type { Metadata } from "next";
import { getCategories, getFaqs, getPosts, getProducts, getSettings } from "@/lib/data";
import { formatToman, site, toPersianDigits, trustPoints } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Testimonials } from "@/components/testimonials";
import { FaqAccordion } from "@/components/faq-accordion";
import { SmartAdvisor } from "@/components/smart-advisor";
import { GoldTicker, Counter } from "@/components/motion-bits";
import { GOLD } from "@/lib/catalog";
import {
  IconArrow,
  IconChevron,
  IconGem,
  IconRefresh,
  IconScale,
  IconSeal,
  IconShield,
  IconSparkle,
  IconStar,
  IconTrend,
  IconTruck,
} from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "زرناب | گالری طلا و جواهرات ۱۸ عیار دست‌ساز",
  description:
    "خرید آنلاین طلای ۱۸ عیار و جواهرات دست‌ساز با ضمانت اصالت، سنگ شناسنامه‌دار و بازخرید تضمینی. کالکشن گردنبند، انگشتر، دستبند، گوشواره و نیم‌ست عروس زرناب.",
  alternates: { canonical: "/" },
};

const trustIcons = {
  seal: IconSeal,
  gem: IconGem,
  refresh: IconRefresh,
  truck: IconTruck,
};

const craftSteps = [
  {
    title: "طراحی و الهام",
    text: "هر کالکشن از یک روایت ایرانی آغاز می‌شود؛ از نقش اسلیمی تا مینیاتور، با ترسیم دیجیتال و ماکت مومی.",
  },
  {
    title: "مدل‌سازی و ریخته‌گری",
    text: "مدل سه‌بعدی با دقت ۰٫۰۵ میلی‌متر بررسی و سپس در کارگاه اختصاصی زرناب ریخته‌گری می‌شود.",
  },
  {
    title: "مخراج‌کاری سنگ",
    text: "سنگ‌های شناسنامه‌دار با مخراج‌کاری دستی و کنترل نور زیر لوپ ۱۰ برابر جای‌گذاری می‌شوند.",
  },
  {
    title: "پرداخت و کنترل کیفیت",
    text: "پرداخت آینه‌ای یا مات، مهر قطعه، آزمایش عیار و صدور شناسنامهٔ دیجیتال پیش از تحویل.",
  },
];

export default async function HomePage() {
  const [featured, categories, posts, faqs, settings, allProducts] = await Promise.all([
    getProducts({ featured: true, limit: 4 }),
    getCategories(),
    getPosts(3),
    getFaqs(),
    getSettings(),
    getProducts({ limit: 40 }),
  ]);

  const goldPrice = Number(settings.gold_price_18 || site.goldPrice18);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.slice(0, 6).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "منتخب جواهرات زرناب",
    itemListElement: allProducts.slice(0, 8).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}/products/${product.slug}`,
      name: product.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-40 size-[38rem] rounded-full bg-gold-pale/70 blur-3xl" />
          <div className="absolute -left-24 top-32 size-[28rem] rounded-full bg-[#cfe3d8]/50 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-cream/80 to-transparent" />
          <span className="firefly right-[12%] top-[18%] size-3" style={{ animationDelay: "0s" }} />
          <span className="firefly right-[38%] top-[52%] size-2" style={{ animationDelay: "2.4s" }} />
          <span className="firefly left-[14%] top-[30%] size-3.5" style={{ animationDelay: "4.2s" }} />
          <span className="firefly left-[42%] top-[12%] size-2" style={{ animationDelay: "6.1s" }} />
        </div>

        <div className="container-x relative grid items-center gap-14 pb-16 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="relative z-10">
            <div className="hero-in" style={{ animationDelay: "60ms" }}>
              <span className="eyebrow">{settings.hero_eyebrow || "کالکشن طلوع ۱۴۰۵"}</span>
            </div>

            <h1
              className="hero-in mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[1.18] text-ink"
              style={{ animationDelay: "140ms" }}
            >
              ارزش را
              <span className="relative mx-2 inline-block">
                <span className="gold-text">به ارث</span>
                <svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 right-0 h-2.5 w-full text-gold/50"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 9C50 3 150 3 198 9" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
              بگذارید
            </h1>

            <p
              className="hero-in mt-6 max-w-xl text-sm leading-8 text-muted md:text-base"
              style={{ animationDelay: "220ms" }}
            >
              {settings.hero_subtitle ||
                "طلای ۱۸ عیار و جواهرات دست‌ساز ایرانی؛ طراحی‌شده برای لحظه‌هایی که می‌مانند."}
            </p>

            <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "300ms" }}>
              <Link href="/products" className="btn btn-gold group text-sm">
                مشاهده کالکشن
                <IconArrow className="size-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <SmartAdvisor products={allProducts} />
            </div>

            <dl
              className="hero-in mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6"
              style={{ animationDelay: "380ms" }}
            >
              {[
                { label: "سال میراث زرناب", value: 28, suffix: "" },
                { label: "خرید موفق", value: 12400, suffix: "+" },
                { label: "رضایت مشتریان", value: 4.9, suffix: " از ۵", decimals: 1 },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[10px] text-muted">{stat.label}</dt>
                  <dd className="mt-1 text-xl font-extrabold text-ink md:text-2xl">
                    <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="hero-in relative" style={{ animationDelay: "180ms" }}>
              <div className="absolute -inset-3 rounded-[16rem_16rem_2rem_2rem] border border-gold/25" />
              <div className="arch sheen relative overflow-hidden bg-cream shadow-[var(--shadow-lift)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero.jpg"
                  alt="مدل زن با گردنبند و گوشوارهٔ طلای ۱۸ عیار زرناب در نور طبیعی"
                  className="kenburns h-[26rem] w-full object-cover sm:h-[34rem] lg:h-[38rem]"
                  width={900}
                  height={1200}
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/45 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 rounded-2xl border border-white/20 bg-forest-deep/55 p-4 backdrop-blur-md">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] text-gold-light">NEW COLLECTION</p>
                    <p className="mt-1 text-lg font-bold text-ivory">کالکشن مهرآرا</p>
                    <p className="text-[11px] text-ivory/60">زمرد کلمبیایی · طلای ۱۸ عیار</p>
                  </div>
                  <Link
                    href="/products/grdnbnd-mehra"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-white transition hover:bg-gold-deep"
                    aria-label="مشاهده گردنبند مهرآرا"
                  >
                    <IconArrow className="size-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="float-slow absolute -right-2 top-16 hidden w-44 rounded-2xl border border-gold/30 bg-ivory/95 p-4 shadow-xl backdrop-blur md:block">
              <div className="flex items-center gap-2 text-gold-deep">
                <IconShield className="size-5" />
                <p className="text-[11px] font-bold">شناسنامهٔ اصالت</p>
              </div>
              <p className="mt-2 text-[10px] leading-5 text-muted">
                کد یکتای قطعه، وزن و عیار، قابل استعلام آنلاین برای همیشه.
              </p>
              <div className="mt-3 flex items-center gap-1 text-gold">
                {[1, 2, 3, 4, 5].map((i) => (
                  <IconStar key={i} className="size-3" />
                ))}
              </div>
            </div>

            <div className="absolute -left-3 bottom-24 hidden w-52 rounded-2xl border border-line bg-white/95 p-4 shadow-xl md:block">
              <p className="text-[10px] text-muted">نرخ امروز طلای ۱۸ عیار</p>
              <p className="mt-1 text-sm font-extrabold text-ink">
                {formatToman(goldPrice)} <span className="text-[10px] font-medium text-muted">تومان / گرم</span>
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-l from-gold-deep to-gold-light" />
              </div>
              <p className="mt-2 flex items-center justify-between text-[10px]">
                <span className={GOLD.changeDay18 >= 0 ? "flex items-center gap-1 text-emerald-700" : "flex items-center gap-1 text-rose-600"}>
                  <IconTrend className="size-3" />
                  {GOLD.changeDay18 >= 0 ? "▲" : "▼"} {toPersianDigits(Math.abs(GOLD.changeDay18).toFixed(2))}٪ امروز
                </span>
                <span className="text-muted">{GOLD.updatedAt}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-forest-deep">
          <div className="container-x flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
            <GoldTicker
              price={goldPrice}
              coinEmami={GOLD.coinEmami}
              ounceUsd={GOLD.ounceUsd.toLocaleString("en-US")}
              change={GOLD.changeDay18}
            />
            <Link href="/collections/bullion" className="text-[11px] text-gold-light underline-offset-4 hover:underline">
              مشاهدهٔ نرخ سکه و شمش ←
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- TRUST ---------------- */}
      <section className="container-x -mt-1 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, index) => {
            const Icon = trustIcons[point.icon];
            return (
              <Reveal key={point.title} delay={index * 80}>
                <div className="group flex h-full gap-4 rounded-2xl border border-line/80 bg-white/50 p-5 transition hover:border-gold/50 hover:bg-white">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold-pale/70 text-gold-deep transition group-hover:bg-gold group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{point.title}</p>
                    <p className="mt-1.5 text-[11px] leading-6 text-muted">{point.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- CATEGORIES ---------------- */}
      <section id="collections" className="container-x py-12 lg:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="کالکشن‌ها"
            title={
              <>
                برای هر لحظه، یک <span className="gold-text">قطعهٔ درست</span>
              </>
            }
            description="از رینگ‌های روزمره تا نیم‌ست عروس؛ هر کالکشن با زبان طراحی مشخص و پرداخت دستی در کارگاه زرناب ساخته می‌شود."
            action={
              <Link href="/products" className="btn btn-outline group text-xs">
                همهٔ محصولات
                <IconArrow className="size-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const large = index === 0;
            return (
              <Reveal
                key={category.slug}
                delay={index * 70}
                direction="scale"
                className={large ? "sm:col-span-2 lg:row-span-2" : ""}
              >
                <Link
                  href={`/collections/${category.slug}`}
                  className="group relative block h-full overflow-hidden rounded-[1.5rem] border border-line/70"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image}
                    alt={`کالکشن ${category.name} زرناب`}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105 ${
                      large ? "h-72 lg:h-[27rem]" : "h-52"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] tracking-[0.25em] text-gold-light">{category.tagline}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-ivory">{category.name}</h3>
                      <span className="grid size-9 place-items-center rounded-full border border-white/30 text-ivory transition group-hover:border-gold group-hover:bg-gold">
                        <IconArrow className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- FEATURED PRODUCTS ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream/60 via-ivory to-ivory py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="منتخب گالری"
              title={
                <>
                  قطعه‌هایی که <span className="gold-text">بیشترین انتخاب</span> شده‌اند
                </>
              }
              description="هر قطعه با شناسنامهٔ اصالت، وزن دقیق و امکان بازخرید تضمینی عرضه می‌شود. موجودی به‌روز و ارسال بیمه‌شده."
              action={
                <Link href="/products" className="text-xs font-bold text-gold-deep underline-sweep">
                  مشاهدهٔ همهٔ ۱۲ قطعه
                </Link>
              }
            />
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={index * 80} className="h-full">
                <ProductCard product={product} priority={index < 2} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-gold/25 bg-white/60 p-5 md:flex-row">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-gold-pale text-gold-deep">
                  <IconGem className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">قطعهٔ دلخواهتان را پیدا نکردید؟</p>
                  <p className="text-[11px] text-muted">
                    طراحی اختصاصی با مشاورهٔ حضوری یا آنلاین، حداکثر ۳ روز کاری برای برآورد.
                  </p>
                </div>
              </div>
              <Link href="/contact?topic=سفارش%20طراحی%20اختصاصی" className="btn btn-forest text-xs">
                درخواست طراحی سفارشی
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CRAFT / STORY ---------------- */}
      <section className="container-x py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right" className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/atelier.jpg"
                alt="کارگاه دست‌ساز زرناب؛ پرداخت نهایی یک قطعهٔ طلا توسط استادکار"
                loading="lazy"
                className="h-[24rem] w-full object-cover lg:h-[30rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-forest-deep/60 p-4 text-ivory backdrop-blur">
                <p className="font-display text-lg tracking-[0.15em] text-gold-light">EVERY PIECE, A SIGNATURE</p>
                <p className="mt-1 text-[11px] text-ivory/70">
                  مهر استادکار روی هر قطعه؛ ضمانت کیفیت برای نسل‌های بعد.
                </p>
              </div>
            </div>
            <div className="absolute -left-4 -top-4 hidden rounded-2xl border border-gold/40 bg-ivory px-4 py-3 shadow-lg sm:block">
              <p className="text-[10px] text-muted">کنترل کیفیت</p>
              <p className="text-sm font-extrabold text-gold-deep">۱۰۰٪ دست‌ساز</p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">کارگاه زرناب</span>
              <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.8rem)] leading-[1.35] text-ink">
                چهار مرحله تا وقتی یک قطعه،{" "}
                <span className="gold-text">امضای شما</span> می‌شود
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                زرناب یک گالری است با کارگاه متصل؛ نه یک ویترین. همین باعث می‌شود وزن، اجرت و سنگ
                هر قطعه قابل ردیابی باشد و در صورت نیاز، سفارش اختصاصی شما با همان کیفیت ساخته شود.
              </p>
            </Reveal>

            <div className="mt-7 space-y-1">
              {craftSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 90}>
                  <div className="group flex gap-4 rounded-2xl border border-transparent p-4 transition hover:border-line hover:bg-white/60">
                    <span className="font-display text-2xl font-semibold text-gold/60 transition group-hover:text-gold">
                      {toPersianDigits(`0${index + 1}`)}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">{step.title}</p>
                      <p className="mt-1 text-[11px] leading-6 text-muted">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className="mt-6">
              <div className="grid grid-cols-3 gap-3 rounded-2xl bg-cream/70 p-4">
                {[
                  { value: 96, suffix: "٪", label: "رضایت از کیفیت پرداخت" },
                  { value: 24, suffix: " ماه", label: "گارانتی ساخت" },
                  { value: 7, suffix: " روز", label: "بازگشت بدون شرط" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-lg font-extrabold text-gold-deep">
                      <Counter value={item.value} suffix={item.suffix} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- INVESTMENT BANNER ---------------- */}
      <section className="container-x pb-16">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2rem] border border-forest/20 bg-forest-deep text-ivory">
            <div className="absolute inset-0 opacity-25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/coins.jpg" alt="" className="size-full object-cover" loading="lazy" />
            </div>
            <div className="relative grid gap-8 p-7 md:grid-cols-[1.2fr_0.8fr] md:p-12">
              <div>
                <span className="eyebrow !text-gold-light">سرمایه‌گذاری مطمئن</span>
                <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.4]">
                  طلا، دارایی‌ای که <span className="gold-text">قدمت</span> را با خود دارد
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-ivory/70">
                  سکه بهار آزادی و شمش‌های ۱ تا ۱۰ گرمی با خلوص ۹۹۵، فاکتور رسمی و امکان تحویل
                  حضوری. برای شروع، مشاورهٔ رایگان سرمایه‌گذاری زرناب را دریافت کنید.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/collections/bullion" className="btn btn-gold text-xs">
                    مشاهدهٔ سکه و شمش
                  </Link>
                  <Link
                    href="/journal/sarmayegozari-tala-2026"
                    className="btn text-xs !text-ivory border border-white/25 hover:bg-white/10"
                  >
                    راهنمای سرمایه‌گذاری
                  </Link>
                </div>
              </div>
              <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold text-gold-light">نرخ لحظه‌ای بازار طلا</p>
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] text-gold-light">
                    {GOLD.updatedAt}
                  </span>
                </div>
                {[
                  { label: "طلای ۱۸ عیار / گرم", value: GOLD.gram18 },
                  { label: "مثقال (مظنه)", value: GOLD.mesghal },
                  { label: "سکه امامی", value: GOLD.coinEmami },
                  { label: "سکه بهار آزادی", value: GOLD.coinBahar },
                  { label: "نیم‌سکه", value: GOLD.coinHalf },
                  { label: "ربع سکه", value: GOLD.coinQuarter },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-[11px] text-ivory/65">{row.label}</span>
                    <span className="text-xs font-bold text-gold-light">
                      {formatToman(row.value)} <span className="text-[9px] font-normal text-ivory/50">تومان</span>
                    </span>
                  </div>
                ))}
                <p className="text-[10px] leading-5 text-ivory/40">
                  {GOLD.source} · نرخ‌ها مرجع هستند و در لحظهٔ ثبت سفارش تایید می‌شوند. اجرت و مالیات در فاکتور شفاف است.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="container-x py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="اعتماد مشتریان"
            title={
              <>
                ۴۱۲ روایت از <span className="gold-text">خریدی مطمئن</span>
              </>
            }
            description="امتیاز ۴٫۹ از ۵ در نظرسنجی پس از خرید؛ بیشترین دلیل انتخاب زرناب، شفافیت فاکتور و اصالت قطعه است."
          />
        </Reveal>
        <div className="mt-9">
          <Testimonials />
        </div>
      </section>

      {/* ---------------- JOURNAL ---------------- */}
      <section className="container-x pb-16">
        <Reveal>
          <SectionHeading
            eyebrow="دانشنامه طلا"
            title={
              <>
                خریدی آگاهانه، با <span className="gold-text">دانش درست</span>
              </>
            }
            description="راهنماهای تخصصی زرناب دربارهٔ عیار، اجرت، انتخاب الماس و نگهداری جواهرات؛ نوشته‌شده توسط زرگران و کارشناسان گالری."
            action={
              <Link href="/journal" className="btn btn-outline text-xs">
                همهٔ مقالات
              </Link>
            }
          />
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 90} className="h-full">
              <Link
                href={`/journal/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white/60 transition hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl"
              >
                <div className="zoom-media relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.cover} alt={post.title} loading="lazy" className="size-full object-cover" />
                  <span className="absolute right-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-[10px] font-bold text-gold-deep backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] text-muted">
                    {toPersianDigits(post.readMinutes)} دقیقه مطالعه
                  </p>
                  <h3 className="mt-2 text-base font-bold leading-7 text-ink transition group-hover:text-gold-deep">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted">{post.excerpt}</p>
                  <span className="mt-auto flex items-center gap-1 pt-4 text-[11px] font-bold text-gold-deep">
                    مطالعهٔ مقاله
                    <IconArrow className="size-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- FAQ + CTA ---------------- */}
      <section className="container-x pb-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <span className="eyebrow">پرسش‌های متداول</span>
            <h2 className="mt-4 text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.4] text-ink">
              هر چیزی که پیش از خرید باید بدانید
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              پاسخ‌های شفاف دربارهٔ اصالت، ارسال، بازخرید و سایزبندی. اگر پاسخ پرسش شما اینجا نبود،
              کمتر از یک روز کاری پاسخ می‌دهیم.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-center gap-2 text-espresso">
                <IconScale className="size-4 text-gold-deep" /> وزن و عیار روی فاکتور رسمی
              </p>
              <p className="flex items-center gap-2 text-espresso">
                <IconSeal className="size-4 text-gold-deep" /> شناسنامهٔ اصالت برای هر قطعه
              </p>
              <p className="flex items-center gap-2 text-espresso">
                <IconTruck className="size-4 text-gold-deep" /> ارسال بیمه‌شده تا درِ خانه
              </p>
            </div>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-gold-deep underline-sweep">
              مشاهدهٔ همهٔ پرسش‌ها
              <IconChevron className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <FaqAccordion items={faqs.slice(0, 6)} />
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/campaign.jpg"
              alt="مشاورهٔ اختصاصی خرید جواهرات در گالری زرناب"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-forest-deep/95 via-forest-deep/80 to-forest-deep/30" />
            <div className="relative max-w-2xl p-7 md:p-12">
              <span className="eyebrow !text-gold-light">مشاورهٔ اختصاصی</span>
              <h2 className="mt-4 text-[clamp(1.7rem,3.8vw,2.6rem)] leading-[1.4] text-ivory">
                انتخاب درست، با راهنمایی کسانی که طلا را می‌شناسند
              </h2>
              <p className="mt-4 text-sm leading-7 text-ivory/70">
                یک جلسهٔ ۳۰ دقیقه‌ای، حضوری یا آنلاین؛ بر اساس بودجه، سلیقه و مناسبت شما. بدون اصرار
                به خرید و با پیشنهاد کتبی گزینه‌ها.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-gold text-xs">
                  رزرو مشاورهٔ رایگان
                </Link>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="btn border border-white/25 text-xs !text-ivory hover:bg-white/10"
                >
                  تماس با گالری {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
