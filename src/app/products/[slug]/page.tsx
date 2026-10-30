import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategories,
  getProductBySlug,
  getRelatedProducts,
  getSettings,
} from "@/lib/data";
import { discountPercent, formatToman, site, toPersianDigits } from "@/lib/site";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCartBar, AddToCartButton } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import {
  IconArrow,
  IconGem,
  IconRefresh,
  IconScale,
  IconSeal,
  IconShield,
  IconStar,
  IconTruck,
} from "@/components/icons";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  const title = `${product.name} — ${product.subtitle}`;
  const description = `${product.description.slice(0, 150)} قیمت ${formatToman(product.price)} تومان، وزن ${product.weightGrams} گرم، عیار ${product.karat}. خرید با ضمانت اصالت از زرناب.`;
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${site.url}/products/${product.slug}`,
      images: [{ url: product.images[0] ?? "/images/necklace.jpg", alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [product, categories, settings] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
    getSettings(),
  ]);

  if (!product) notFound();

  const related = await getRelatedProducts(product.categorySlug, product.slug);
  const category = categories.find((item) => item.slug === product.categorySlug);
  const goldPrice = Number(settings.gold_price_18 || site.goldPrice18);
  const goldValue = product.weightGrams * goldPrice;
  const makingCost = Math.max(0, product.price - goldValue);
  const discount = discountPercent(product.price, product.compareAtPrice);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((image) => `${site.url}${image}`),
    description: product.description,
    sku: `ZR-${product.id.toString().padStart(4, "0")}`,
    mpn: product.slug,
    brand: { "@type": "Brand", name: site.nameEn },
    material: `طلای ${product.karat} عیار`,
    category: category?.name ?? "جواهرات",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (product.ratingX10 / 10).toFixed(1),
      reviewCount: product.reviewCount,
      bestRating: "5",
    },
    offers: {
      "@type": "Offer",
      url: `${site.url}/products/${product.slug}`,
      priceCurrency: "IRR",
      price: product.price * 10,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.legalName },
      priceValidUntil: "2027-03-20",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: site.url },
      { "@type": "ListItem", position: 2, name: "فروشگاه", item: `${site.url}/products` },
      {
        "@type": "ListItem",
        position: 3,
        name: category?.name ?? "جواهرات",
        item: `${site.url}/collections/${product.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `${site.url}/products/${product.slug}`,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-cream/50 to-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container-x py-8 lg:py-12">
        <nav aria-label="مسیر صفحه" className="text-[11px] text-muted">
          <Link href="/" className="hover:text-gold-deep">خانه</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-gold-deep">فروشگاه</Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${product.categorySlug}`} className="hover:text-gold-deep">
            {category?.name ?? "جواهرات"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold-deep">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <ProductGallery images={product.images} name={product.name} badge={product.badge} />

          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              {product.badge && (
                <span className="rounded-full bg-gold-pale px-3 py-1 font-bold text-gold-deep">
                  {product.badge}
                </span>
              )}
              <span className="rounded-full border border-line bg-white/70 px-3 py-1 text-muted">
                {category?.name}
              </span>
              <span className="flex items-center gap-1 rounded-full border border-line bg-white/70 px-3 py-1 text-muted">
                <IconStar className="size-3 text-gold" />
                {new Intl.NumberFormat("fa-IR", { minimumFractionDigits: 1 }).format(product.ratingX10 / 10)}
                <span className="text-[10px]">({toPersianDigits(product.reviewCount)} نظر)</span>
              </span>
            </div>

            <h1 className="mt-4 text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.35] text-ink">{product.name}</h1>
            <p className="mt-2 text-sm text-muted">{product.subtitle}</p>

            <div className="mt-5 flex flex-wrap items-end gap-3 border-y border-line py-5">
              <span className="text-2xl font-extrabold text-ink">
                {formatToman(product.price)}
                <span className="ms-1 text-xs font-medium text-muted">تومان</span>
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-sm text-muted line-through">{formatToman(product.compareAtPrice)}</span>
                  <span className="rounded-full bg-wine/10 px-2.5 py-1 text-[10px] font-bold text-wine">
                    {toPersianDigits(discount)}٪ تخفیف کالکشن
                  </span>
                </>
              )}
              <span className="ms-auto text-[10px] text-muted">
                نرخ مرجع طلا: {formatToman(goldPrice)} تومان/گرم
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: IconScale, label: "وزن", value: `${toPersianDigits(product.weightGrams)} گرم` },
                { icon: IconGem, label: "عیار", value: `${toPersianDigits(product.karat)} عیار` },
                { icon: IconSeal, label: "سنگ", value: product.stone || "—" },
                { icon: IconShield, label: "کد قطعه", value: `ZR-${toPersianDigits(product.id.toString().padStart(4, "0"))}` },
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.label} className="rounded-xl border border-line bg-white/60 p-3">
                    <dt className="flex items-center gap-1.5 text-[10px] text-muted">
                      <Icon className="size-3.5 text-gold" /> {spec.label}
                    </dt>
                    <dd className="mt-1 truncate text-[11px] font-bold text-ink" title={spec.value}>
                      {spec.value}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <p className="mt-5 text-sm leading-7 text-muted">{product.description}</p>

            <ul className="mt-4 grid gap-2 text-xs text-espresso sm:grid-cols-2">
              {[
                "شناسنامهٔ اصالت و فاکتور رسمی",
                "ارسال بیمه‌شده و بسته‌بندی هدیه",
                "بازخرید تضمینی با کارمزد شفاف",
                product.karat === "24" ? "ضمانت خلوص ۹۹۵" : "۲۴ ماه گارانتی ساخت",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <IconSeal className="size-4 shrink-0 text-gold-deep" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-line bg-white/70 p-4">
              <AddToCartBar
                stock={product.stock}
                item={{
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.images[0] ?? "/images/necklace.jpg",
                  weightGrams: product.weightGrams,
                }}
              />
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted">
                <span className="flex items-center gap-1"><IconTruck className="size-3.5 text-gold-deep" /> ارسال رایگان بالای ۳۰ میلیون</span>
                <span className="flex items-center gap-1"><IconRefresh className="size-3.5 text-gold-deep" /> ۷ روز بازگشت</span>
                <span className="flex items-center gap-1"><IconShield className="size-3.5 text-gold-deep" /> پرداخت امن</span>
              </p>
            </div>

            <details className="mt-4 rounded-2xl border border-line bg-white/60 p-4" open>
              <summary className="cursor-pointer text-sm font-bold text-ink">جزئیات قیمت و اجرت</summary>
              <div className="mt-3 space-y-2 text-xs text-muted">
                <div className="flex justify-between">
                  <span>ارزش طلا ({toPersianDigits(product.weightGrams)} گرم × نرخ روز)</span>
                  <span className="font-bold text-ink">{formatToman(goldValue)} تومان</span>
                </div>
                <div className="flex justify-between">
                  <span>اجرت ساخت و پرداخت دستی (تقریبی)</span>
                  <span className="font-bold text-ink">{formatToman(makingCost)} تومان</span>
                </div>
                <p className="border-t border-line pt-2 text-[10px] leading-5">
                  مبالغ اجرت بر اساس پیچیدگی طراحی محاسبه می‌شود و در فاکتور نهایی به تفکیک درج می‌گردد.
                </p>
              </div>
            </details>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="rounded-[1.75rem] border border-line bg-white/70 p-6 md:p-8">
            <span className="eyebrow">روایت قطعه</span>
            <h2 className="mt-3 text-xl font-bold text-ink md:text-2xl">داستان {product.name}</h2>
            <p className="mt-3 text-sm leading-8 text-muted">{product.story}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { title: "ساخت", value: "کارگاه زرناب" },
                { title: "پرداخت", value: "دستی، کنترل کیفیت" },
                { title: "تحویل", value: "۲ تا ۴ روز کاری" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl bg-cream/70 p-3">
                  <p className="text-[10px] text-muted">{item.title}</p>
                  <p className="mt-1 text-xs font-bold text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80} className="rounded-[1.75rem] border border-gold/25 bg-gold-pale/40 p-6 md:p-8">
            <p className="text-sm font-bold text-ink">مشاوره پیش از خرید</p>
            <p className="mt-2 text-xs leading-6 text-muted">
              وزن مناسب، سایز و نوع قفل را با کارشناس زرناب بررسی کنید. پاسخ کمتر از یک روز کاری.
            </p>
            <div className="mt-4 space-y-2">
              <AddToCartButton
                variant="outline"
                label="افزودن به سبد و ادامهٔ خرید"
                item={{
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.images[0] ?? "/images/necklace.jpg",
                  weightGrams: product.weightGrams,
                }}
              />
              <Link href="/contact" className="btn btn-gold w-full text-xs">
                مشاورهٔ اختصاصی خرید
              </Link>
              <a href={`tel:${site.phoneHref}`} className="flex items-center justify-center gap-2 pt-2 text-xs text-gold-deep">
                تماس با گالری: {site.phone}
              </a>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <div className="flex items-end justify-between">
              <div>
                <span className="eyebrow">هم‌خانواده</span>
                <h2 className="mt-2 text-xl font-bold text-ink md:text-2xl">پیشنهادهای مشابه</h2>
              </div>
              <Link href={`/collections/${product.categorySlug}`} className="flex items-center gap-1 text-xs font-bold text-gold-deep">
                همهٔ {category?.name}
                <IconArrow className="size-4" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
