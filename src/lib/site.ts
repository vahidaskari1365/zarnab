export const site = {
  name: "زرناب",
  nameEn: "ZARNAB",
  legalName: "گالری طلا و جواهر زرناب",
  tagline: "جواهراتی که ارزش را به ارث می‌گذارند",
  description:
    "زرناب، گالری تخصصی طلای ۱۸ عیار و جواهرات دست‌ساز ایرانی؛ طراحی اصیل، سنگ‌های شناسنامه‌دار، ضمانت اصالت و بازخرید. خرید آنلاین گردنبند، انگشتر، دستبند، گوشواره و نیم‌ست با ارسال بیمه‌شده.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zarnab.ir",
  phone: "۰۲۱-۹۱۰۰۸۸۴۲",
  phoneHref: "+982191000884",
  email: "care@zarnab.ir",
  address: "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج زمرد، طبقه همکف، گالری زرناب",
  addressShort: "تهران، ولیعصر، برج زمرد",
  city: "تهران",
  country: "IR",
  postalCode: "1968734111",
  instagram: "https://instagram.com/zarnab",
  whatsapp: "https://wa.me/982191000884",
  hours: "شنبه تا پنجشنبه ۱۰ تا ۲۰",
  goldPrice18: 26_220_000,
  currency: "IRT",
} as const;

export const navigation = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "فروشگاه" },
  { href: "/collections", label: "کالکشن‌ها" },
  { href: "/journal", label: "دانشنامه طلا" },
  { href: "/about", label: "درباره زرناب" },
  { href: "/contact", label: "مشاوره اختصاصی" },
] as const;

export const trustPoints = [
  {
    title: "ضمانت اصالت و عیار",
    text: "هر قطعه با شناسنامه و مهر رسمی، آزمایش عیار و فاکتور معتبر تحویل داده می‌شود.",
    icon: "seal",
  },
  {
    title: "سنگ‌های شناسنامه‌دار",
    text: "الماس و سنگ‌های رنگی همراه گواهی آزمایشگاه بین‌المللی و امکان استعلام آنلاین.",
    icon: "gem",
  },
  {
    title: "بازخرید تضمینی",
    text: "بازخرید طلای زرناب بر اساس نرخ روز و با کارمزد شفاف و از پیش تعیین‌شده.",
    icon: "refresh",
  },
  {
    title: "ارسال بیمه‌شده",
    text: "ارسال رایگان و بیمه‌شده در تهران و ارسال امن سراسری با کد رهگیری اختصاصی.",
    icon: "truck",
  },
] as const;

export const collections = [
  { slug: "goosha-ye-tala", name: "گوشه طلا" },
] as const;

export function formatToman(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(Math.round(value));
}

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export function discountPercent(price: number, compareAt?: number | null): number {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
