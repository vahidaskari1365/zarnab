/**
 * کاتالوگ دمو زرناب — منبع واحد داده بدون دیتابیس.
 *
 * نرخ‌های بازار طلا بر اساس نرخ مرجع بازار تهران (TGJU) در تاریخ
 * جمعه ۸ آبان ۱۴۰۵ (۳۰ اکتبر ۲۰۲۶) ثبت شده‌اند و برای به‌روزرسانی
 * کافی است همین یک آبجکت را ویرایش کنید.
 */

export type Category = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  sortOrder: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  story: string;
  categorySlug: string;
  price: number;
  compareAtPrice: number | null;
  weightGrams: number;
  karat: string;
  stone: string;
  stock: number;
  images: string[];
  badge: string | null;
  featured: boolean;
  ratingX10: number;
  reviewCount: number;
  createdAt: Date;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  cover: string;
  readMinutes: number;
  tags: string[];
  publishedAt: Date;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
};

export type Keyword = {
  id: number;
  keyword: string;
  intent: string;
  volume: number;
  position: number;
  previousPosition: number;
  landingPage: string;
  aiCitations: number;
  updatedAt: Date;
};

export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weightGrams?: number;
};

export type Order = {
  id: number;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  note: string;
  items: OrderItem[];
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: Date;
};

export type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  source: string;
  status: string;
  createdAt: Date;
};

export type Subscriber = { id: number; email: string; createdAt: Date };

/* ------------------------------------------------------------------ */
/* نرخ لحظه‌ای بازار طلای ایران                                        */
/* ------------------------------------------------------------------ */

export type GoldRates = {
  gram18: number;
  gram24: number;
  mesghal: number;
  coinEmami: number;
  coinBahar: number;
  coinHalf: number;
  coinQuarter: number;
  coinOneGram: number;
  ounceUsd: number;
  changeDay18: number;
  updatedAt: string;
  source: string;
};

export const GOLD: GoldRates = {
  gram18: 26_220_000,
  gram24: 34_750_000,
  mesghal: 112_900_000,
  coinEmami: 264_500_000,
  coinBahar: 256_100_000,
  coinHalf: 139_100_000,
  coinQuarter: 74_500_000,
  coinOneGram: 38_000_000,
  ounceUsd: 3_342,
  changeDay18: -4.45,
  updatedAt: "۸ آبان ۱۴۰۵",
  source: "نرخ مرجع بازار تهران",
};

/* ------------------------------------------------------------------ */
/* دسته‌بندی‌ها                                                        */
/* ------------------------------------------------------------------ */

export const CATEGORIES: Category[] = [
  { id: 1, slug: "necklace", name: "گردنبند", tagline: "امضایی نزدیک به قلب", description: "گردنبندهای ۱۸ عیار با طراحی معاصر و الهام از نقوش اسلیمی؛ از مدل‌های روزمره تا قطعات مجلسی.", image: "/images/necklace.jpg", sortOrder: 1 },
  { id: 2, slug: "ring", name: "انگشتر", tagline: "جزئیات، در نگاه اول", description: "انگشترهای تک‌نگین، حلقه‌های نامزدی و مدل‌های دست‌ساز با سنگ‌های شناسنامه‌دار.", image: "/images/ring.jpg", sortOrder: 2 },
  { id: 3, slug: "bracelet", name: "دستبند", tagline: "وزن طلا، روی مچ", description: "دستبندها و النگوهای توپر با پرداخت آینه‌ای یا مات، مناسب استفاده روزانه و هدیه.", image: "/images/bracelet.jpg", sortOrder: 3 },
  { id: 4, slug: "earrings", name: "گوشواره", tagline: "روشنایی، کنار صورت", description: "گوشواره‌های آویز و میخی با مروارید و زمرد؛ سبک و راحت برای تمام روز.", image: "/images/earrings.jpg", sortOrder: 4 },
  { id: 5, slug: "set", name: "نیم‌ست", tagline: "هماهنگی کامل", description: "نیم‌ست‌های عروس و مجلسی، طراحی یکپارچه با گردنبند و گوشواره هم‌خانواده.", image: "/images/set.jpg", sortOrder: 5 },
  { id: 6, slug: "bullion", name: "سکه و شمش", tagline: "دارایی، در دست", description: "سکه بهار آزادی و شمش‌های ۱ تا ۱۰ گرمی با ضمانت و فاکتور رسمی.", image: "/images/coins.jpg", sortOrder: 6 },
];

/* ------------------------------------------------------------------ */
/* محصولات دمو (۱۶ قطعه)                                               */
/* ------------------------------------------------------------------ */

export const PRODUCTS: Product[] = [
  {
    id: 1, slug: "grdnbnd-mehra", name: "گردنبند مهرآرا", subtitle: "زمرد کلمبیایی، زنجیر ونیزی ۱۸ عیار",
    description: "گردنبند مهرآرا با زنجیر ونیزی ۱۸ عیار و آویز زمرد طبیعی کلمبیایی، برای کسی طراحی شده که جزئیات را می‌بیند. طول زنجیر قابل تنظیم میان ۴۰ و ۴۵ سانتی‌متر است و قفل آن از نوع جعبه‌ای ایمن با تاییدیهٔ کارگاه است.",
    story: "مهرآرا از دل یک نقاشی قدیمی ایرانی بیرون آمده است؛ جایی که نور از میان شیشه‌های رنگی می‌گذرد و روی دست زن می‌نشیند. هر آویز در دو مرحله پرداخت دستی می‌شود تا درخشش زمرد در نور کم هم دیده شود.",
    categorySlug: "necklace", price: 174_000_000, compareAtPrice: 193_100_000, weightGrams: 5, karat: "18", stone: "زمرد طبیعی با گواهی", stock: 6,
    images: ["/images/necklace.jpg", "/images/set.jpg", "/images/hero-secondary.jpg"], badge: "پرفروش", featured: true, ratingX10: 49, reviewCount: 38, createdAt: new Date("2026-09-12T09:00:00Z"),
  },
  {
    id: 2, slug: "grdnbnd-eslimi", name: "گردنبند اسلیمی", subtitle: "نقش اسلیمی، پرداخت دستی",
    description: "بازخوانی مدرن نقش اسلیمی در قالب گردنبندی سبک و مجلسی. سطح قطعه با تکنیک مات‌کاری پولیش شده تا نقش‌ها عمق پیدا کنند و درخشش طلا آرام و لوکس بماند.",
    story: "این قطعه حاصل همکاری سه نسل از استادکاران زرناب است؛ از طراح تا قلم‌زن و پرداخت‌کار. طراحی اسلیمی آن با نسبت‌های طلایی ترسیم شده است.",
    categorySlug: "necklace", price: 211_000_000, compareAtPrice: null, weightGrams: 6, karat: "18", stone: "بدون سنگ", stock: 4,
    images: ["/images/hero-secondary.jpg", "/images/necklace.jpg"], badge: "کالکشن اسلیمی", featured: true, ratingX10: 48, reviewCount: 21, createdAt: new Date("2026-09-20T09:00:00Z"),
  },
  {
    id: 3, slug: "angoshtar-almas-shab", name: "انگشتر الماس شب", subtitle: "الماس ۰٫۴ قیراط با گواهی GIA",
    description: "انگشتر سولیتر با الماس برلیان ۰٫۴ قیراط، رنگ F و پاکی VS1. رینگ از طلای ۱۸ عیار سفید با آبکاری رودیوم و مخراج‌کاری دستی است. گواهی GIA و شناسنامه قطعه همراه سفارش ارسال می‌شود.",
    story: "برای شب‌های مهم، الماس نباید فریاد بزند؛ باید بدرخشد. الماس شب با کمترین فلز و بیشترین نور طراحی شده تا تمرکز کامل روی سنگ باشد.",
    categorySlug: "ring", price: 278_100_000, compareAtPrice: 294_700_000, weightGrams: 4, karat: "18", stone: "الماس ۰٫۴ قیراط GIA", stock: 2,
    images: ["/images/ring.jpg", "/images/campaign.jpg"], badge: "سنگ گواهی‌دار", featured: true, ratingX10: 50, reviewCount: 14, createdAt: new Date("2026-10-02T09:00:00Z"),
  },
  {
    id: 4, slug: "angoshtar-niloofar", name: "انگشتر نیلوفر", subtitle: "حلقه توپر با تراش نیلوفر",
    description: "حلقه‌ای توپر با حجم کنترل‌شده و شیارهای ظریف الهام‌گرفته از گل نیلوفر. مناسب استفاده روزانه و ترکیب با سایر رینگ‌های زرناب.",
    story: "نیلوفر، نماد پاکی در هنر ایرانی است. فرم گل با مدل‌سازی سه‌بعدی بررسی و سپس با دست اجرا شده تا لبه‌ها بی‌نقص و راحت باشند.",
    categorySlug: "ring", price: 162_200_000, compareAtPrice: null, weightGrams: 4, karat: "18", stone: "بدون سنگ", stock: 8,
    images: ["/images/ring.jpg", "/images/hero-secondary.jpg"], badge: null, featured: false, ratingX10: 47, reviewCount: 26, createdAt: new Date("2026-08-14T09:00:00Z"),
  },
  {
    id: 5, slug: "angoshtar-firoozeh", name: "انگشتر فیروزه نیشابوری", subtitle: "فیروزه سیم‌کان، مخراج‌کاری دستی",
    description: "انگشتر زنانه با سنگ فیروزهٔ نیشابوری سیم‌کان و مخراج‌کاری طلای ۱۸ عیار دور سنگ. سبک عربی‌ملایم با پرداخت مات؛ همراه گواهی اصالت سنگ.",
    story: "فیروزه، سنگ آسمان ایران است. در این قطعه، ترکیب آبی فیروزه با گرمای طلا به سبک مخراج‌کاری اصفهان اجرا شده است.",
    categorySlug: "ring", price: 108_100_000, compareAtPrice: 115_900_000, weightGrams: 3, karat: "18", stone: "فیروزه نیشابوری سیم‌کان", stock: 5,
    images: ["/images/ring.jpg", "/images/campaign.jpg"], badge: "سنگ اصیل", featured: false, ratingX10: 48, reviewCount: 11, createdAt: new Date("2026-10-12T09:00:00Z"),
  },
  {
    id: 6, slug: "dastband-hamhame", name: "دستبند همهمه", subtitle: "توپر، پرداخت آینه‌ای",
    description: "دستبند توپر ۱۸ عیار با پرداخت آینه‌ای و قفل جعبه‌ای دولایه. وزن و تعادل قطعه روی مچ بررسی شده تا در استفادهٔ روزمره جابه‌جا نشود.",
    story: "همهمه، صدای طلا روی میز کارگاه است. این دستبند از یک شمش تک‌پارچه ساخته می‌شود و هیچ اتصال ظاهری در بدنهٔ آن دیده نمی‌شود.",
    categorySlug: "bracelet", price: 248_800_000, compareAtPrice: 267_500_000, weightGrams: 8, karat: "18", stone: "بدون سنگ", stock: 3,
    images: ["/images/bracelet.jpg", "/images/campaign.jpg"], badge: "پیشنهاد زرناب", featured: true, ratingX10: 49, reviewCount: 31, createdAt: new Date("2026-09-05T09:00:00Z"),
  },
  {
    id: 7, slug: "dastband-gold-hammered", name: "دستبند چکش‌خورده", subtitle: "بافت چکش‌کاری، سبک روزانه",
    description: "دستبند سبک با بافت چکش‌کاری دستی و قفل مگنتی ایمن. هر قطعه الگوی چکش‌کاری منحصربه‌فرد خود را دارد.",
    story: "چکش‌کاری، اثر انگشت استادکار روی طلاست. به همین دلیل هیچ دو دستبندی کاملاً شبیه هم نیستند.",
    categorySlug: "bracelet", price: 181_700_000, compareAtPrice: null, weightGrams: 6, karat: "18", stone: "بدون سنگ", stock: 7,
    images: ["/images/bracelet.jpg", "/images/hero-secondary.jpg"], badge: null, featured: false, ratingX10: 48, reviewCount: 18, createdAt: new Date("2026-08-25T09:00:00Z"),
  },
  {
    id: 8, slug: "dastband-zanjir-mardane", name: "دستبند زنجیر مردانه", subtitle: "بافت باکس، وزن سنگین",
    description: "دستبند مردانه با بافت باکس توپر و قفل جعبه‌ای دوقلوزانه. ضخامت ۷ میلی‌متر و پرداخت نیم‌مات؛ انتخابی درخشان برای استفادهٔ هر روز.",
    story: "این دستبند برای کسانی ساخته شده که طلا را نه برای ویترین، برای زندگی می‌خواهند؛ وزنی متعادل که با مچ یکی می‌شود.",
    categorySlug: "bracelet", price: 371_300_000, compareAtPrice: null, weightGrams: 12, karat: "18", stone: "بدون سنگ", stock: 3,
    images: ["/images/bracelet.jpg", "/images/coins.jpg"], badge: "مردانه", featured: false, ratingX10: 49, reviewCount: 7, createdAt: new Date("2026-10-18T09:00:00Z"),
  },
  {
    id: 9, slug: "gooshvare-ghatre", name: "گوشواره قطره", subtitle: "مروارید پرورشی و زمرد",
    description: "گوشواره‌های آویز با مروارید پرورشی و سنگ زمرد کوچک. وزن سبک و پشت‌بند محافظ برای استفاده طولانی.",
    story: "قطره، ساده‌ترین فرمی است که نور را نگه می‌دارد. این گوشواره از یک قطره کوچک الهام گرفته و در سه نسخهٔ پرداخت اجرا شده است.",
    categorySlug: "earrings", price: 120_300_000, compareAtPrice: 131_700_000, weightGrams: 3, karat: "18", stone: "مروارید و زمرد", stock: 9,
    images: ["/images/earrings.jpg", "/images/set.jpg"], badge: "تازه رسیده", featured: true, ratingX10: 49, reviewCount: 24, createdAt: new Date("2026-10-08T09:00:00Z"),
  },
  {
    id: 10, slug: "gooshvare-parande", name: "گوشواره پرنده", subtitle: "مینیاتور پرندهٔ ایرانی",
    description: "گوشواره‌های میخی با نقش مینیاتوری پرنده، اجرا شده با تکنیک قلم‌زنی ریز. سبک و مناسب استفادهٔ روزانه.",
    story: "نقش پرنده از مینیاتورهای اصفهان گرفته شده؛ نمادی از آزادی و سبک‌بالی در طراحی.",
    categorySlug: "earrings", price: 102_800_000, compareAtPrice: null, weightGrams: 2, karat: "18", stone: "بدون سنگ", stock: 11,
    images: ["/images/earrings.jpg", "/images/campaign.jpg"], badge: null, featured: false, ratingX10: 47, reviewCount: 12, createdAt: new Date("2026-08-02T09:00:00Z"),
  },
  {
    id: 11, slug: "gooshvare-mikh-morvarid", name: "گوشواره میخی مروارید", subtitle: "مروارید آکویا، طراحی مینیمال",
    description: "گوشواره میخی با مروارید آکویای هم‌اندازه و پایهٔ طلای ۱۸ عیار. فرم کلاسیکی که با هر استایلی، از رسمی تا کژوال، هم‌خوان است.",
    story: "سادگی، سخت‌ترین سادگی است. این گوشواره پس از ۱۴ نمونهٔ اولیه به نسخهٔ نهایی رسید؛ تعادلی میان نور، اندازه و راحتی.",
    categorySlug: "earrings", price: 83_200_000, compareAtPrice: null, weightGrams: 2, karat: "18", stone: "مروارید آکویا", stock: 12,
    images: ["/images/earrings.jpg", "/images/hero-secondary.jpg"], badge: "تازه رسیده", featured: false, ratingX10: 48, reviewCount: 9, createdAt: new Date("2026-10-20T09:00:00Z"),
  },
  {
    id: 12, slug: "nimset-shahrzad", name: "نیم‌ست شهرزاد", subtitle: "گردنبند و گوشوارهٔ عروس",
    description: "نیم‌ست کامل عروس شامل گردنبند، گوشواره و پلاک هم‌خانواده با پرداخت براق. طراحی متعادل برای یقه‌های باز و آرایش موی جمع.",
    story: "شهرزاد برای شب‌های هزار و یکم ساخته شده؛ مجموعه‌ای که در عین جلب توجه، سنگین نیست و امکان استفادهٔ جداگانه از هر قطعه را می‌دهد.",
    categorySlug: "set", price: 320_700_000, compareAtPrice: 345_100_000, weightGrams: 9, karat: "18", stone: "مروارید پرورشی", stock: 2,
    images: ["/images/set.jpg", "/images/earrings.jpg", "/images/hero.jpg"], badge: "کالکشن عروس", featured: true, ratingX10: 50, reviewCount: 17, createdAt: new Date("2026-09-28T09:00:00Z"),
  },
  {
    id: 13, slug: "nimset-yas", name: "نیم‌ست یاس", subtitle: "طراحی مینیمال، هم‌خانواده",
    description: "نیم‌ست یاس با فرم‌های نرم و ظریف، طراحی‌شده برای استفادهٔ همزمان یا جداگانه. پرداخت مات برای درخشش ملایم.",
    story: "یاس از گل‌های محبوب حیاط‌های ایرانی است؛ این نیم‌ست همان حس آرام و آشنا را به جواهر ترجمه می‌کند.",
    categorySlug: "set", price: 237_400_000, compareAtPrice: null, weightGrams: 7, karat: "18", stone: "زیرکن", stock: 4,
    images: ["/images/set.jpg", "/images/necklace.jpg"], badge: null, featured: false, ratingX10: 48, reviewCount: 9, createdAt: new Date("2026-09-01T09:00:00Z"),
  },
  {
    id: 14, slug: "sekke-bahar-azadi", name: "سکه تمام بهار آزادی", subtitle: "ضرب بانک مرکزی، طرح جدید",
    description: "سکه تمام بهار آزادی طرح جدید با ضمانت اصالت، همراه کاور و فاکتور رسمی. امکان تحویل حضوری در گالری زرناب.",
    story: "سکه، ساده‌ترین شکل حفظ ارزش است؛ زرناب اصالت و سلامت فیزیکی هر سکه را پیش از تحویل بررسی می‌کند.",
    categorySlug: "bullion", price: 256_100_000, compareAtPrice: null, weightGrams: 8, karat: "24", stone: "بدون سنگ", stock: 14,
    images: ["/images/coins.jpg", "/images/hero-secondary.jpg"], badge: "سرمایه‌ای", featured: true, ratingX10: 49, reviewCount: 42, createdAt: new Date("2026-07-15T09:00:00Z"),
  },
  {
    id: 15, slug: "shemesh-5-gram", name: "شمش طلای ۵ گرمی", subtitle: "خلوص ۹۹۵، مهر سازنده",
    description: "شمش طلای ۵ گرمی با خلوص ۹۹۵ و مهر معتبر سازنده، در بسته‌بندی پلمب‌شده. مناسب سرمایه‌گذاری میان‌مدت و هدیهٔ ارزشمند.",
    story: "شمش‌های زرناب از تامین‌کنندگان دارای مجوز تهیه می‌شوند و شمارهٔ سریال روی هر قطعه ثبت می‌شود.",
    categorySlug: "bullion", price: 174_600_000, compareAtPrice: 179_500_000, weightGrams: 5, karat: "24", stone: "بدون سنگ", stock: 20,
    images: ["/images/coins.jpg"], badge: null, featured: false, ratingX10: 48, reviewCount: 33, createdAt: new Date("2026-07-22T09:00:00Z"),
  },
  {
    id: 16, slug: "shemesh-1-gram", name: "شمش طلای ۱ گرمی", subtitle: "خلوص ۹۹۵، شروع سرمایه‌گذاری",
    description: "شمش یک گرمی با خلوص ۹۹۵ در پاکت پلمب و شماره سریال منحصربه‌فرد؛ کوچک‌ترین قدم برای آغاز دارایی طلایی.",
    story: "شمش یک گرمی محبوب‌ترین انتخاب برای هدیه و شروع پس‌انداز طلایی است؛ ارزش ذاتی در کوچک‌ترین اندازه.",
    categorySlug: "bullion", price: 35_300_000, compareAtPrice: null, weightGrams: 1, karat: "24", stone: "بدون سنگ", stock: 30,
    images: ["/images/coins.jpg", "/images/hero-secondary.jpg"], badge: "پرفروش", featured: false, ratingX10: 49, reviewCount: 51, createdAt: new Date("2026-10-05T09:00:00Z"),
  },
];

/* ------------------------------------------------------------------ */
/* دانشنامه                                                           */
/* ------------------------------------------------------------------ */

export const POSTS: Post[] = [
  {
    id: 1, slug: "rahnama-kharid-tala-18-ayar",
    title: "راهنمای کامل خرید طلای ۱۸ عیار؛ از عیار تا اجرت",
    excerpt: "قبل از خرید طلا بدانید پول شما دقیقاً بابت چه چیزی پرداخت می‌شود: ارزش طلا، اجرت ساخت، سود فروشنده و مالیات بر ارزش افزوده.",
    category: "راهنمای خرید", cover: "/images/necklace.jpg", readMinutes: 8,
    tags: ["خرید طلا", "عیار ۱۸", "اجرت ساخت"],
    content: `<h2>عیار ۱۸ یعنی چه؟</h2><p>طلای ۱۸ عیار دارای ۷۵۰ قسمت طلای خالص در هر ۱۰۰۰ قسمت است. این ترکیب، تعادل مطلوبی میان درخشش، استحکام و دوام ایجاد می‌کند و به همین دلیل استاندارد اصلی جواهرات در ایران است.</p><h2>قیمت طلا از چه اجزایی تشکیل می‌شود؟</h2><p>قیمت نهایی هر قطعه از جمع <strong>ارزش طلای خالص</strong>، <strong>اجرت ساخت</strong>، <strong>سود فروشنده</strong> و <strong>مالیات بر ارزش افزوده</strong> به دست می‌آید. در زرناب هر چهار جزء روی فاکتور و صفحه محصول شفاف اعلام می‌شود.</p><h3>اجرت ساخت چرا متفاوت است؟</h3><p>قطعات دست‌ساز، مخراج‌کاری سنگ و پرداخت‌های خاص زمان بیشتری می‌برند و اجرت بالاتری دارند. برای سرمایه‌گذاری، قطعات کم‌اجرت و شمش مناسب‌ترند و برای استفادهٔ روزمره، ارزش طراحی و دوام اهمیت بیشتری دارد.</p><h2>پیش از خرید چه چیزی را بررسی کنیم؟</h2><ul><li>مهر و شمارهٔ قطعه روی جواهر</li><li>فاکتور رسمی با وزن دقیق و عیار</li><li>گواهی سنگ در صورت وجود نگین</li><li>شرایط بازخرید و تعویض</li></ul><p>زرناب برای هر خرید شناسنامهٔ دیجیتال صادر می‌کند که با کد قطعه در همین سایت قابل استعلام است.</p>`,
    publishedAt: new Date("2026-09-10T08:00:00Z"),
  },
  {
    id: 2, slug: "entekhab-angooshtar-namzadi",
    title: "انتخاب انگشتر نامزدی؛ ۶ اصل که خرید را آسان می‌کند",
    excerpt: "از انتخاب سنگ تا سایز انگشت و سبک رینگ؛ چک‌لیستی که کمک می‌کند انتخاب درستی برای یک عمر داشته باشید.",
    category: "راهنمای خرید", cover: "/images/ring.jpg", readMinutes: 6,
    tags: ["انگشتر نامزدی", "الماس", "سایزبندی"],
    content: `<h2>۱. بودجه را قبل از دیدن سنگ مشخص کنید</h2><p>قیمت الماس بر اساس ۴C تعیین می‌شود: قیراط، رنگ، پاکی و تراش. کمی انعطاف در رنگ و پاکی، قیراط بزرگ‌تری در همان بودجه به شما می‌دهد.</p><h2>۲. تراش، مهم‌تر از اندازه</h2><p>تراش خوب نور را به چشم برمی‌گرداند. الماس با تراش عالی و قیراط کمتر، اغلب درخشان‌تر از سنگ بزرگ‌تر با تراش ضعیف است.</p><h2>۳. فلز را با سبک زندگی هماهنگ کنید</h2><p>طلای سفید برای استفادهٔ روزمره مقاوم است؛ طلای زرد حس کلاسیک‌تری دارد و رزگلد گرم و متفاوت است.</p><h2>۴. سایز انگشت را در پایان روز بگیرید</h2><p>دمای بدن و ساعت روز روی اندازهٔ انگشت اثر می‌گذارد. یک بار صبح و یک بار شب اندازه بگیرید و میانگین را انتخاب کنید.</p><h2>۵. ارتفاع نگین را فراموش نکنید</h2><p>نگین‌های بلند زیبا هستند اما به لباس و وسایل روزمره گیر می‌کنند. برای استفادهٔ همیشگی، نگین کوتاه‌تر انتخاب مطمئن‌تری است.</p><h2>۶. گواهی و شرایط پس‌ازفروش</h2><p>گواهی GIA یا آزمایشگاه معتبر و خدمات سایزبندی رایگان، ارزش واقعی خرید را بالا می‌برد.</p>`,
    publishedAt: new Date("2026-09-24T08:00:00Z"),
  },
  {
    id: 3, slug: "negahdari-javaherat",
    title: "نگهداری جواهرات؛ عادت‌های ساده برای درخشش همیشگی",
    excerpt: "طلا فرسوده نمی‌شود اما کدر می‌شود. چند عادت روزمره و یک روتین ماهانه، درخشش قطعات شما را حفظ می‌کند.",
    category: "مراقبت", cover: "/images/earrings.jpg", readMinutes: 5,
    tags: ["نگهداری", "تمیز کردن طلا", "مروارید"],
    content: `<h2>قانون آخرین قطعه، اولین قطعه</h2><p>جواهرات را بعد از عطر و آرایش ببندید و پیش از ورزش یا خواب باز کنید. عطر، کرم و عرق روی سطح طلا لایهٔ نازکی می‌سازند که درخشش را کم می‌کند.</p><h2>تمیز کردن خانگی</h2><p>آب گرم، چند قطره صابون ملایم و یک برس نرم کافی است. مروارید و زمرد را هرگز در آب نخوابانید و از دستگاه اولتراسونیک برای سنگ‌های رنگی استفاده نکنید.</p><h2>نگهداری درست</h2><p>هر قطعه در جاکادویی جدا و در محیط خشک نگهداری شود. زنجیرها را قفل‌شده و آویزان نگه دارید تا گره نخورند.</p><h2>بازرسی سالانه</h2><p>سالانه یک بار قطعات را برای بررسی قفل، مخراج‌کاری و سلامت سنگ به گالری بیاورید. این سرویس برای مشتریان زرناب رایگان است.</p>`,
    publishedAt: new Date("2026-10-06T08:00:00Z"),
  },
  {
    id: 4, slug: "sarmayegozari-tala-2026",
    title: "طلا به‌عنوان دارایی؛ چطور وزن و اجرت را بهینه کنیم؟",
    excerpt: "اگر هدف شما حفظ ارزش است، انتخاب قطعه با اجرت پایین، وزن مشخص و قابلیت بازخرید، مهم‌تر از طراحی است.",
    category: "سرمایه‌گذاری", cover: "/images/coins.jpg", readMinutes: 7,
    tags: ["سرمایه‌گذاری طلا", "شمش", "بازخرید"],
    content: `<h2>ارزش ذاتی در برابر ارزش طراحی</h2><p>در بازخرید، طلا بر اساس وزن و عیار ارزیابی می‌شود؛ اجرت ساخت بازگشت‌پذیر نیست. اگر هدف سرمایه‌گذاری است، سهم اجرت را پایین نگه دارید.</p><h2>شمش یا طلای زینتی؟</h2><p>شمش و سکه اجرت کمتری دارند و نقدشوندگی بالاتری دارند. قطعات زینتی هم ارزش ذاتی خود را حفظ می‌کنند اما بخشی از قیمت، هزینهٔ طراحی است.</p><h2>تقسیم خرید در زمان</h2><p>خرید پله‌ای در چند نوبت، ریسک انتخاب یک قیمت نامناسب را کاهش می‌دهد. برای دارایی بلندمدت، وزن بهتری از قطعات خرد تهیه کنید.</p><h2>فاکتور و ضمانت، بخشی از دارایی شماست</h2><p>بدون فاکتور رسمی، فروش دارایی سخت‌تر و ارزان‌تر می‌شود. در زرناب تمام خریدها با فاکتور رسمی و شناسنامهٔ دیجیتال ثبت می‌شنود.</p>`,
    publishedAt: new Date("2026-10-16T08:00:00Z"),
  },
];

/* ------------------------------------------------------------------ */
/* پرسش‌های متداول                                                    */
/* ------------------------------------------------------------------ */

export const FAQS: Faq[] = [
  { id: 1, question: "آیا جواهرات زرناب اصل هستند؟", answer: "بله. تمام قطعات با طلای ۱۸ عیار (۷۵۰) یا ۲۴ عیار برای شمش عرضه می‌شوند. هر قطعه پیش از ارسال آزمایش عیار می‌شود و همراه فاکتور رسمی و شناسنامهٔ دیجیتال با کد استعلام یکتا ارسال می‌گردد.", category: "اصالت و ضمانت", sortOrder: 1 },
  { id: 2, question: "شرایط بازخرید و تعویض چیست؟", answer: "بازخرید طلای زرناب بر اساس نرخ روز و با کسر کارمزد شفاف انجام می‌شود. تا ۷ روز پس از خرید، تعویض یا بازگشت کامل قطعه در صورت سالم بودن آن ممکن است. قطعات سفارشی با نام حکاکی، مشمول بازگشت نیستند.", category: "پس‌ازفروش", sortOrder: 2 },
  { id: 3, question: "ارسال چقدر زمان می‌برد و آیا بیمه است؟", answer: "ارسال در تهران با پیک اختصاصی ۲۴ ساعته و رایگان انجام می‌شود. شهرستان‌ها با پست پیشتاز بیمه‌شده و کد رهگیری، بین ۲ تا ۴ روز کاری تحویل می‌گیرند. تمام بسته‌ها تا زمان تحویل بیمه هستند.", category: "ارسال", sortOrder: 3 },
  { id: 4, question: "روش پرداخت و امکان خرید قسطی وجود دارد؟", answer: "پرداخت آنلاین از طریق درگاه امن بانکی، کارت به کارت و پرداخت حضوری در گالری پذیرفته می‌شود. برای خریدهای بالای ۵۰ میلیون تومان، امکان پرداخت در دو قسط با چک صیادی مورد تایید فراهم است.", category: "پرداخت", sortOrder: 4 },
  { id: 5, question: "اگر سایز انگشتر مناسب نباشد چه می‌شود؟", answer: "سایزبندی نخست برای همهٔ انگشترها رایگان است. اگر پس از تحویل سایز مناسب نبود، یک بار تغییر سایز بدون هزینه انجام می‌شود؛ به‌جز رینگ‌های تمام‌سنگ که امکان تغییر محدود دارند.", category: "سایزبندی", sortOrder: 5 },
  { id: 6, question: "برای خرید عروس چه خدماتی دارید؟", answer: "مشاورهٔ اختصاصی عروس، انتخاب نیم‌ست هماهنگ با لباس و آرایش، امکان سفارش طراحی اختصاصی و سرویس امانت‌گذاری برای عکاسی در زرناب فراهم است. برای رزرو مشاوره از صفحهٔ تماس استفاده کنید.", category: "عروس", sortOrder: 6 },
  { id: 7, question: "شناسنامهٔ دیجیتال قطعه چیست؟", answer: "برای هر قطعه یک صفحهٔ استعلام اختصاصی ثبت می‌شود که شامل وزن، عیار، مشخصات سنگ، تصویر قطعه و تاریخ خرید است. این اطلاعات مبنای خدمات پس‌ازفروش و بازخرید خواهد بود.", category: "اصالت و ضمانت", sortOrder: 7 },
  { id: 8, question: "آیا امکان سفارش طراحی خاص وجود دارد؟", answer: "بله. در بخش سفارشی، طرح یا تصویر مورد نظر خود را برای ما ارسال کنید. تیم طراحی زرناب پس از بررسی امکان‌سنجی، طرح سه‌بعدی و برآورد قیمت را حداکثر در سه روز کاری ارائه می‌دهد.", category: "سفارشی", sortOrder: 8 },
];

/* ------------------------------------------------------------------ */
/* کلمات کلیدی سئو                                                    */
/* ------------------------------------------------------------------ */

export const KEYWORDS: Keyword[] = [
  { id: 1, keyword: "خرید طلا", intent: "transactional", volume: 74000, position: 2, previousPosition: 5, landingPage: "/products", aiCitations: 12, updatedAt: new Date("2026-10-28T08:00:00Z") },
  { id: 2, keyword: "قیمت طلای ۱۸ عیار", intent: "informational", volume: 181000, position: 4, previousPosition: 9, landingPage: "/journal/rahnama-kharid-tala-18-ayar", aiCitations: 21, updatedAt: new Date("2026-10-28T08:00:00Z") },
  { id: 3, keyword: "انگشتر الماس", intent: "commercial", volume: 22000, position: 3, previousPosition: 4, landingPage: "/products/angoshtar-almas-shab", aiCitations: 7, updatedAt: new Date("2026-10-28T08:00:00Z") },
  { id: 4, keyword: "گردنبند طلا زنانه", intent: "commercial", volume: 33000, position: 5, previousPosition: 11, landingPage: "/collections/necklace", aiCitations: 9, updatedAt: new Date("2026-10-28T08:00:00Z") },
  { id: 5, keyword: "نیم‌ست عروس", intent: "commercial", volume: 18100, position: 2, previousPosition: 6, landingPage: "/collections/set", aiCitations: 5, updatedAt: new Date("2026-10-28T08:00:00Z") },
  { id: 6, keyword: "قیمت سکه بهار آزادی", intent: "informational", volume: 240000, position: 6, previousPosition: 12, landingPage: "/products/sekke-bahar-azadi", aiCitations: 18, updatedAt: new Date("2026-10-28T08:00:00Z") },
  { id: 7, keyword: "دستبند طلا مردانه", intent: "commercial", volume: 9800, position: 8, previousPosition: 14, landingPage: "/products", aiCitations: 3, updatedAt: new Date("2026-10-28T08:00:00Z") },
  { id: 8, keyword: "بهترین طلاساز تهران", intent: "local", volume: 2100, position: 1, previousPosition: 3, landingPage: "/about", aiCitations: 4, updatedAt: new Date("2026-10-28T08:00:00Z") },
  { id: 9, keyword: "نگهداری جواهرات", intent: "informational", volume: 4400, position: 3, previousPosition: 8, landingPage: "/journal/negahdari-javaherat", aiCitations: 11, updatedAt: new Date("2026-10-28T08:00:00Z") },
  { id: 10, keyword: "شمش طلا ۵ گرمی", intent: "transactional", volume: 3200, position: 2, previousPosition: 5, landingPage: "/products/shemesh-5-gram", aiCitations: 2, updatedAt: new Date("2026-10-28T08:00:00Z") },
];

/* ------------------------------------------------------------------ */
/* تنظیمات                                                            */
/* ------------------------------------------------------------------ */

export const SETTINGS: Record<string, string> = {
  announcement: "نرخ امروز گرم طلای ۱۸ عیار: ۲۶٬۲۲۰٬۰۰۰ تومان — ارسال بیمه‌شدهٔ رایگان بالای ۳۰ میلیون تومان",
  gold_price_18: String(GOLD.gram18),
  hero_eyebrow: "کالکشن طلوع ۱۴۰۵",
  hero_title: "ارزش را به ارث بگذارید",
  hero_subtitle: "طلای ۱۸ عیار و جواهرات دست‌ساز ایرانی؛ طراحی‌شده برای لحظه‌هایی که می‌مانند. ضمانت اصالت، سنگ شناسنامه‌دار و بازخرید تضمینی.",
  seo_title: "زرناب | گالری طلا و جواهرات ۱۸ عیار دست‌ساز",
  seo_description: "خرید آنلاین طلای ۱۸ عیار و جواهرات دست‌ساز با ضمانت اصالت، سنگ شناسنامه‌دار و بازخرید تضمینی. گالری زرناب، تهران.",
  ai_visibility_score: "87",
  schema_coverage: "96",
  core_web_vitals: "94",
};

/* ------------------------------------------------------------------ */
/* سفارش‌ها و سرنخ‌های دمو (پنل مدیریت)                                */
/* ------------------------------------------------------------------ */

export const DEMO_ORDERS: Order[] = [
  { id: 1, orderNumber: "ZR-140501", customerName: "نگار موسوی", phone: "09121234567", email: "", city: "تهران", address: "ولنجک، خیابان ۲۶", note: "", paymentMethod: "online",
    items: [{ slug: "grdnbnd-mehra", name: "گردنبند مهرآرا", price: 174_000_000, quantity: 1, image: "/images/necklace.jpg", weightGrams: 5 }], total: 174_000_000, status: "shipped", createdAt: new Date("2026-10-19T10:30:00Z") },
  { id: 2, orderNumber: "ZR-140502", customerName: "آرمان رضایی", phone: "09351112233", email: "", city: "اصفهان", address: "خیابان چهارباغ، کوچه ۱۴", note: "", paymentMethod: "online",
    items: [{ slug: "angoshtar-almas-shab", name: "انگشتر الماس شب", price: 278_100_000, quantity: 1, image: "/images/ring.jpg", weightGrams: 4 }], total: 278_100_000, status: "processing", createdAt: new Date("2026-10-21T14:10:00Z") },
  { id: 3, orderNumber: "ZR-140503", customerName: "سارا کریمی", phone: "09122223344", email: "", city: "شیراز", address: "بلوار زند، برج یاس", note: "", paymentMethod: "card",
    items: [{ slug: "nimset-shahrzad", name: "نیم‌ست شهرزاد", price: 320_700_000, quantity: 1, image: "/images/set.jpg", weightGrams: 9 }], total: 320_700_000, status: "pending", createdAt: new Date("2026-10-25T09:45:00Z") },
  { id: 4, orderNumber: "ZR-140504", customerName: "مهسا اکبری", phone: "09197778899", email: "", city: "کرج", address: "گوهردشت، خیابان ۵", note: "", paymentMethod: "online",
    items: [{ slug: "gooshvare-ghatre", name: "گوشواره قطره", price: 120_300_000, quantity: 2, image: "/images/earrings.jpg", weightGrams: 3 }], total: 240_600_000, status: "delivered", createdAt: new Date("2026-10-14T16:20:00Z") },
  { id: 5, orderNumber: "ZR-140505", customerName: "حسین نوری", phone: "09121119988", email: "", city: "مشهد", address: "بلوار سجاد، خیابان ۱۲", note: "", paymentMethod: "online",
    items: [{ slug: "sekke-bahar-azadi", name: "سکه تمام بهار آزادی", price: 256_100_000, quantity: 1, image: "/images/coins.jpg", weightGrams: 8 }], total: 256_100_000, status: "processing", createdAt: new Date("2026-10-23T11:05:00Z") },
  { id: 6, orderNumber: "ZR-140506", customerName: "کیوان شریفی", phone: "09125554433", email: "", city: "تبریز", address: "خیابان ولیعصر، کوی گلها", note: "", paymentMethod: "online",
    items: [{ slug: "dastband-zanjir-mardane", name: "دستبند زنجیر مردانه", price: 371_300_000, quantity: 1, image: "/images/bracelet.jpg", weightGrams: 12 }], total: 371_300_000, status: "pending", createdAt: new Date("2026-10-27T13:40:00Z") },
];

export const DEMO_LEADS: Lead[] = [
  { id: 1, name: "لیلا احمدی", phone: "09123334455", email: "leila@example.com", topic: "مشاورهٔ نیم‌ست عروس", message: "برای مراسم شهریور ماه به مشاورهٔ حضوری نیاز دارم.", source: "وب‌سایت", status: "new", createdAt: new Date("2026-10-24T09:00:00Z") },
  { id: 2, name: "سپهر دادگر", phone: "09364445566", email: "sepehr@example.com", topic: "سفارش طراحی اختصاصی", message: "طرح انگشتر با سنگ فیروزهٔ نیشابوری مدنظرم است.", source: "وب‌سایت", status: "contacted", createdAt: new Date("2026-10-22T11:30:00Z") },
  { id: 3, name: "رها صادقی", phone: "09195556677", email: "raha@example.com", topic: "سرمایه‌گذاری طلا", message: "دربارهٔ خرید پله‌ای شمش ۵ گرمی سوال دارم.", source: "وب‌سایت", status: "new", createdAt: new Date("2026-10-26T15:10:00Z") },
  { id: 4, name: "مریم پارسا", phone: "09127778899", email: "maryam@example.com", topic: "مشاورهٔ خرید", message: "گردنبند اسلیمی موجود است؟", source: "وب‌سایت", status: "new", createdAt: new Date("2026-10-28T10:20:00Z") },
];

export const DEMO_SUBSCRIBERS: Subscriber[] = [
  { id: 1, email: "negar.mousavi@example.com", createdAt: new Date("2026-10-10T08:00:00Z") },
  { id: 2, email: "arman.rezaei@example.com", createdAt: new Date("2026-10-17T08:00:00Z") },
  { id: 3, email: "sara.karimi@example.com", createdAt: new Date("2026-10-25T08:00:00Z") },
];
