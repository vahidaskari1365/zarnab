import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/motion-bits";
import { site, toPersianDigits } from "@/lib/site";
import { IconGem, IconSeal, IconShield } from "@/components/icons";

export const metadata: Metadata = {
  title: "دربارهٔ گالری زرناب",
  description:
    "زرناب از سال ۱۳۷۶ در تهران؛ گالری طلا و جواهر با کارگاه متصل، طراحی ایرانی و استانداردهای جهانی. داستان ما، ارزش‌ها و تعهد به شفافیت.",
  alternates: { canonical: "/about" },
  openGraph: { title: "دربارهٔ گالری زرناب", url: `${site.url}/about` },
};

const timeline = [
  { year: "۱۳۷۶", title: "آغاز در بازار تهران", text: "زرناب کار خود را با یک کارگاه کوچک طلاسازی در بازار بزرگ تهران آغاز کرد." },
  { year: "۱۳۸۸", title: "گالری ولیعصر", text: "افتتاح گالری اختصاصی و آغاز عرضهٔ کالکشن‌های نویسنده‌محور با نقوش ایرانی." },
  { year: "۱۳۹۷", title: "گواهی سنگ", text: "شروع همکاری با آزمایشگاه‌های بین‌المللی برای ارائهٔ گواهی الماس و سنگ‌های رنگی." },
  { year: "۱۴۰۲", title: "شناسنامهٔ دیجیتال", text: "ثبت دیجیتال هر قطعه با کد یکتا، قابل استعلام آنلاین و متصل به خدمات پس‌ازفروش." },
  { year: "۱۴۰۵", title: "تجربهٔ آنلاین زرناب", text: "خرید آنلاین با مشاورهٔ انسانی و هوشمند، ارسال بیمه‌شده و بازخرید تضمینی در سراسر ایران." },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "دربارهٔ گالری زرناب",
    url: `${site.url}/about`,
    about: { "@type": "JewelryStore", name: site.legalName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="eyebrow">دربارهٔ زرناب</span>
            <h1 className="mt-4 text-[clamp(2rem,4.8vw,3.3rem)] leading-[1.32] text-ink">
              سه نسل، یک <span className="gold-text">وسواس مشترک</span>
            </h1>
            <p className="mt-5 text-sm leading-8 text-muted">
              زرناب از یک کارگاه کوچک در بازار تهران شروع شد؛ جایی که استادکارها با دست، طلا را به
              فرم می‌آوردند و هر قطعه پیش از خروج، امضای سازنده را داشت. امروز همان وسواس در انتخاب
              سنگ، کنترل عیار و شفافیت فاکتور ادامه دارد؛ فقط مقیاس آن بزرگ‌تر شده است.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-4 border-y border-line py-5">
              {[
                { value: 28, suffix: "", label: "سال تجربهٔ زرگری" },
                { value: 12400, suffix: "+", label: "مشتری وفادار" },
                { value: 4.9, suffix: "/۵", label: "امتیاز رضایت", decimals: 1 },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-extrabold text-gold-deep">
                    <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-gold text-xs">مشاهدهٔ کالکشن</Link>
              <Link href="/contact" className="btn btn-outline text-xs">مشاورهٔ حضوری</Link>
            </div>
          </div>
          <Reveal direction="left" className="relative">
            <div className="arch overflow-hidden border border-gold/25 shadow-[var(--shadow-lift)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/campaign.jpg" alt="تیم زرناب در آتلیهٔ گالری" className="h-[24rem] w-full object-cover sm:h-[30rem]" />
            </div>
            <div className="absolute -bottom-4 right-4 w-52 rounded-2xl border border-line bg-ivory/95 p-4 shadow-lg">
              <p className="text-[10px] text-muted">مجوز و عضویت</p>
              <p className="mt-1 text-xs font-bold text-ink">اتحادیهٔ طلا و جواهر تهران</p>
              <p className="mt-1 text-[10px] text-muted">شناسهٔ صنفی: {toPersianDigits("۱۲۳۴۵۶۷۸")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: IconSeal, title: "شفافیت کامل", text: "وزن، عیار، اجرت و مالیات به تفکیک در فاکتور رسمی؛ هیچ عددی پنهان نیست." },
            { icon: IconGem, title: "سنگ اصیل", text: "الماس و سنگ‌های رنگی با گواهی آزمایشگاه بین‌المللی و امکان استعلام آنلاین." },
            { icon: IconShield, title: "مسئولیت بلندمدت", text: "بازخرید تضمینی، سرویس سالانهٔ رایگان و پشتیبانی پس‌ازفروش بدون محدودیت زمانی." },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 80}>
                <div className="h-full rounded-2xl border border-line bg-white/70 p-6">
                  <span className="grid size-11 place-items-center rounded-full bg-cream text-gold-deep">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="mt-4 text-base font-bold text-ink">{item.title}</h2>
                  <p className="mt-2 text-xs leading-6 text-muted">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-cream/50 py-14">
        <div className="container-x">
          <span className="eyebrow">مسیر ما</span>
          <h2 className="mt-3 text-2xl font-extrabold text-ink md:text-3xl">از بازار تا تجربهٔ دیجیتال</h2>
          <div className="mt-8 space-y-3">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 70}>
                <div className="flex flex-col gap-2 rounded-2xl border border-line bg-white/70 p-5 sm:flex-row sm:items-center sm:gap-6">
                  <span className="font-display text-2xl font-semibold text-gold-deep sm:w-24">{item.year}</span>
                  <div>
                    <p className="text-sm font-bold text-ink">{item.title}</p>
                    <p className="mt-1 text-xs leading-6 text-muted">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
