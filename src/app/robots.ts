import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-Web",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Bingbot",
    "Googlebot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/cart", "/offline"],
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: ["/", "/llms.txt", "/journal", "/products", "/about", "/faq"],
        disallow: ["/admin", "/api/", "/cart", "/offline"],
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
