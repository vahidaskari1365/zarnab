import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { Reveal } from "@/components/reveal";
import { site, toPersianDigits } from "@/lib/site";
import { IconArrow, IconGem, IconShield, IconTruck } from "@/components/icons";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ category?: string; sort?: string; q?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const categories = await getCategories();
  const active = categories.find((category) => category.slug === params.category);
  const title = active ? `خرید ${active.name} طلای ۱۸ عیار` : "فروشگاه طلا و جواهرات زرناب";
  const description = active
    ? `${active.description} خرید آنلاین با ضمانت اصالت، فاکتور رسمی و ارسال بیمه‌شده از گالری زرناب.`
    : "خرید آنلاین طلا و جواهرات ۱۸ عیار زرناب؛ گردنبند، انگشتر الماس، دستبند، گوشواره، نیم‌ست عروس و سکه با ضمانت اصالت و بازخرید.";
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.q) query.set("q", params.q);
  const canonical = `/products${query.size ? `?${query.toString()}` : ""}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: `${site.url}${canonical}` },
  };
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ category: params.category, sort: params.sort, q: params.q }),
  ]);
  const active = categories.find((category) => category.slug === params.category);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70 bg-gradient-to-b from-cream/80 to-ivory">
        <div className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-gold-pale/60 blur-3xl" />
        <div className="container-x relative py-12 lg:py-16">
          <nav aria-label="مسیر صفحه" className="text-[11px] text-muted">
            <Link href="/" className="hover:text-gold-deep">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-gold-deep">
              فروشگاه
            </Link>
            {active && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gold-deep">{active.name}</span>
              </>
            )}
          </nav>

          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">{active ? active.tagline : "گالری زرناب"}</span>
              <h1 className="mt-4 text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.35] text-ink">
                {active ? (
                  <>
                    {active.name} <span className="gold-text">۱۸ عیار</span>
                  </>
                ) : (
                  <>
                    همهٔ <span className="gold-text">جواهرات</span> زرناب
                  </>
                )}
              </h1>
              <p className="mt-4 text-sm leading-7 text-muted">
                {active
                  ? active.description
                  : "مجموعه‌ای کامل از طلای ۱۸ عیار و جواهرات دست‌ساز ایرانی. همهٔ قطعات دارای شناسنامهٔ اصالت، وزن دقیق و شرایط بازخرید هستند."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
              <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5">
                <IconShield className="size-3.5 text-gold-deep" /> ضمانت اصالت
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5">
                <IconTruck className="size-3.5 text-gold-deep" /> ارسال بیمه‌شده
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5">
                <IconGem className="size-3.5 text-gold-deep" /> سنگ شناسنامه‌دار
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x py-8 lg:py-10">
        <ProductFilters
          categories={categories.map((category) => ({ slug: category.slug, name: category.name }))}
          activeCategory={params.category}
          currentSort={params.sort}
          currentQuery={params.q}
        />

        <div className="mt-5 flex items-center justify-between text-xs text-muted">
          <p>
            {toPersianDigits(products.length)} قطعه یافت شد
            {params.q ? ` برای «${params.q}»` : ""}
          </p>
          <p className="hidden sm:block">قیمت‌ها بر اساس نرخ روز طلا به‌روزرسانی می‌شود.</p>
        </div>

        {products.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-line bg-white/70 p-10 text-center">
            <p className="text-lg font-bold text-ink">قطعه‌ای با این مشخصات پیدا نشد</p>
            <p className="mt-2 text-sm text-muted">
              فیلترها را تغییر دهید یا درخواست طراحی اختصاصی ثبت کنید.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/products" className="btn btn-outline text-xs">
                حذف فیلترها
              </Link>
              <Link href="/contact" className="btn btn-gold text-xs">
                درخواست طراحی اختصاصی
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 70} className="h-full">
                <ProductCard product={product} priority={index < 4} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-14 grid gap-6 rounded-[1.75rem] border border-line bg-white/60 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-9">
          <div>
            <span className="eyebrow">راهنمای انتخاب</span>
            <h2 className="mt-3 text-xl font-bold text-ink md:text-2xl">
              {active ? `چطور ${active.name} مناسب انتخاب کنیم؟` : "چطور قطعهٔ مناسب را انتخاب کنیم؟"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              وزن، عیار، اجرت ساخت و نوع سنگ، چهار عاملی هستند که قیمت نهایی و ارزش بلندمدت قطعه را
              تعیین می‌کنند. در زرناب همهٔ این موارد روی صفحهٔ محصول و فاکتور رسمی شفاف اعلام می‌شود.
              برای استفادهٔ روزمره، قطعات با وزن کمتر و قفل‌های محکم‌تر توصیه می‌شوند و برای
              سرمایه‌گذاری، سکه و شمش با اجرت پایین انتخاب منطقی‌تری است.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/collections/${category.slug}`}
                  className="rounded-full border border-line bg-ivory px-3 py-1.5 text-espresso transition hover:border-gold hover:text-gold-deep"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-cream/70 p-5">
            <p className="text-sm font-bold text-ink">دانشنامهٔ طلا</p>
            <ul className="mt-3 space-y-2.5 text-xs text-muted">
              <li>
                <Link href="/journal/rahnama-kharid-tala-18-ayar" className="flex items-center justify-between gap-2 hover:text-gold-deep">
                  راهنمای خرید طلای ۱۸ عیار <IconArrow className="size-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/journal/entekhab-angooshtar-namzadi" className="flex items-center justify-between gap-2 hover:text-gold-deep">
                  انتخاب انگشتر نامزدی <IconArrow className="size-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/journal/sarmayegozari-tala-2026" className="flex items-center justify-between gap-2 hover:text-gold-deep">
                  سرمایه‌گذاری در طلا <IconArrow className="size-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/faq" className="flex items-center justify-between gap-2 hover:text-gold-deep">
                  همهٔ پرسش‌های متداول <IconArrow className="size-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
