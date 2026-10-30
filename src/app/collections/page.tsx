import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { IconArrow, IconGem, IconSeal, IconSparkle } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "کالکشن‌های طلا و جواهر زرناب",
  description:
    "مرور کالکشن‌های زرناب: گردنبند، انگشتر، دستبند، گوشواره، نیم‌ست عروس و سکه و شمش؛ همه با طلای ۱۸ عیار و ضمانت اصالت.",
  alternates: { canonical: "/collections" },
  openGraph: { title: "کالکشن‌های زرناب", url: `${site.url}/collections` },
};

export default async function CollectionsIndexPage() {
  const categories = await getCategories();

  return (
    <div className="bg-gradient-to-b from-cream/60 to-ivory">
      <div className="container-x py-12 lg:py-16">
        <span className="eyebrow">کالکشن‌ها</span>
        <h1 className="mt-4 max-w-3xl text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.35] text-ink">
          زبان طراحی زرناب در <span className="gold-text">شش کالکشن</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          هر کالکشن با یک روایت مشخص و پرداخت دستی ساخته می‌شود. برای دیدن جزئیات، قطعات و راهنمای
          خرید، وارد کالکشن مورد نظر شوید.
        </p>

        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 60}>
              <Link
                href={`/collections/${category.slug}`}
                className="group block h-full overflow-hidden rounded-[1.5rem] border border-line bg-white/70 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
              >
                <div className="zoom-media relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={category.image} alt={`کالکشن ${category.name}`} className="size-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
                  <span className="absolute bottom-3 right-4 font-display text-lg tracking-[0.2em] text-gold-light">
                    {toLatin(category.slug)}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-ink">{category.name}</h2>
                    <IconArrow className="size-4 text-gold-deep transition group-hover:-translate-x-1" />
                  </div>
                  <p className="mt-1 text-[11px] text-gold-deep">{category.tagline}</p>
                  <p className="mt-2 text-xs leading-6 text-muted">{category.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { icon: IconSeal, title: "ضمانت اصالت", text: "شناسنامهٔ دیجیتال برای همهٔ قطعات" },
            { icon: IconGem, title: "سنگ شناسنامه‌دار", text: "گواهی آزمایشگاه بین‌المللی" },
            { icon: IconSparkle, title: "طراحی اختصاصی", text: "سفارش سفارشی با برآورد سه‌روزه" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 p-4">
                <span className="grid size-10 place-items-center rounded-full bg-cream text-gold-deep">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-[10px] text-muted">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function toLatin(slug: string): string {
  const map: Record<string, string> = {
    necklace: "NECKLACE",
    ring: "RING",
    bracelet: "BRACELET",
    earrings: "EARRINGS",
    set: "SET",
    bullion: "BULLION",
  };
  return map[slug] ?? "ZARNAB";
}
