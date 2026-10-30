import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getProducts } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { site, toPersianDigits } from "@/lib/site";
import { IconArrow, IconClock } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "دانشنامهٔ طلا و جواهرات",
  description:
    "راهنمای تخصصی خرید طلای ۱۸ عیار، انتخاب الماس، محاسبه اجرت، نگهداری جواهرات و سرمایه‌گذاری در طلا؛ نوشتهٔ کارشناسان گالری زرناب.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "دانشنامهٔ طلا و جواهرات زرناب",
    description: "آموزش خرید، نگهداری و سرمایه‌گذاری طلا با زبان ساده و مستند.",
    url: `${site.url}/journal`,
  },
};

export default async function JournalPage() {
  const [posts, products] = await Promise.all([getPosts(12), getProducts({ featured: true, limit: 4 })]);
  const [featured, ...rest] = posts;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "دانشنامهٔ طلا و جواهرات زرناب",
    url: `${site.url}/journal`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${site.url}/journal/${post.slug}`,
      description: post.excerpt,
      datePublished: post.publishedAt.toISOString(),
      author: { "@type": "Organization", name: site.legalName },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-line/70 bg-gradient-to-b from-cream/80 to-ivory">
        <div className="container-x py-12 lg:py-16">
          <span className="eyebrow">دانشنامهٔ زرناب</span>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.35] text-ink">
            دانش طلا؛ <span className="gold-text">سرمایهٔ خریدِ درست</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            هر مقاله بر اساس پرسش‌های واقعی مشتریان زرناب نوشته شده و توسط کارشناسان گالری بازبینی
            می‌شود. هدف ما این است که پیش از خرید، دقیقاً بدانید چه چیزی می‌خرید.
          </p>
        </div>
      </section>

      <div className="container-x py-10">
        {featured && (
          <Reveal>
            <Link
              href={`/journal/${featured.slug}`}
              className="group grid overflow-hidden rounded-[1.75rem] border border-line bg-white/70 md:grid-cols-2"
            >
              <div className="zoom-media relative h-64 overflow-hidden md:h-full md:min-h-[22rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.cover} alt={featured.title} className="size-full object-cover" />
                <span className="absolute right-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[10px] font-bold text-gold-deep">
                  مقالهٔ ویژه
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-9">
                <span className="text-[11px] font-bold text-gold-deep">{featured.category}</span>
                <h2 className="mt-3 text-xl font-extrabold leading-8 text-ink md:text-2xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <IconClock className="size-3.5" /> {toPersianDigits(featured.readMinutes)} دقیقه مطالعه
                  </span>
                  <span className="flex items-center gap-1 font-bold text-gold-deep">
                    مطالعهٔ کامل <IconArrow className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post.id} delay={index * 80}>
              <Link
                href={`/journal/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white/60 transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
              >
                <div className="zoom-media relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.cover} alt={post.title} loading="lazy" className="size-full object-cover" />
                  <span className="absolute right-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-[10px] font-bold text-gold-deep">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-base font-bold leading-7 text-ink transition group-hover:text-gold-deep">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted">{post.excerpt}</p>
                  <span className="mt-auto pt-4 text-[11px] text-muted">
                    {toPersianDigits(post.readMinutes)} دقیقه مطالعه
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <span className="eyebrow">پیشنهاد مطالعه</span>
              <h2 className="mt-2 text-xl font-bold text-ink">قطعه‌های منتخب این هفته</h2>
            </div>
            <Link href="/products" className="text-xs font-bold text-gold-deep">
              فروشگاه زرناب
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={`${product.id}-journal`} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
