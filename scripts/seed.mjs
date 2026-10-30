import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const categories = [
  { slug: "necklace", name: "گردنبند", tagline: "امضایی نزدیک به قلب", description: "گردنبندهای ۱۸ عیار با طراحی معاصر و الهام از نقوش اسلیمی؛ از مدل‌های روزمره تا قطعات مجلسی.", image: "/images/necklace.jpg", sort: 1 },
  { slug: "ring", name: "انگشتر", tagline: "جزئیات، در نگاه اول", description: "انگشترهای تک‌نگین، حلقه‌های نامزدی و مدل‌های دست‌ساز با سنگ‌های شناسنامه‌دار.", image: "/images/ring.jpg", sort: 2 },
  { slug: "bracelet", name: "دستبند", tagline: "وزن طلا، روی مچ", description: "دستبندها و النگوهای توپر با پرداخت آینه‌ای یا مات، مناسب استفاده روزانه و هدیه.", image: "/images/bracelet.jpg", sort: 3 },
  { slug: "earrings", name: "گوشواره", tagline: "روشنایی، کنار صورت", description: "گوشواره‌های آویز و میخی با مروارید و زمرد؛ سبک و راحت برای تمام روز.", image: "/images/earrings.jpg", sort: 4 },
  { slug: "set", name: "نیم‌ست", tagline: "هماهنگی کامل", description: "نیم‌ست‌های عروس و مجلسی، طراحی یکپارچه با گردنبند و گوشواره هم‌خانواده.", image: "/images/set.jpg", sort: 5 },
  { slug: "bullion", name: "سکه و شمش", tagline: "دارایی، در دست", description: "سکه بهار آزادی و شمش‌های ۱ تا ۱۰ گرمی با ضمانت و فاکتور رسمی.", image: "/images/coins.jpg", sort: 6 },
];

const products = [
  {
    slug: "grdnbnd-mehra", name: "گردنبند مهرآرا", subtitle: "زمرد کلمبیایی، زنجیر ونیزی ۱۸ عیار",
    description: "گردنبند مهرآرا با زنجیر ونیزی ۱۸ عیار و آویز زمرد طبیعی کلمبیایی، برای کسی طراحی شده که جزئیات را می‌بیند. طول زنجیر قابل تنظیم میان ۴۰ و ۴۵ سانتی‌متر است و قفل آن از نوع جعبه‌ای ایمن با تاییدیهٔ کارگاه است.",
    story: "مهرآرا از دل یک نقاشی قدیمی ایرانی بیرون آمده است؛ جایی که نور از میان شیشه‌های رنگی می‌گذرد و روی دست زن می‌نشیند. هر آویز در دو مرحله پرداخت دستی می‌شود تا درخشش زمرد در نور کم هم دیده شود.",
    category: "necklace", price: 42800000, compare: 47500000, weight: 5, karat: "18", stone: "زمرد طبیعی با گواهی", stock: 6, images: ["/images/necklace.jpg", "/images/set.jpg", "/images/hero-secondary.jpg"], badge: "پرفروش", featured: true, rating: 49, reviews: 38,
  },
  {
    slug: "grdnbnd-eslimi", name: "گردنبند اسلیمی", subtitle: "نقش اسلیمی، پرداخت دستی",
    description: "بازخوانی مدرن نقش اسلیمی در قالب گردنبندی سبک و مجلسی. سطح قطعه با تکنیک مات‌کاری پولیش شده تا نقش‌ها عمق پیدا کنند و درخشش طلا آرام و لوکس بماند.",
    story: "این قطعه حاصل همکاری سه نسل از استادکاران زرناب است؛ از طراح تا قلم‌زن و پرداخت‌کار. طراحی اسلیمی آن با نسبت‌های طلایی ترسیم شده است.",
    category: "necklace", price: 51900000, compare: null, weight: 6, karat: "18", stone: "بدون سنگ", stock: 4, images: ["/images/hero-secondary.jpg", "/images/necklace.jpg"], badge: "کالکشن اسلیمی", featured: true, rating: 48, reviews: 21,
  },
  {
    slug: "angoshtar-almas-shab", name: "انگشتر الماس شب", subtitle: "الماس ۰٫۴ قیراط با گواهی GIA",
    description: "انگشتر سولیتر با الماس برلیان ۰٫۴ قیراط، رنگ F و پاکی VS1. رینگ از طلای ۱۸ عیار سفید با آبکاری رودیوم و مخراج‌کاری دستی است. گواهی GIA و شناسنامه قطعه همراه سفارش ارسال می‌شود.",
    story: "برای شب‌های مهم، الماس نباید فریاد بزند؛ باید بدرخشد. الماس شب با کمترین فلز و بیشترین نور طراحی شده تا تمرکز کامل روی سنگ باشد.",
    category: "ring", price: 68400000, compare: 72500000, weight: 4, karat: "18", stone: "الماس ۰٫۴ قیراط GIA", stock: 2, images: ["/images/ring.jpg", "/images/campaign.jpg"], badge: "سنگ گواهی‌دار", featured: true, rating: 50, reviews: 14,
  },
  {
    slug: "angoshtar-niloofar", name: "انگشتر نیلوفر", subtitle: "حلقه توپر با تراش نیلوفر",
    description: "حلقه‌ای توپر با حجم کنترل‌شده و شیارهای ظریف الهام‌گرفته از گل نیلوفر. مناسب استفاده روزانه و ترکیب با سایر رینگ‌های زرناب.",
    story: "نیلوفر، نماد پاکی در هنر ایرانی است. فرم گل با مدل‌سازی سه‌بعدی بررسی و سپس با دست اجرا شده تا لبه‌ها بی‌نقص و راحت باشند.",
    category: "ring", price: 39900000, compare: null, weight: 4, karat: "18", stone: "بدون سنگ", stock: 8, images: ["/images/ring.jpg", "/images/hero-secondary.jpg"], badge: null, featured: false, rating: 47, reviews: 26,
  },
  {
    slug: "dastband-hamhame", name: "دستبند همهمه", subtitle: "توپر، پرداخت آینه‌ای",
    description: "دستبند توپر ۱۸ عیار با پرداخت آینه‌ای و قفل جعبه‌ای دولایه. وزن و تعادل قطعه روی مچ بررسی شده تا در استفادهٔ روزمره جابه‌جا نشود.",
    story: "همهمه، صدای طلا روی میز کارگاه است. این دستبند از یک شمش تک‌پارچه ساخته می‌شود و هیچ اتصال ظاهری در بدنهٔ آن دیده نمی‌شود.",
    category: "bracelet", price: 61200000, compare: 65800000, weight: 8, karat: "18", stone: "بدون سنگ", stock: 3, images: ["/images/bracelet.jpg", "/images/campaign.jpg"], badge: "پیشنهاد زرناب", featured: true, rating: 49, reviews: 31,
  },
  {
    slug: "dastband-gold-hammered", name: "دستبند چکش‌خورده", subtitle: "بافت چکش‌کاری، سبک روزانه",
    description: "دستبند سبک با بافت چکش‌کاری دستی و قفل مگنتی ایمن. هر قطعه الگوی چکش‌کاری منحصربه‌فرد خود را دارد.",
    story: "چکش‌کاری، اثر انگشت استادکار روی طلاست. به همین دلیل هیچ دو دستبندی کاملاً شبیه هم نیستند.",
    category: "bracelet", price: 44700000, compare: null, weight: 6, karat: "18", stone: "بدون سنگ", stock: 7, images: ["/images/bracelet.jpg", "/images/hero-secondary.jpg"], badge: null, featured: false, rating: 48, reviews: 18,
  },
  {
    slug: "gooshvare-ghatre", name: "گوشواره قطره", subtitle: "مروارید پرورشی و زمرد",
    description: "گوشواره‌های آویز با مروارید پرورشی و سنگ زمرد کوچک. وزن سبک و پشت‌بند محافظ برای استفاده طولانی.",
    story: "قطره، ساده‌ترین فرمی است که نور را نگه می‌دارد. این گوشواره از یک قطره کوچک الهام گرفته و در سه نسخهٔ پرداخت اجرا شده است.",
    category: "earrings", price: 29600000, compare: 32400000, weight: 3, karat: "18", stone: "مروارید و زمرد", stock: 9, images: ["/images/earrings.jpg", "/images/set.jpg"], badge: "تازه رسیده", featured: true, rating: 49, reviews: 24,
  },
  {
    slug: "gooshvare-parande", name: "گوشواره پرنده", subtitle: "مینیاتور پرندهٔ ایرانی",
    description: "گوشواره‌های میخی با نقش مینیاتوری پرنده، اجرا شده با تکنیک قلم‌زنی ریز. سبک و مناسب استفادهٔ روزانه.",
    story: "نقش پرنده از مینیاتورهای اصفهان گرفته شده؛ نمادی از آزادی و سبک‌بالی در طراحی.",
    category: "earrings", price: 25300000, compare: null, weight: 2, karat: "18", stone: "بدون سنگ", stock: 11, images: ["/images/earrings.jpg", "/images/campaign.jpg"], badge: null, featured: false, rating: 47, reviews: 12,
  },
  {
    slug: "nimset-shahrzad", name: "نیم‌ست شهرزاد", subtitle: "گردنبند و گوشوارهٔ عروس",
    description: "نیم‌ست کامل عروس شامل گردنبند، گوشواره و پلاک هم‌خانواده با پرداخت براق. طراحی متعادل برای یقه‌های باز و آرایش موی جمع.",
    story: "شهرزاد برای شب‌های هزار و یکم ساخته شده؛ مجموعه‌ای که در عین جلب توجه، سنگین نیست و امکان استفادهٔ جداگانه از هر قطعه را می‌دهد.",
    category: "set", price: 78900000, compare: 84900000, weight: 9, karat: "18", stone: "مروارید پرورشی", stock: 2, images: ["/images/set.jpg", "/images/earrings.jpg", "/images/hero.jpg"], badge: "کالکشن عروس", featured: true, rating: 50, reviews: 17,
  },
  {
    slug: "nimset-yas", name: "نیم‌ست یاس", subtitle: "طراحی مینیمال، هم‌خانواده",
    description: "نیم‌ست یاس با فرم‌های نرم و ظریف، طراحی‌شده برای استفادهٔ همزمان یا جداگانه. پرداخت مات برای درخشش ملایم.",
    story: "یاس از گل‌های محبوب حیاط‌های ایرانی است؛ این نیم‌ست همان حس آرام و آشنا را به جواهر ترجمه می‌کند.",
    category: "set", price: 58400000, compare: null, weight: 7, karat: "18", stone: "زیرکن", stock: 4, images: ["/images/set.jpg", "/images/necklace.jpg"], badge: null, featured: false, rating: 48, reviews: 9,
  },
  {
    slug: "sekke-bahar-azadi", name: "سکه تمام بهار آزادی", subtitle: "ضرب بانک مرکزی، طرح جدید",
    description: "سکه تمام بهار آزادی طرح جدید با ضمانت اصالت، همراه کاور و فاکتور رسمی. امکان تحویل حضوری در گالری زرناب.",
    story: "سکه، ساده‌ترین شکل حفظ ارزش است؛ زرناب اصالت و سلامت فیزیکی هر سکه را پیش از تحویل بررسی می‌کند.",
    category: "bullion", price: 78500000, compare: null, weight: 8, karat: "24", stone: "بدون سنگ", stock: 14, images: ["/images/coins.jpg", "/images/hero-secondary.jpg"], badge: "سرمایه‌ای", featured: true, rating: 49, reviews: 42,
  },
  {
    slug: "shemesh-5-gram", name: "شمش طلای ۵ گرمی", subtitle: "خلوص ۹۹۵، مهر سازنده",
    description: "شمش طلای ۵ گرمی با خلوص ۹۹۵ و مهر معتبر سازنده، در بسته‌بندی پلمب‌شده. مناسب سرمایه‌گذاری میان‌مدت و هدیهٔ ارزشمند.",
    story: "شمش‌های زرناب از تامین‌کنندگان دارای مجوز تهیه می‌شوند و شمارهٔ سریال روی هر قطعه ثبت می‌شود.",
    category: "bullion", price: 34800000, compare: 36200000, weight: 5, karat: "24", stone: "بدون سنگ", stock: 20, images: ["/images/coins.jpg"], badge: null, featured: false, rating: 48, reviews: 33,
  },
];

const posts = [
  {
    slug: "rahnama-kharid-tala-18-ayar",
    title: "راهنمای کامل خرید طلای ۱۸ عیار؛ از عیار تا اجرت",
    excerpt: "قبل از خرید طلا بدانید پول شما دقیقاً بابت چه چیزی پرداخت می‌شود: ارزش طلا، اجرت ساخت، سود فروشنده و مالیات بر ارزش افزوده.",
    category: "راهنمای خرید",
    cover: "/images/necklace.jpg",
    read: 8,
    tags: ["خرید طلا", "عیار ۱۸", "اجرت ساخت"],
    content: `<h2>عیار ۱۸ یعنی چه؟</h2><p>طلای ۱۸ عیار دارای ۷۵۰ قسمت طلای خالص در هر ۱۰۰۰ قسمت است. این ترکیب، تعادل مطلوبی میان درخشش، استحکام و دوام ایجاد می‌کند و به همین دلیل استاندارد اصلی جواهرات در ایران است.</p><h2>قیمت طلا از چه اجزایی تشکیل می‌شود؟</h2><p>قیمت نهایی هر قطعه از جمع <strong>ارزش طلای خالص</strong>، <strong>اجرت ساخت</strong>، <strong>سود فروشنده</strong> و <strong>مالیات بر ارزش افزوده</strong> به دست می‌آید. در زرناب هر چهار جزء روی فاکتور و صفحه محصول شفاف اعلام می‌شود.</p><h3>اجرت ساخت چرا متفاوت است؟</h3><p>قطعات دست‌ساز، مخراج‌کاری سنگ و پرداخت‌های خاص زمان بیشتری می‌برند و اجرت بالاتری دارند. برای سرمایه‌گذاری، قطعات کم‌اجرت و شمش مناسب‌ترند و برای استفادهٔ روزمره، ارزش طراحی و دوام اهمیت بیشتری دارد.</p><h2>پیش از خرید چه چیزی را بررسی کنیم؟</h2><ul><li>مهر و شمارهٔ قطعه روی جواهر</li><li>فاکتور رسمی با وزن دقیق و عیار</li><li>گواهی سنگ در صورت وجود نگین</li><li>شرایط بازخرید و تعویض</li></ul><p>زرناب برای هر خرید شناسنامهٔ دیجیتال صادر می‌کند که با کد قطعه در همین سایت قابل استعلام است.</p>`,
  },
  {
    slug: "entekhab-angooshtar-namzadi",
    title: "انتخاب انگشتر نامزدی؛ ۶ اصل که خرید را آسان می‌کند",
    excerpt: "از انتخاب سنگ تا سایز انگشت و سبک رینگ؛ چک‌لیستی که کمک می‌کند انتخاب درستی برای یک عمر داشته باشید.",
    category: "راهنمای خرید",
    cover: "/images/ring.jpg",
    read: 6,
    tags: ["انگشتر نامزدی", "الماس", "سایزبندی"],
    content: `<h2>۱. بودجه را قبل از دیدن سنگ مشخص کنید</h2><p>قیمت الماس بر اساس ۴C تعیین می‌شود: قیراط، رنگ، پاکی و تراش. کمی انعطاف در رنگ و پاکی، قیراط بزرگ‌تری در همان بودجه به شما می‌دهد.</p><h2>۲. تراش، مهم‌تر از اندازه</h2><p>تراش خوب نور را به چشم برمی‌گرداند. الماس با تراش عالی و قیراط کمتر، اغلب درخشان‌تر از سنگ بزرگ‌تر با تراش ضعیف است.</p><h2>۳. فلز را با سبک زندگی هماهنگ کنید</h2><p>طلای سفید برای استفادهٔ روزمره مقاوم است؛ طلای زرد حس کلاسیک‌تری دارد و رزگلد گرم و متفاوت است.</p><h2>۴. سایز انگشت را در پایان روز بگیرید</h2><p>دمای بدن و ساعت روز روی اندازهٔ انگشت اثر می‌گذارد. یک بار صبح و یک بار شب اندازه بگیرید و میانگین را انتخاب کنید.</p><h2>۵. ارتفاع نگین را فراموش نکنید</h2><p>نگین‌های بلند زیبا هستند اما به لباس و وسایل روزمره گیر می‌کنند. برای استفادهٔ همیشگی، نگین کوتاه‌تر انتخاب مطمئن‌تری است.</p><h2>۶. گواهی و شرایط پس‌ازفروش</h2><p>گواهی GIA یا آزمایشگاه معتبر و خدمات سایزبندی رایگان، ارزش واقعی خرید را بالا می‌برد.</p>`,
  },
  {
    slug: "negahdari-javaherat",
    title: "نگهداری جواهرات؛ عادت‌های ساده برای درخشش همیشگی",
    excerpt: "طلا فرسوده نمی‌شود اما کدر می‌شود. چند عادت روزمره و یک روتین ماهانه، درخشش قطعات شما را حفظ می‌کند.",
    category: "مراقبت",
    cover: "/images/earrings.jpg",
    read: 5,
    tags: ["نگهداری", "تمیز کردن طلا", "مروارید"],
    content: `<h2>قانون آخرین قطعه، اولین قطعه</h2><p>جواهرات را بعد از عطر و آرایش ببندید و پیش از ورزش یا خواب باز کنید. عطر، کرم و عرق روی سطح طلا لایهٔ نازکی می‌سازند که درخشش را کم می‌کند.</p><h2>تمیز کردن خانگی</h2><p>آب گرم، چند قطره صابون ملایم و یک برس نرم کافی است. مروارید و زمرد را هرگز در آب نخوابانید و از دستگاه اولتراسونیک برای سنگ‌های رنگی استفاده نکنید.</p><h2>نگهداری درست</h2><p>هر قطعه در جاکادویی جدا و در محیط خشک نگهداری شود. زنجیرها را قفل‌شده و آویزان نگه دارید تا گره نخورند.</p><h2>بازرسی سالانه</h2><p>سالانه یک بار قطعات را برای بررسی قفل، مخراج‌کاری و سلامت سنگ به گالری بیاورید. این سرویس برای مشتریان زرناب رایگان است.</p>`,
  },
  {
    slug: "sarmayegozari-tala-2026",
    title: "طلا به‌عنوان دارایی؛ چطور وزن و اجرت را بهینه کنیم؟",
    excerpt: "اگر هدف شما حفظ ارزش است، انتخاب قطعه با اجرت پایین، وزن مشخص و قابلیت بازخرید، مهم‌تر از طراحی است.",
    category: "سرمایه‌گذاری",
    cover: "/images/coins.jpg",
    read: 7,
    tags: ["سرمایه‌گذاری طلا", "شمش", "بازخرید"],
    content: `<h2>ارزش ذاتی در برابر ارزش طراحی</h2><p>در بازخرید، طلا بر اساس وزن و عیار ارزیابی می‌شود؛ اجرت ساخت بازگشت‌پذیر نیست. اگر هدف سرمایه‌گذاری است، سهم اجرت را پایین نگه دارید.</p><h2>شمش یا طلای زینتی؟</h2><p>شمش و سکه اجرت کمتری دارند و نقدشوندگی بالاتری دارند. قطعات زینتی هم ارزش ذاتی خود را حفظ می‌کنند اما بخشی از قیمت، هزینهٔ طراحی است.</p><h2>تقسیم خرید در زمان</h2><p>خرید پله‌ای در چند نوبت، ریسک انتخاب یک قیمت نامناسب را کاهش می‌دهد. برای دارایی بلندمدت، وزن بهتری از قطعات خرد تهیه کنید.</p><h2>فاکتور و ضمانت، بخشی از دارایی شماست</h2><p>بدون فاکتور رسمی، فروش دارایی سخت‌تر و ارزان‌تر می‌شود. در زرناب تمام خریدها با فاکتور رسمی و شناسنامهٔ دیجیتال ثبت می‌شنود.</p>`,
  },
];

const faqs = [
  { q: "آیا جواهرات زرناب اصل هستند؟", a: "بله. تمام قطعات با طلای ۱۸ عیار (۷۵۰) یا ۲۴ عیار برای شمش عرضه می‌شوند. هر قطعه پیش از ارسال آزمایش عیار می‌شود و همراه فاکتور رسمی و شناسنامهٔ دیجیتال با کد استعلام یکتا ارسال می‌گردد.", c: "اصالت و ضمانت", sort: 1 },
  { q: "شرایط بازخرید و تعویض چیست؟", a: "بازخرید طلای زرناب بر اساس نرخ روز و با کسر کارمزد شفاف انجام می‌شود. تا ۷ روز پس از خرید، تعویض یا بازگشت کامل قطعه در صورت سالم بودن آن ممکن است. قطعات سفارشی با نام حکاکی، مشمول بازگشت نیستند.", c: "پس‌ازفروش", sort: 2 },
  { q: "ارسال چقدر زمان می‌برد و آیا بیمه است؟", a: "ارسال در تهران با پیک اختصاصی ۲۴ ساعته و رایگان انجام می‌شود. شهرستان‌ها با پست پیشتاز بیمه‌شده و کد رهگیری، بین ۲ تا ۴ روز کاری تحویل می‌گیرند. تمام بسته‌ها تا زمان تحویل بیمه هستند.", c: "ارسال", sort: 3 },
  { q: "روش پرداخت و امکان خرید قسطی وجود دارد؟", a: "پرداخت آنلاین از طریق درگاه امن بانکی، کارت به کارت و پرداخت حضوری در گالری پذیرفته می‌شود. برای خریدهای بالای ۵۰ میلیون تومان، امکان پرداخت در دو قسط با چک صیادی مورد تایید فراهم است.", c: "پرداخت", sort: 4 },
  { q: "اگر سایز انگشتر مناسب نباشد چه می‌شود؟", a: "سایزبندی نخست برای همهٔ انگشترها رایگان است. اگر پس از تحویل سایز مناسب نبود، یک بار تغییر سایز بدون هزینه انجام می‌شود؛ به‌جز رینگ‌های تمام‌سنگ که امکان تغییر محدود دارند.", c: "سایزبندی", sort: 5 },
  { q: "برای خرید عروس چه خدماتی دارید؟", a: "مشاورهٔ اختصاصی عروس، انتخاب نیم‌ست هماهنگ با لباس و آرایش، امکان سفارش طراحی اختصاصی و سرویس امانت‌گذاری برای عکاسی در زرناب فراهم است. برای رزرو مشاوره از صفحهٔ تماس استفاده کنید.", c: "عروس", sort: 6 },
  { q: "شناسنامهٔ دیجیتال قطعه چیست؟", a: "برای هر قطعه یک صفحهٔ استعلام اختصاصی ثبت می‌شود که شامل وزن، عیار، مشخصات سنگ، تصویر قطعه و تاریخ خرید است. این اطلاعات مبنای خدمات پس‌ازفروش و بازخرید خواهد بود.", c: "اصالت و ضمانت", sort: 7 },
  { q: "آیا امکان سفارش طراحی خاص وجود دارد؟", a: "بله. در بخش سفارشی، طرح یا تصویر مورد نظر خود را برای ما ارسال کنید. تیم طراحی زرناب پس از بررسی امکان‌سنجی، طرح سه‌بعدی و برآورد قیمت را حداکثر در سه روز کاری ارائه می‌دهد.", c: "سفارشی", sort: 8 },
];

const keywords = [
  { k: "خرید طلا", intent: "transactional", vol: 74000, pos: 2, prev: 5, page: "/products", ai: 12 },
  { k: "قیمت طلای ۱۸ عیار", intent: "informational", vol: 181000, pos: 4, prev: 9, page: "/journal/rahnama-kharid-tala-18-ayar", ai: 21 },
  { k: "انگشتر الماس", intent: "commercial", vol: 22000, pos: 3, prev: 4, page: "/products/angoshtar-almas-shab", ai: 7 },
  { k: "گردنبند طلا زنانه", intent: "commercial", vol: 33000, pos: 5, prev: 11, page: "/collections/necklace", ai: 9 },
  { k: "نیم‌ست عروس", intent: "commercial", vol: 18100, pos: 2, prev: 6, page: "/collections/set", ai: 5 },
  { k: "قیمت سکه بهار آزادی", intent: "informational", vol: 240000, pos: 6, prev: 12, page: "/products/sekke-bahar-azadi", ai: 18 },
  { k: "دستبند طلا مردانه", intent: "commercial", vol: 9800, pos: 8, prev: 14, page: "/products", ai: 3 },
  { k: "بهترین طلاساز تهران", intent: "local", vol: 2100, pos: 1, prev: 3, page: "/about", ai: 4 },
  { k: "نگهداری جواهرات", intent: "informational", vol: 4400, pos: 3, prev: 8, page: "/journal/negahdari-javaherat", ai: 11 },
  { k: "شمش طلا ۵ گرمی", intent: "transactional", vol: 3200, pos: 2, prev: 5, page: "/products/shemesh-5-gram", ai: 2 },
];

const settings = [
  ["announcement", "ارسال بیمه‌شدهٔ رایگان برای سفارش‌های بالای ۳۰ میلیون تومان — مشاورهٔ اختصاصی: ۰۲۱-۹۱۰۰۸۸۴۲"],
  ["gold_price_18", "6450000"],
  ["hero_eyebrow", "کالکشن طلوع ۱۴۰۵"],
  ["hero_title", "ارزش را به ارث بگذارید"],
  ["hero_subtitle", "طلای ۱۸ عیار و جواهرات دست‌ساز ایرانی؛ طراحی‌شده برای لحظه‌هایی که می‌مانند. ضمانت اصالت، سنگ شناسنامه‌دار و بازخرید تضمینی."],
  ["seo_title", "زرناب | گالری طلا و جواهرات ۱۸ عیار دست‌ساز"],
  ["seo_description", "خرید آنلاین طلای ۱۸ عیار و جواهرات دست‌ساز با ضمانت اصالت، سنگ شناسنامه‌دار و بازخرید تضمینی. گالری زرناب، تهران."],
  ["ai_visibility_score", "87"],
  ["schema_coverage", "96"],
  ["core_web_vitals", "94"],
];

async function main() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("TRUNCATE TABLE products, categories, posts, faqs, keywords, orders, leads, settings, subscribers RESTART IDENTITY CASCADE");

    for (const c of categories) {
      await client.query(
        `INSERT INTO categories (slug, name, tagline, description, image, sort_order) VALUES ($1,$2,$3,$4,$5,$6)`,
        [c.slug, c.name, c.tagline, c.description, c.image, c.sort],
      );
    }

    for (const p of products) {
      await client.query(
        `INSERT INTO products (slug, name, subtitle, description, story, category_slug, price, compare_at_price, weight_grams, karat, stone, stock, images, badge, featured, rating_x10, review_count)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
        [p.slug, p.name, p.subtitle, p.description, p.story, p.category, p.price, p.compare, p.weight, p.karat, p.stone, p.stock, JSON.stringify(p.images), p.badge, p.featured, p.rating, p.reviews],
      );
    }

    for (const post of posts) {
      await client.query(
        `INSERT INTO posts (slug, title, excerpt, content, category, cover, read_minutes, tags) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [post.slug, post.title, post.excerpt, post.content, post.category, post.cover, post.read, JSON.stringify(post.tags)],
      );
    }

    for (const f of faqs) {
      await client.query(`INSERT INTO faqs (question, answer, category, sort_order) VALUES ($1,$2,$3,$4)`, [f.q, f.a, f.c, f.sort]);
    }

    for (const k of keywords) {
      await client.query(
        `INSERT INTO keywords (keyword, intent, volume, position, previous_position, landing_page, ai_citations) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [k.k, k.intent, k.vol, k.pos, k.prev, k.page, k.ai],
      );
    }

    for (const [key, value] of settings) {
      await client.query(`INSERT INTO settings (key, value) VALUES ($1,$2)`, [key, value]);
    }

    const sampleOrders = [
      ["ZR-140501", "نگار موسوی", "09121234567", "تهران", "ولنجک، خیابان ۲۶", [{ slug: "grdnbnd-mehra", name: "گردنبند مهرآرا", price: 42800000, quantity: 1, image: "/images/necklace.jpg", weightGrams: 5 }], 42800000, "shipped"],
      ["ZR-140502", "آرمان رضایی", "09351112233", "اصفهان", "خیابان چهارباغ، کوچه ۱۴", [{ slug: "angoshtar-almas-shab", name: "انگشتر الماس شب", price: 68400000, quantity: 1, image: "/images/ring.jpg", weightGrams: 4 }], 68400000, "processing"],
      ["ZR-140503", "سارا کریمی", "09122223344", "شیراز", "بلوار زند، برج یاس", [{ slug: "nimset-shahrzad", name: "نیم‌ست شهرزاد", price: 78900000, quantity: 1, image: "/images/set.jpg", weightGrams: 9 }], 78900000, "pending"],
      ["ZR-140504", "مهسا اکبری", "09197778899", "کرج", "گوهردشت، خیابان ۵", [{ slug: "gooshvare-ghatre", name: "گوشواره قطره", price: 29600000, quantity: 2, image: "/images/earrings.jpg", weightGrams: 3 }], 59200000, "delivered"],
      ["ZR-140505", "حسین نوری", "09121119988", "مشهد", "بلوار سجاد، خیابان ۱۲", [{ slug: "sekke-bahar-azadi", name: "سکه تمام بهار آزادی", price: 78500000, quantity: 1, image: "/images/coins.jpg", weightGrams: 8 }], 78500000, "processing"],
    ];

    for (const [num, name, phone, city, addr, items, total, status] of sampleOrders) {
      await client.query(
        `INSERT INTO orders (order_number, customer_name, phone, city, address, items, total, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [num, name, phone, city, addr, JSON.stringify(items), total, status],
      );
    }

    const sampleLeads = [
      ["لیلا احمدی", "09123334455", "leila@example.com", "مشاورهٔ نیم‌ست عروس", "برای مراسم شهریور ماه به مشاورهٔ حضوری نیاز دارم."],
      ["سپهر دادگر", "09364445566", "sepehr@example.com", "سفارش طراحی اختصاصی", "طرح انگشتر با سنگ فیروزهٔ نیشابوری مدنظرم است."],
      ["رها صادقی", "09195556677", "raha@example.com", "سرمایه‌گذاری طلا", "دربارهٔ خرید پله‌ای شمش ۵ گرمی سوال دارم."],
      ["مریم پارسا", "09127778899", "maryam@example.com", "مشاورهٔ خرید", "گردنبند اسلیمی موجود است؟"],
    ];
    for (const [name, phone, email, topic, message] of sampleLeads) {
      await client.query(
        `INSERT INTO leads (name, phone, email, topic, message, source) VALUES ($1,$2,$3,$4,$5,$6)`,
        [name, phone, email, topic, message, "وب‌سایت"],
      );
    }

    await client.query("COMMIT");
    console.log(`Seeded ${categories.length} categories, ${products.length} products, ${posts.length} posts.`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
