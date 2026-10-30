import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/data";
import { FaqAccordion } from "@/components/faq-accordion";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "پرسش‌های متداول خرید طلا",
  description:
    "پاسخ شفاف به پرسش‌های متداول دربارهٔ اصالت طلا، عیار، بازخرید، ارسال بیمه‌شده، سایزبندی و خرید عروس در گالری زرناب.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "پرسش‌های متداول زرناب", url: `${site.url}/faq` },
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  const groups = Array.from(new Set(faqs.map((faq) => faq.category)));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-line/70 bg-gradient-to-b from-cream/80 to-ivory">
        <div className="container-x py-12 lg:py-16">
          <nav aria-label="مسیر صفحه" className="text-[11px] text-muted">
            <Link href="/" className="hover:text-gold-deep">خانه</Link>
            <span className="mx-2">/</span>
            <span className="text-gold-deep">پرسش‌های متداول</span>
          </nav>
          <h1 className="mt-4 text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.35] text-ink">
            پاسخ <span className="gold-text">شفاف</span> به پرسش‌های شما
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            این پاسخ‌ها بر اساس پرتکرارترین سوالات مشتریان زرناب تنظیم شده‌اند و مبنای رسمی خدمات
            پس‌ازفروش گالری هستند.
          </p>
        </div>
      </section>

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-8">
          {groups.map((group, index) => (
            <Reveal key={group} delay={index * 60}>
              <div>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-gold-deep">
                  <span className="size-1.5 rounded-full bg-gold" />
                  {group}
                </h2>
                <FaqAccordion items={faqs.filter((faq) => faq.category === group)} />
              </div>
            </Reveal>
          ))}
        </div>

        <aside className="h-fit space-y-5 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-line bg-white/70 p-5">
            <p className="text-sm font-bold text-ink">پاسخ پرسش خود را پیدا نکردید؟</p>
            <p className="mt-2 text-xs leading-6 text-muted">
              فرم را پر کنید؛ کارشناس زرناب تا یک روز کاری پاسخ می‌دهد.
            </p>
            <div className="mt-4">
              <LeadForm source="صفحهٔ پرسش‌های متداول" />
            </div>
          </div>
          <div className="rounded-2xl bg-forest-deep p-5 text-ivory">
            <p className="text-xs font-bold text-gold-light">تماس مستقیم</p>
            <a href={`tel:${site.phoneHref}`} className="mt-2 block text-lg font-bold" dir="ltr">{site.phone}</a>
            <p className="mt-1 text-[11px] text-ivory/60">{site.hours}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
