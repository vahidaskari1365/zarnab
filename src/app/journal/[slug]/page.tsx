import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { site, toPersianDigits } from "@/lib/site";
import { IconArrow, IconClock, IconSeal } from "@/components/icons";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "مقاله یافت نشد" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/journal/${post.slug}`,
      images: [{ url: post.cover, alt: post.title }],
    },
  };
}

export default async function JournalPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const [others, products] = await Promise.all([getPosts(4), getProducts({ featured: true, limit: 4 })]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.cover}`,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.publishedAt.toISOString(),
    inLanguage: "fa-IR",
    author: { "@type": "Organization", name: site.legalName, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/journal/${post.slug}` },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: site.url },
      { "@type": "ListItem", position: 2, name: "دانشنامه طلا", item: `${site.url}/journal` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/journal/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article>
        <header className="border-b border-line/70 bg-gradient-to-b from-cream/70 to-ivory">
          <div className="container-x py-10 lg:py-14">
            <nav aria-label="مسیر صفحه" className="text-[11px] text-muted">
              <Link href="/" className="hover:text-gold-deep">خانه</Link>
              <span className="mx-2">/</span>
              <Link href="/journal" className="hover:text-gold-deep">دانشنامه طلا</Link>
              <span className="mx-2">/</span>
              <span className="text-gold-deep">{post.category}</span>
            </nav>
            <h1 className="mt-4 max-w-3xl text-[clamp(1.7rem,4vw,2.75rem)] leading-[1.45] text-ink">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{post.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <IconSeal className="size-4 text-gold-deep" /> تیم محتوای زرناب
              </span>
              <span className="flex items-center gap-1.5">
                <IconClock className="size-4" /> {toPersianDigits(post.readMinutes)} دقیقه مطالعه
              </span>
              <span>
                {new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "long", day: "numeric" }).format(post.publishedAt)}
              </span>
            </div>
          </div>
        </header>

        <div className="container-x grid gap-10 py-10 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="overflow-hidden rounded-[1.75rem] border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt={post.title} className="h-64 w-full object-cover md:h-96" />
            </div>

            <div
              className="mt-8 space-y-4 text-sm leading-8 text-espresso [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-ink [&_li]:mb-2 [&_p]:leading-8 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pr-5"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line bg-white/60 px-3 py-1.5 text-[11px] text-muted">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-gold/30 bg-gold-pale/40 p-6">
              <p className="text-sm font-bold text-ink">سوالی دربارهٔ این موضوع دارید؟</p>
              <p className="mt-2 text-xs leading-6 text-muted">
                کارشناسان زرناب می‌توانند بر اساس بودجه و سلیقهٔ شما، گزینه‌های مناسب را معرفی کنند.
                مشاوره تلفنی و حضوری رایگان است.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/contact" className="btn btn-gold !px-4 !py-2 text-[11px]">درخواست مشاوره</Link>
                <a href={`tel:${site.phoneHref}`} className="btn btn-outline !px-4 !py-2 text-[11px]">
                  {site.phone}
                </a>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-line bg-white/70 p-5">
              <p className="text-xs font-bold text-ink">مقالات مرتبط</p>
              <ul className="mt-3 space-y-3 text-[11px] leading-5 text-muted">
                {others
                  .filter((item) => item.slug !== post.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <li key={item.id}>
                      <Link href={`/journal/${item.slug}`} className="flex items-start gap-2 hover:text-gold-deep">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.cover} alt="" className="size-12 shrink-0 rounded-lg object-cover" />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-forest-deep p-5">
              <p className="text-xs font-bold text-gold-light">خبرنامهٔ زرناب</p>
              <p className="mt-1 text-[10px] leading-5 text-ivory/60">
                تحلیل هفتگی بازار طلا و معرفی کالکشن‌های تازه.
              </p>
              <div className="mt-3">
                <NewsletterForm compact />
              </div>
            </div>
            <Link href="/products" className="flex items-center justify-between rounded-2xl border border-line bg-white/70 p-4 text-xs font-bold text-gold-deep">
              مشاهدهٔ فروشگاه
              <IconArrow className="size-4" />
            </Link>
          </aside>
        </div>

        <div className="container-x pb-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold text-ink">قطعه‌های پیشنهادی زرناب</h2>
            <Link href="/products" className="text-xs text-gold-deep">همهٔ محصولات</Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
