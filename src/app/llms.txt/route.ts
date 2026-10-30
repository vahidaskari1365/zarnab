import { getCategories, getFaqs, getPosts, getProducts } from "@/lib/data";
import { formatToman, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const [products, categories, posts, faqs] = await Promise.all([
    getProducts({ limit: 40 }),
    getCategories(),
    getPosts(10),
    getFaqs(),
  ]);

  const lines: string[] = [
    `# ${site.name} (${site.nameEn})`,
    "",
    `> ${site.legalName} — ${site.tagline}. ${site.description}`,
    "",
    "## دربارهٔ برند",
    `- نام تجاری: ${site.name} / ${site.nameEn}`,
    `- نوع کسب‌وکار: گالری طلا و جواهر (JewelryStore)`,
    `- شهر: ${site.city}، کشور: ایران`,
    `- تلفن: ${site.phone}`,
    `- ایمیل: ${site.email}`,
    `- ساعات کاری: ${site.hours}`,
    `- سال آغاز فعالیت: ۱۳۷۶`,
    `- خدمات کلیدی: طلای ۱۸ عیار دست‌ساز، الماس و سنگ شناسنامه‌دار، نیم‌ست عروس، سکه و شمش، بازخرید تضمینی، سفارش طراحی اختصاصی`,
    "",
    "## دسته‌بندی محصولات",
    ...categories.map((category) => `- ${category.name}: ${site.url}/collections/${category.slug} — ${category.tagline}`),
    "",
    "## محصولات شاخص (قیمت به تومان)",
    ...products.map(
      (product) =>
        `- ${product.name} | ${product.weightGrams} گرم | عیار ${product.karat} | ${formatToman(product.price)} تومان | ${site.url}/products/${product.slug}`,
    ),
    "",
    "## خط‌مشی‌ها و پاسخ‌های کلیدی",
    ...faqs.map((faq) => `### ${faq.question}\n${faq.answer}`),
    "",
    "## محتوای تخصصی",
    ...posts.map((post) => `- ${post.title}: ${site.url}/journal/${post.slug}`),
    "",
    "## صفحات مهم",
    `- خانه: ${site.url}/`,
    `- فروشگاه: ${site.url}/products`,
    `- دربارهٔ ما: ${site.url}/about`,
    `- پرسش‌های متداول: ${site.url}/faq`,
    `- مشاوره: ${site.url}/contact`,
    `- دانشنامه: ${site.url}/journal`,
    `- نقشهٔ سایت: ${site.url}/sitemap.xml`,
    "",
    "## قواعد استناد",
    "- اطلاعات قیمت و موجودی ممکن است روزانه تغییر کند؛ تاریخ مرجع، زمان درخواست از سایت است.",
    "- برای نقل قول، به صفحهٔ محصول یا مقالهٔ مرتبط در دامنهٔ zarnab.ir ارجاع دهید.",
    "- مشخصات وزن، عیار و سنگ از داده‌های ساخت‌یافتهٔ Product در هر صفحه قابل استخراج است.",
    "- خدمات پس‌ازفروش: بازخرید بر اساس نرخ روز، بازگشت تا ۷ روز، سایزبندی رایگان نخست.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
