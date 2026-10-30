import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { Reveal } from "@/components/reveal";
import { site, toPersianDigits } from "@/lib/site";
import { IconArrow, IconGem, IconSeal, IconShield } from "@/components/icons";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ sort?: string; q?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "کالکشن یافت نشد" };
  return {
    title: `کالکشن ${category.name} — ${category.tagline}`,
    description: `${category.description} خرید با ضمانت اصالت، فاکتور رسمی و بازخرید تضمینی از گالری زرناب.`,
    alternates: { canonical: `/collections/${category.slug}` },
    openGraph: {
      title: `کالکشن ${category.name} زرناب`,
      description: category.description,
      url: `${site.url}/collections/${category.slug}`,
      images: [{ url: category.image, alt: `کالکشن ${category.name}` }],
    },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const filters = await searchParams;
  const [category, categories] = await Promise.all([getCategoryBySlug(slug), getCategories()]);
  if (!category) notFound();
  const products = await getProducts({ category: category.slug, sort: filters.sort, q: filters.q });
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `کالکشن ${category.name}`,
    description: category.description,
    url: `${site.url}/collections/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${site.url}/products/${product.slug}`,
        name: product.name,
      })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: site.url },
      { "@type": "ListItem", position: 2, name: "کالکشن‌ها", item: `${site.url}/products` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${site.url}/collections/${category.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={category.image} alt={`کالکشن ${category.name} زرناب`} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-forest-deep/95 via-forest-deep/80 to-forest-deep/40" />
        <div className="container-x relative py-16 lg:py-24">
          <nav aria-label="مسیر صفحه" className="text-[11px] text-ivory/60">
            <Link href="/" className="hover:text-gold-light">خانه</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-gold-light">کالکشن‌ها</Link>
            <span className="mx-2">/</span>
            <span className="text-gold-light">{category.name}</span>
          </nav>
          <span className="eyebrow mt-6 !text-gold-light">{category.tagline}</span>
          <h1 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.3] text-ivory">
            کالکشن <span className="gold-text">{category.name}</span> زرناب
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-8 text-ivory/70">{category.description}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-ivory/70">
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5">
              <IconSeal className="size-3.5 text-gold-light" /> ضمانت اصالت
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5">
              <IconGem className="size-3.5 text-gold-light" /> سنگ شناسنامه‌دار
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5">
              <IconShield className="size-3.5 text-gold-light" /> بازخرید تضمینی
            </span>
          </div>
        </div>
      </section>

      <div className="container-x py-10">
        <ProductFilters
          categories={categories.map((item) => ({ slug: item.slug, name: item.name }))}
          activeCategory={category.slug}
          currentSort={filters.sort}
          currentQuery={filters.q}
          basePath="/products"
        />

        <div className="mt-5 flex items-center justify-between text-xs text-muted">
          <p>{toPersianDigits(products.length)} قطعه در این کالکشن</p>
          <Link href="/products" className="flex items-center gap-1 text-gold-deep">
            مشاهدهٔ همهٔ محصولات <IconArrow className="size-3.5" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={(index % 4) * 70} className="h-full">
              <ProductCard product={product} priority={index < 4} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 rounded-[1.75rem] border border-line bg-white/60 p-6 md:p-8">
          <h2 className="text-xl font-bold text-ink">راهنمای خرید {category.name}</h2>
          <p className="mt-3 text-sm leading-8 text-muted">
            در انتخاب {category.name}، ابتدا کاربرد قطعه را مشخص کنید: استفادهٔ روزمره به وزن سبک‌تر و
            قفل مطمئن نیاز دارد، در حالی که قطعات مجلسی می‌توانند حجم و جزئیات بیشتری داشته باشند.
            وزن طلا، عیار، اجرت ساخت و نوع سنگ، چهار مؤلفهٔ اصلی قیمت هستند. تمام قطعات این کالکشن با
            طلای ۱۸ عیار و پرداخت دستی ساخته می‌شوند و همراه فاکتور رسمی و شناسنامهٔ دیجیتال ارسال
            می‌گردند. اگر بین دو مدل تردید دارید، مشاورهٔ اختصاصی زرناب بدون هزینه است و کارشناس ما
            بر اساس بودجه و سلیقهٔ شما پیشنهاد کتبی ارائه می‌دهد.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories
              .filter((item) => item.slug !== category.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/collections/${item.slug}`}
                  className="rounded-full border border-line bg-ivory px-4 py-2 text-xs text-espresso transition hover:border-gold hover:text-gold-deep"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}
