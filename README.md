# زرناب | ZARNAB — Luxury Gold & Jewellery Store

فروشگاه اینترنتی طلا و جواهرات با پنل مدیریت، طراحی RTL فارسی و بهینه‌سازی کامل برای موتورهای جست‌وجو و موتورهای پاسخ‌گوی هوش مصنوعی.

## Stack

- **Next.js 16 (App Router)** + React 19 + TypeScript
- **PostgreSQL + Drizzle ORM** (`src/db/schema.ts`)
- **Tailwind CSS v4** با توکن‌های برند در `src/app/globals.css`
- فونت‌های محلی: Vazirmatn (متغیر) و Cormorant Garamond در `public/fonts` — بدون درخواست به CDN
- تصاویر اختصاصی پروژه در `public/images`
- **PWA**: manifest کامل (`/manifest.webmanifest`)، سرویس‌ورکر کش‌کننده در `public/sw.js`، صفحهٔ آفلاین، آیکون‌های ۴۸ تا ۵۱۲ + maskable + Apple Touch، نصب‌بانر هوشمند (Android/Chrome و راهنمای iOS)

## اجرا

```bash
npm install
npx drizzle-kit push --config=drizzle.config.json
node scripts/seed.mjs
npm run build && npm start
```

`.env` فقط به `DATABASE_URL` نیاز دارد. برای پنل مدیریت می‌توانید `ADMIN_PASSWORD` و `ADMIN_SECRET` را تنظیم کنید.

## PWA و موبایل

- ثبت خودکار سرویس‌ورکر در محیط production و کش دارایی‌ها، تصاویر و صفحات بازدیدشده
- استراتژی: `network-first` برای ناوبری، `cache-first` برای CSS/JS/فونت، `stale-while-revalidate` برای تصاویر
- مسیرهای حساس (`/admin`, `/api`, `/cart`) هرگز کش نمی‌شوند
- صفحهٔ `/offline` به‌عنوان fallback و نوار ناوبری پایین صفحه در موبایل/تبلت (`MobileTabBar`)
- شورتکات‌های نصب: فروشگاه، سبد خرید، دانشنامه، مشاوره
- `viewport-fit=cover` و رعایت `safe-area-inset` برای نمایش صحیح روی iPhone و تبلت

## پنل مدیریت

- مسیر: `/admin` (ورود: `/admin/login`)
- رمز پیش‌فرض نسخهٔ نمایشی: `zarnab1405`
- امکانات: داشبورد فروش، CRUD محصولات، مدیریت سفارش‌ها، درخواست‌های مشاوره، مشترکان خبرنامه، تنظیمات متادیتا، نرخ طلا، کلمات کلیدی و Citation هوش مصنوعی، مدیریت پرسش‌های متداول
- نشست با کوکی HttpOnly و امضای HMAC محافظت می‌شود (`src/lib/auth.ts`)

## سئو / AEO / GEO

- داده‌های ساخت‌یافته: `JewelryStore`, `WebSite+SearchAction`, `Product+Offer`, `BreadcrumbList`, `FAQPage`, `BlogPosting`, `CollectionPage`, `ItemList`
- `sitemap.xml` پویا، `robots.txt` با دسترسی صریح به ربات‌های AI
- `llms.txt` برای استناد برند در پاسخ‌های هوش مصنوعی و `feed.xml` برای اکتشاف محتوا
- کانونیکال، OpenGraph و Twitter Card برای هر صفحه و صفحه‌بندی وبلاگ/محصول
- مسیرهای خرید و سفارش و صفحهٔ آفلاین از ایندکس خارج هستند
- بخش ادعاهای «دیده‌شدن در ChatGPT/Gemini» از صفحات عمومی حذف شده و فقط به‌عنوان ابزار پایش در پنل مدیریت باقی مانده است

## ساختار اصلی

```
src/app            صفحات فروشگاه، دانشنامه، سبد خرید و پنل ادمین
src/components     کامپوننت‌های UI (هدر، کارت محصول، انیمیشن، فرم‌ها، مشاور هوشمند)
src/lib            داده‌ها، احراز هویت، سبد خرید، توکن‌های برند
src/db             اتصال و اسکیمای Drizzle
scripts/seed.mjs   دادهٔ اولیه (۱۲ محصول، ۶ کالکشن، ۴ مقاله، ۸ پرسش، سفارش و سرنخ)
docs               راهنمای برند و پیاده‌سازی سئو
```
