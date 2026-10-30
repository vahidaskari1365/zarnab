import type { MetadataRoute } from "next";
import { getCategories, getPosts, getProducts } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, posts] = await Promise.all([
    getProducts({ limit: 100 }),
    getCategories(),
    getPosts(100),
  ]);

  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/products`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${site.url}/collections`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ];

  return [
    ...staticRoutes,
    ...categories.map((category) => ({
      url: `${site.url}/collections/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...products.map((product) => ({
      url: `${site.url}/products/${product.slug}`,
      lastModified: product.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: product.images.map((image) => `${site.url}${image}`),
    })),
    ...posts.map((post) => ({
      url: `${site.url}/journal/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.68,
    })),
  ];
}
