import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { IconClock, IconMail, IconPhone, IconPin, IconShield, IconWhatsapp } from "@/components/icons";

export const metadata: Metadata = {
  title: "مشاورهٔ اختصاصی خرید طلا و جواهر",
  description:
    "رزرو مشاورهٔ اختصاصی خرید طلا با کارشناسان گالری زرناب؛ حضوری یا آنلاین، بر اساس بودجه و مناسبت شما. تماس: ۰۲۱-۹۱۰۰۸۸۴۲.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "مشاورهٔ اختصاصی زرناب", url: `${site.url}/contact` },
};

type SearchParams = Promise<{ topic?: string }>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const { topic } = await searchParams;

  return (
    <div className="bg-gradient-to-b from-cream/60 to-ivory">
      <div className="container-x py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">زرناب، کنار شما</span>
            <h1 className="mt-4 text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.35] text-ink">
              مشاورهٔ <span className="gold-text">اختصاصی</span> خرید
            </h1>
            <p className="mt-4 text-sm leading-8 text-muted">
              انتخاب جواهر فقط مقایسهٔ قیمت نیست؛ ترکیبی از سلیقه، مناسبت و ارزش بلندمدت است. یک
              جلسهٔ ۳۰ دقیقه‌ای با کارشناس زرناب، گزینه‌های مناسب شما را با جزئیات وزن، اجرت و سنگ
              بررسی می‌کند. مشاوره رایگان است و هیچ الزامی برای خرید وجود ندارد.
            </p>

            <div className="mt-7 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-white/70 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-gold-deep">
                  <IconPin className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">گالری زرناب</p>
                  <p className="mt-1 text-[11px] leading-6 text-muted">{site.address}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <a href={`tel:${site.phoneHref}`} className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 p-4 transition hover:border-gold/50">
                  <IconPhone className="size-5 text-gold-deep" />
                  <div>
                    <p className="text-[10px] text-muted">تماس تلفنی</p>
                    <p className="text-xs font-bold text-ink">{site.phone}</p>
                  </div>
                </a>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 p-4 transition hover:border-gold/50">
                  <IconWhatsapp className="size-5 text-gold-deep" />
                  <div>
                    <p className="text-[10px] text-muted">واتس‌اپ</p>
                    <p className="text-xs font-bold text-ink">مشاورهٔ متنی</p>
                  </div>
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 p-4 transition hover:border-gold/50">
                  <IconMail className="size-5 text-gold-deep" />
                  <div>
                    <p className="text-[10px] text-muted">ایمیل</p>
                    <p className="text-xs font-bold text-ink" dir="ltr">{site.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 p-4">
                  <IconClock className="size-5 text-gold-deep" />
                  <div>
                    <p className="text-[10px] text-muted">ساعات کاری</p>
                    <p className="text-xs font-bold text-ink">{site.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-forest-deep p-5 text-ivory">
              <p className="flex items-center gap-2 text-xs font-bold text-gold-light">
                <IconShield className="size-4" /> تعهد زرناب در مشاوره
              </p>
              <ul className="mt-3 space-y-2 text-[11px] leading-6 text-ivory/70">
                <li>· پیشنهاد کتبی گزینه‌ها با وزن، عیار و اجرت شفاف</li>
                <li>· بدون اصرار به خرید و بدون هزینهٔ مشاوره</li>
                <li>· پاسخ کمتر از یک روز کاری</li>
              </ul>
            </div>
          </div>

          <Reveal direction="left">
            <div className="rounded-[1.75rem] border border-line bg-white/80 p-6 shadow-[var(--shadow-soft)] md:p-8">
              <h2 className="text-lg font-extrabold text-ink">فرم درخواست مشاوره</h2>
              <p className="mt-1 text-xs text-muted">فیلدهای ستاره‌دار الزامی هستند.</p>
              <div className="mt-5">
                <LeadForm defaultTopic={topic} source="صفحهٔ تماس" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
