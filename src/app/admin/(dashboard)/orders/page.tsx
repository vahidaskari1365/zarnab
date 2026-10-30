import { getOrders } from "@/lib/data";
import { formatToman, toPersianDigits } from "@/lib/site";
import { faNumber, formatDate, orderStatusLabels, orderStatusStyles } from "@/lib/admin-ui";
import { updateOrderStatusAction } from "../../actions";
import { IconCart, IconPhone } from "@/components/icons";

export const dynamic = "force-dynamic";

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default async function AdminOrdersPage() {
  const orders = await getOrders(80);
  const total = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-gold-deep">مدیریت فروش</p>
          <h1 className="mt-2 text-2xl font-extrabold text-ink">سفارش‌ها</h1>
          <p className="mt-1 text-xs text-muted">
            {faNumber(orders.length)} سفارش · مجموع {formatToman(total)} تومان
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px]">
          {statuses.map((status) => (
            <span key={status} className={`rounded-full px-3 py-1.5 ${orderStatusStyles[status]}`}>
              {orderStatusLabels[status]}: {faNumber(orders.filter((order) => order.status === status).length)}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-line bg-white/85 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-ink" dir="ltr">{order.orderNumber}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] ${orderStatusStyles[order.status] ?? "bg-cream"}`}>
                    {orderStatusLabels[order.status] ?? order.status}
                  </span>
                  <span className="text-[10px] text-muted">{formatDate(order.createdAt)}</span>
                </div>
                <p className="mt-2 text-xs font-bold text-espresso">{order.customerName}</p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {order.city} · {order.address}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-muted" dir="ltr">
                  <IconPhone className="size-3.5" /> {order.phone}
                </p>
                {order.note && (
                  <p className="mt-1 rounded-lg bg-cream/60 p-2 text-[10px] text-muted">یادداشت: {order.note}</p>
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-extrabold text-gold-deep">{formatToman(order.total)} تومان</p>
                <p className="mt-1 text-[10px] text-muted">
                  {toPersianDigits(order.items.reduce((sum, item) => sum + item.quantity, 0))} قطعه
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 border-t border-line/60 pt-3">
              {order.items.map((item) => (
                <div key={item.slug} className="flex items-center gap-2 rounded-xl bg-cream/50 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt="" className="size-9 rounded-lg object-cover" />
                  <div>
                    <p className="text-[11px] font-bold text-ink">{item.name}</p>
                    <p className="text-[10px] text-muted">
                      {toPersianDigits(item.quantity)} × {formatToman(item.price)} تومان
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form action={updateOrderStatusAction} className="mt-3 flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={order.id} />
              <label htmlFor={`status-${order.id}`} className="text-[10px] text-muted">تغییر وضعیت:</label>
              <select
                id={`status-${order.id}`}
                name="status"
                defaultValue={order.status}
                className="field !w-auto !py-1.5 text-[11px]"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{orderStatusLabels[status]}</option>
                ))}
              </select>
              <button type="submit" className="rounded-full bg-forest px-3 py-1.5 text-[10px] text-ivory hover:bg-forest-deep">
                به‌روزرسانی
              </button>
              <span className="ms-auto text-[10px] text-muted">پرداخت: {order.paymentMethod === "online" ? "آنلاین" : "هماهنگی تلفنی"}</span>
            </form>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="rounded-2xl border border-line bg-white/85 p-10 text-center">
            <IconCart className="mx-auto size-8 text-gold/60" />
            <p className="mt-3 text-sm font-bold text-ink">هنوز سفارشی ثبت نشده است</p>
            <p className="mt-1 text-xs text-muted">سفارش‌های ثبت‌شده در سایت اینجا نمایش داده می‌شوند.</p>
          </div>
        )}
      </div>
    </div>
  );
}
