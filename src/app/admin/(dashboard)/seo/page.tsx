import { getFaqs, getKeywords, getProducts, getSettings } from "@/lib/data";
import { faNumber } from "@/lib/admin-ui";
import { createFaqAction, deleteFaqAction, saveKeywordAction, saveSeoAction } from "../../actions";
import { IconBrain, IconCheck, IconSparkle, IconTrend } from "@/components/icons";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ saved?: string }>;

const intentLabels: Record<string, string> = {
  commercial: "تجاری",
  transactional: "خرید",
  informational: "اطلاعاتی",
  local: "محلی",
};

export default async function AdminSeoPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [settings, keywords, faqs, products] = await Promise.all([
    getSettings(),
    getKeywords(),
    getFaqs(),
    getProducts({ limit: 100 }),
  ]);

  const technical = [
    { label: "sitemap.xml پویا شامل محصولات، کالکشن‌ها و مقالات", href: "/sitemap.xml", ok: true },
    { label: "robots.txt با دسترسی صریح به موتورهای AI", href: "/robots.txt", ok: true },
    { label: "llms.txt برای بازیابی برند در پاسخ‌های هوش مصنوعی", href: "/llms.txt", ok: true },
    { label: "فید RSS دانشنامه برای اکتشاف سریع محتوا", href: "/feed.xml", ok: true },
    { label: "داده‌های ساخت‌یافتهٔ Product، Offer، FAQ و Breadcrumb", href: "/products", ok: true },
    { label: "کانونیکال و متادیتای یکتا برای هر صفحه", href: "/products", ok: true },
    { label: "صفحات اصلاح‌شده برای Core Web Vitals و بارگذاری تصاویر", href: "/", ok: true },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-gold-deep">SEO / AEO / GEO</p>
          <h1 className="mt-2 text-2xl font-extrabold text-ink">داشبورد دیده‌شدن و هوش مصنوعی</h1>
          <p className="mt-1 text-xs text-muted">
            پایش رتبهٔ کلمات کلیدی، استناد در موتورهای پاسخ‌گو و سلامت فنی سایت.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <a href="/sitemap.xml" target="_blank" className="rounded-full border border-line bg-white px-3 py-2 text-gold-deep">نقشهٔ سایت</a>
          <a href="/llms.txt" target="_blank" className="rounded-full border border-line bg-white px-3 py-2 text-gold-deep">llms.txt</a>
          <a href="/robots.txt" target="_blank" className="rounded-full border border-line bg-white px-3 py-2 text-gold-deep">robots.txt</a>
        </div>
      </div>

      {params.saved && (
        <p className="rounded-xl border border-gold/40 bg-gold-pale/60 p-3 text-xs text-gold-deep">
          {params.saved === "demo"
            ? "حالت نمایشی: ذخیرهٔ دائمی تنظیمات غیرفعال است."
            : "تنظیمات سئو و محتوای صفحهٔ اصلی ذخیره شد."}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "امتیاز دیده‌شدن در AI", value: `${faNumber(Number(settings.ai_visibility_score || 87))}/۱۰۰` },
          { label: "پوشش داده ساخت‌یافته", value: `${faNumber(Number(settings.schema_coverage || 96))}٪` },
          { label: "عملکرد Core Web Vitals", value: `${faNumber(Number(settings.core_web_vitals || 94))}٪` },
        ].map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-line bg-forest-deep p-4 text-ivory">
            <p className="flex items-center gap-1.5 text-[10px] text-ivory/60">
              <IconBrain className="size-3.5 text-gold-light" /> {metric.label}
            </p>
            <p className="mt-2 text-xl font-extrabold text-gold-light">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-line bg-white/85 p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
            <IconTrend className="size-4 text-gold-deep" /> رتبهٔ کلمات کلیدی و Citation
          </h2>
          <p className="mt-1 text-[10px] text-muted">
            رتبه و تعداد استناد در ChatGPT، Gemini و Perplexity را به‌روز نگه دارید.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[38rem] text-right text-xs">
              <thead className="text-[10px] text-muted">
                <tr className="border-b border-line">
                  <th className="pb-2 font-medium">کلمهٔ کلیدی</th>
                  <th className="pb-2 font-medium">نیت</th>
                  <th className="pb-2 font-medium">حجم</th>
                  <th className="pb-2 font-medium">رتبه</th>
                  <th className="pb-2 font-medium">تغییر</th>
                  <th className="pb-2 font-medium">Citation</th>
                  <th className="pb-2 font-medium">ذخیره</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((keyword) => {
                  const delta = keyword.previousPosition - keyword.position;
                  return (
                    <tr key={keyword.id} className="border-b border-line/50 last:border-0">
                      <td className="py-2.5">
                        <p className="font-bold text-ink">{keyword.keyword}</p>
                        <p className="text-[9px] text-muted" dir="ltr">{keyword.landingPage}</p>
                      </td>
                      <td className="py-2.5 text-[10px] text-muted">{intentLabels[keyword.intent] ?? keyword.intent}</td>
                      <td className="py-2.5 text-[10px] text-muted">{faNumber(keyword.volume)}</td>
                      <td colSpan={4} className="py-2.5">
                        <form action={saveKeywordAction} className="flex items-center gap-1.5">
                          <input type="hidden" name="id" value={keyword.id} />
                          <input name="position" type="number" min={1} max={100} defaultValue={keyword.position} className="field !w-14 !px-2 !py-1 !text-[11px]" dir="ltr" />
                          <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${delta >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                            {delta >= 0 ? "▲" : "▼"} {faNumber(Math.abs(delta))}
                          </span>
                          <input name="aiCitations" type="number" min={0} defaultValue={keyword.aiCitations} className="field !w-16 !px-2 !py-1 !text-[11px]" dir="ltr" title="Citation در موتورهای AI" />
                          <button type="submit" className="rounded-full bg-forest px-2 py-1 text-[9px] text-ivory">ثبت</button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white/85 p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
            <IconCheck className="size-4 text-gold-deep" /> چک‌لیست فنی
          </h2>
          <ul className="mt-3 space-y-2 text-[11px]">
            {technical.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" className="flex items-start gap-2 rounded-xl bg-cream/50 p-2.5 text-muted hover:text-gold-deep">
                  <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                    <IconCheck className="size-2.5" />
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 rounded-xl border border-dashed border-gold/40 bg-gold-pale/30 p-3 text-[10px] leading-5 text-muted">
            {faNumber(products.length)} صفحهٔ محصول و {faNumber(keywords.length)} کلمهٔ هدف، در حال پایش هستند.
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <form action={saveSeoAction} className="rounded-2xl border border-line bg-white/85 p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
            <IconSparkle className="size-4 text-gold-deep" /> تنظیمات متادیتا و صفحهٔ اصلی
          </h2>
          <div className="mt-4 space-y-3">
            <div>
              <label className="field-label" htmlFor="seo_title">عنوان سئو (Title)</label>
              <input id="seo_title" name="seo_title" defaultValue={settings.seo_title} className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="seo_description">توضیح متا (Description)</label>
              <textarea id="seo_description" name="seo_description" rows={2} defaultValue={settings.seo_description} className="field resize-none" />
            </div>
            <div>
              <label className="field-label" htmlFor="announcement">متن نوار اطلاع‌رسانی</label>
              <input id="announcement" name="announcement" defaultValue={settings.announcement} className="field" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="gold_price_18">نرخ طلای ۱۸ عیار (تومان/گرم)</label>
                <input id="gold_price_18" name="gold_price_18" type="number" defaultValue={settings.gold_price_18} className="field" dir="ltr" />
              </div>
              <div>
                <label className="field-label" htmlFor="ai_visibility_score">امتیاز AI Visibility</label>
                <input id="ai_visibility_score" name="ai_visibility_score" type="number" min={0} max={100} defaultValue={settings.ai_visibility_score} className="field" dir="ltr" />
              </div>
              <div>
                <label className="field-label" htmlFor="schema_coverage">پوشش داده ساخت‌یافته (٪)</label>
                <input id="schema_coverage" name="schema_coverage" type="number" min={0} max={100} defaultValue={settings.schema_coverage} className="field" dir="ltr" />
              </div>
              <div>
                <label className="field-label" htmlFor="core_web_vitals">امتیاز Core Web Vitals</label>
                <input id="core_web_vitals" name="core_web_vitals" type="number" min={0} max={100} defaultValue={settings.core_web_vitals} className="field" dir="ltr" />
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor="hero_eyebrow">ایبرو هیرو</label>
              <input id="hero_eyebrow" name="hero_eyebrow" defaultValue={settings.hero_eyebrow} className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="hero_subtitle">توضیح هیرو</label>
              <textarea id="hero_subtitle" name="hero_subtitle" rows={2} defaultValue={settings.hero_subtitle} className="field resize-none" />
            </div>
            <input type="hidden" name="hero_title" value={settings.hero_title ?? ""} />
          </div>
          <button type="submit" className="btn btn-gold mt-4 w-full text-xs">ذخیرهٔ تنظیمات</button>
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-white/85 p-5">
            <h2 className="text-sm font-bold text-ink">مدیریت پرسش‌های متداول (AEO)</h2>
            <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
              {faqs.map((faq) => (
                <div key={faq.id} className="flex items-start justify-between gap-2 rounded-xl bg-cream/50 p-2.5">
                  <div>
                    <p className="text-[11px] font-bold text-ink">{faq.question}</p>
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-5 text-muted">{faq.answer}</p>
                  </div>
                  <form action={deleteFaqAction}>
                    <input type="hidden" name="id" value={faq.id} />
                    <button type="submit" className="rounded-full border border-rose-200 px-2 py-1 text-[9px] text-rose-700">حذف</button>
                  </form>
                </div>
              ))}
            </div>
            <form action={createFaqAction} className="mt-3 space-y-2">
              <input name="question" required placeholder="پرسش جدید" className="field !py-2 text-xs" />
              <textarea name="answer" required rows={2} placeholder="پاسخ کوتاه و مستند" className="field resize-none text-xs" />
              <div className="flex gap-2">
                <input name="category" placeholder="دسته (مثلاً ارسال)" className="field !py-2 text-xs" />
                <button type="submit" className="btn btn-gold shrink-0 !px-4 !py-2 text-[11px]">افزودن</button>
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-line bg-gold-pale/40 p-5">
            <p className="text-sm font-bold text-ink">راهنمای سریع GEO</p>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-6 text-muted">
              <li>· پاسخ‌ها را کوتاه، عددی و قابل نقل‌قول بنویسید.</li>
              <li>· در هر مقاله، منبع و تاریخ به‌روزرسانی ذکر شود.</li>
              <li>· نام برند + ویژگی متمایز (ضمانت اصالت، بازخرید) در متن تکرار شود.</li>
              <li>· از llms.txt و فید RSS برای اکتشاف سریع‌تر استفاده کنید.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
