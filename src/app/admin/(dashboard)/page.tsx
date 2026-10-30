import Link from "next/link";
import {
  getDashboardStats,
  getKeywords,
  getLeads,
  getOrders,
  getProducts,
} from "@/lib/data";
import { formatToman } from "@/lib/site";
import { faNumber, formatDate, leadStatusLabels, orderStatusLabels } from "@/lib/admin-ui";
import { IconArrow, IconBrain, IconCart, IconGem, IconMail, IconTrend } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, orders, leads, keywords, products] = await Promise.all([
    getDashboardStats(),
    getOrders(5),
    getLeads(5),
    getKeywords(),
    getProducts({ limit: 40 }),
  ]);

  const topKeywords = keywords.slice(0, 4);
  const lowStock = products.filter((product) => product.stock <= 3).slice(0, 4);
  const avgPosition = keywords.length
    ? (keywords.reduce((sum, keyword) => sum + keyword.position, 0) / keywords.length).toFixed(1)
    : "0";
  const aiCitations = keywords.reduce((sum, keyword) => sum + keyword.aiCitations, 0);

  const cards = [
    { label: "درآمد ثبت‌شده", value: `${formatToman(stats.revenue)} تومان`, icon: IconTrend, hint: `${faNumber(stats.orderCount)} سفارش` },
    { label: "سفارش در انتظار", value: faNumber(stats.pendingOrders), icon: IconCart, hint: "نیازمند تایید موجودی" },
    { label: "درخواست مشاوره", value: faNumber(stats.newLeads), icon: IconMail, hint: `از مجموع ${faNumber(stats.leadCount)}` },
    { label: "محصولات فعال", value: faNumber(stats.productCount), icon: IconGem, hint: `${faNumber(stats.lowStock)} قطعه کم‌موجود` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-gold-deep">داشبورد مدیریت</p>
          <h1 className="mt-2 text-2xl font-extrabold text-ink">خلاصهٔ امروز گالری</h1>
          <p className="mt-1 text-xs text-muted">
            وضعیت فروش، درخواست‌ها و سلامت سئوی سایت زرناب.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products/new" className="btn btn-gold !px-4 !py-2.5 text-xs">
            افزودن محصول
          </Link>
          <Link href="/admin/seo" className="btn btn-outline !px-4 !py-2.5 text-xs">
            داشبورد سئو
          </Link>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border border-line bg-white/85 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted">{card.label}</span>
                <span className="grid size-8 place-items-center rounded-full bg-cream text-gold-deep">
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="mt-3 text-lg font-extrabold text-ink">{card.value}</p>
              <p className="mt-1 text-[10px] text-muted">{card.hint}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white/85 p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-ink">آخرین سفارش‌ها</h2>
            <Link href="/admin/orders" className="flex items-center gap-1 text-[11px] text-gold-deep">
              همه <IconArrow className="size-3.5" />
            </Link>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-right text-xs">
              <thead>
                <tr className="border-b border-line text-[10px] text-muted">
                  <th className="pb-2 font-medium">شماره</th>
                  <th className="pb-2 font-medium">مشتری</th>
                  <th className="pb-2 font-medium">مبلغ</th>
                  <th className="pb-2 font-medium">وضعیت</th>
                  <th className="pb-2 font-medium">تاریخ</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-line/50 last:border-0">
                    <td className="py-2.5 font-bold text-espresso" dir="ltr">{order.orderNumber}</td>
                    <td className="py-2.5 text-muted">{order.customerName}</td>
                    <td className="py-2.5 text-espresso">{formatToman(order.total)}</td>
                    <td className="py-2.5">
                      <span className="rounded-full bg-cream px-2 py-1 text-[10px] text-gold-deep">
                        {orderStatusLabels[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-[10px] text-muted">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted">سفارشی ثبت نشده است.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-forest-deep p-5 text-ivory">
          <div className="flex items-center gap-2">
            <IconBrain className="size-5 text-gold-light" />
            <h2 className="text-sm font-bold">سلامت سئو و AI</h2>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { label: "میانگین رتبه کلمات", value: avgPosition },
              { label: "Citation در موتورهای AI", value: faNumber(aiCitations) },
              { label: "پوشش داده ساخت‌یافته", value: "۹۶٪" },
              { label: "Core Web Vitals", value: "سبز" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] last:border-0">
                <span className="text-ivory/60">{item.label}</span>
                <span className="font-bold text-gold-light">{item.value}</span>
              </div>
            ))}
          </div>
          <Link href="/admin/seo" className="mt-4 inline-flex items-center gap-1 text-[11px] text-gold-light">
            جزئیات و به‌روزرسانی <IconArrow className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white/85 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-ink">درخواست‌های مشاوره</h2>
            <Link href="/admin/leads" className="text-[11px] text-gold-deep">همه</Link>
          </div>
          <ul className="mt-3 space-y-2.5">
            {leads.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between gap-3 rounded-xl bg-cream/50 p-3">
                <div>
                  <p className="text-xs font-bold text-ink">{lead.name}</p>
                  <p className="mt-0.5 text-[10px] text-muted">{lead.topic} · {lead.phone}</p>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-[10px] text-gold-deep">
                  {leadStatusLabels[lead.status] ?? lead.status}
                </span>
              </li>
            ))}
            {leads.length === 0 && <li className="py-4 text-xs text-muted">درخواستی ثبت نشده است.</li>}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-white/85 p-5">
          <h2 className="text-sm font-bold text-ink">کلمات کلیدی در آستانهٔ صفحهٔ اول</h2>
          <ul className="mt-3 space-y-2.5">
            {topKeywords.map((keyword) => (
              <li key={keyword.id} className="rounded-xl bg-cream/50 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-ink">{keyword.keyword}</span>
                  <span className="text-gold-deep">رتبه {faNumber(keyword.position)}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-gold-deep to-gold-light"
                    style={{ width: `${Math.max(10, 100 - keyword.position * 6)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
          <h2 className="text-sm font-bold text-amber-900">هشدار موجودی</h2>
          <p className="mt-1 text-[11px] text-amber-800">
            این قطعات موجودی کمتری از ۳ عدد دارند؛ برای جلوگیری از توقف فروش، بازتامین کنید.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {lowStock.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}`}
                className="rounded-full border border-amber-300 bg-white px-3 py-1.5 text-[11px] text-amber-900"
              >
                {product.name} · {faNumber(product.stock)} عدد
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
