"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatToman, site, toPersianDigits } from "@/lib/site";
import {
  IconArrow,
  IconCart,
  IconCheck,
  IconMinus,
  IconPlus,
  IconSeal,
  IconShield,
  IconTruck,
} from "./icons";

const FREE_SHIPPING_THRESHOLD = 30_000_000;
const SHIPPING_COST = 450_000;

type Result = { orderNumber: string; total: number };

export function CartView() {
  const { items, ready, count, subtotal, setQuantity, remove, clear } = useCart();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("customerName"),
          phone: form.get("phone"),
          email: form.get("email"),
          city: form.get("city"),
          address: form.get("address"),
          note: form.get("note"),
          paymentMethod: form.get("paymentMethod"),
          items: items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        orderNumber?: string;
        total?: number;
      };
      if (!response.ok || !data.ok || !data.orderNumber) {
        throw new Error(data.message || "ثبت سفارش ناموفق بود");
      }
      setResult({ orderNumber: data.orderNumber, total: data.total ?? total });
      clear();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "خطای نامشخص");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-gold/30 bg-white/80 p-8 text-center shadow-lg">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-gold-pale text-gold-deep">
          <IconCheck className="size-8" />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold text-ink">سفارش شما ثبت شد</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          شمارهٔ سفارش شما <strong className="text-gold-deep">{result.orderNumber}</strong> است.
          کارشناس زرناب برای تایید نهایی و هماهنگی ارسال، تا یک روز کاری تماس می‌گیرد.
        </p>
        <div className="mt-5 rounded-2xl border border-line bg-cream/60 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted">مبلغ قابل پرداخت</span>
            <span className="font-extrabold text-ink">{formatToman(result.total)} تومان</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted">روش پرداخت</span>
            <span className="text-espresso">لینک پرداخت پس از تایید موجودی ارسال می‌شود</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn btn-gold text-xs">
            ادامهٔ خرید
          </Link>
          <a href={`tel:${site.phoneHref}`} className="btn btn-outline text-xs">
            تماس با پشتیبانی
          </a>
        </div>
      </div>
    );
  }

  if (!ready) {
    return <p className="py-20 text-center text-sm text-muted">در حال بارگذاری سبد خرید…</p>;
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-[1.75rem] border border-line bg-white/70 p-10 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-cream text-gold-deep">
          <IconCart className="size-8" />
        </span>
        <h1 className="mt-5 text-xl font-extrabold text-ink">سبد خرید شما خالی است</h1>
        <p className="mt-2 text-sm leading-7 text-muted">
          کالکشن‌های زرناب را ببینید یا با مشاور هوشمند خرید، قطعهٔ مناسب بودجه و مناسبت خود را پیدا
          کنید.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn btn-gold text-xs">
            مشاهدهٔ فروشگاه
          </Link>
          <Link href="/contact" className="btn btn-outline text-xs">
            مشاورهٔ خرید
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      <div>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex gap-4 rounded-2xl border border-line bg-white/75 p-3 md:p-4"
            >
              <Link href={`/products/${item.slug}`} className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-20 rounded-xl object-cover md:size-24"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/products/${item.slug}`} className="text-sm font-bold text-ink hover:text-gold-deep">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-[11px] text-muted">
                      {item.weightGrams ? `${toPersianDigits(item.weightGrams)} گرم · طلای ۱۸ عیار` : "قطعهٔ گالری"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.slug)}
                    className="text-[11px] text-muted underline-offset-4 hover:text-wine hover:underline"
                  >
                    حذف
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center rounded-full border border-line bg-ivory">
                    <button
                      type="button"
                      aria-label="افزایش"
                      onClick={() => setQuantity(item.slug, item.quantity + 1)}
                      className="grid size-8 place-items-center text-espresso hover:text-gold-deep"
                    >
                      <IconPlus className="size-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{toPersianDigits(item.quantity)}</span>
                    <button
                      type="button"
                      aria-label="کاهش"
                      onClick={() => setQuantity(item.slug, item.quantity - 1)}
                      className="grid size-8 place-items-center text-espresso hover:text-gold-deep"
                    >
                      <IconMinus className="size-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-extrabold text-ink">
                    {formatToman(item.price * item.quantity)}
                    <span className="ms-1 text-[10px] font-medium text-muted">تومان</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {step === "checkout" ? (
          <form onSubmit={submitOrder} className="mt-5 rounded-3xl border border-line bg-white/80 p-5 md:p-6">
            <h2 className="text-base font-bold text-ink">اطلاعات تحویل و پرداخت</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="customerName">نام و نام خانوادگی *</label>
                <input id="customerName" name="customerName" required className="field" />
              </div>
              <div>
                <label className="field-label" htmlFor="phone">شماره موبایل *</label>
                <input id="phone" name="phone" required dir="ltr" pattern="09[0-9]{9}" className="field text-left" placeholder="09121234567" />
              </div>
              <div>
                <label className="field-label" htmlFor="email">ایمیل</label>
                <input id="email" name="email" type="email" dir="ltr" className="field text-left" />
              </div>
              <div>
                <label className="field-label" htmlFor="city">شهر *</label>
                <input id="city" name="city" required className="field" placeholder="تهران" />
              </div>
            </div>
            <div className="mt-4">
              <label className="field-label" htmlFor="address">نشانی کامل *</label>
              <textarea id="address" name="address" required rows={2} className="field resize-none" />
            </div>
            <div className="mt-4">
              <label className="field-label" htmlFor="note">توضیح سفارش</label>
              <textarea id="note" name="note" rows={2} className="field resize-none" placeholder="سایز، بسته‌بندی هدیه، زمان تحویل…" />
            </div>
            <fieldset className="mt-4">
              <legend className="field-label">روش پرداخت</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { value: "online", label: "پرداخت آنلاین (درگاه امن)" },
                  { value: "transfer", label: "کارت به کارت / هماهنگی تلفنی" },
                ].map((option, index) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-ivory/70 p-3 text-xs text-espresso has-[:checked]:border-gold has-[:checked]:bg-gold-pale/50"
                  >
                    <input type="radio" name="paymentMethod" value={option.value} defaultChecked={index === 0} className="accent-[#b8893b]" />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
            {error && <p className="mt-3 rounded-xl bg-wine/10 p-3 text-xs text-wine">{error}</p>}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button type="submit" disabled={loading} className="btn btn-gold flex-1 text-xs disabled:opacity-60">
                {loading ? "در حال ثبت سفارش…" : "ثبت نهایی سفارش"}
              </button>
              <button type="button" onClick={() => setStep("cart")} className="btn btn-outline text-xs">
                بازگشت به سبد
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setStep("checkout")}
            className="btn btn-gold mt-5 w-full text-xs"
          >
            ادامهٔ فرآیند خرید
            <IconArrow className="size-4" />
          </button>
        )}
      </div>

      <aside className="h-fit rounded-3xl border border-line bg-white/80 p-5 lg:sticky lg:top-28">
        <h2 className="text-sm font-bold text-ink">خلاصهٔ سفارش</h2>
        <div className="mt-4 space-y-2.5 text-xs">
          <div className="flex justify-between text-muted">
            <span>جمع کالاها ({toPersianDigits(count)} قطعه)</span>
            <span className="font-bold text-espresso">{formatToman(subtotal)} تومان</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>ارسال بیمه‌شده</span>
            <span className={shipping === 0 ? "font-bold text-emerald-700" : "font-bold text-espresso"}>
              {shipping === 0 ? "رایگان" : `${formatToman(shipping)} تومان`}
            </span>
          </div>
          {shipping > 0 && (
            <p className="rounded-lg bg-cream/70 p-2 text-[10px] leading-5 text-muted">
              با خرید {formatToman(FREE_SHIPPING_THRESHOLD - subtotal)} تومان دیگر، ارسال رایگان می‌شود.
            </p>
          )}
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
            <span className="font-bold text-ink">مبلغ قابل پرداخت</span>
            <span className="font-extrabold text-gold-deep">{formatToman(total)} تومان</span>
          </div>
        </div>

        <div className="mt-5 space-y-2 rounded-2xl bg-cream/60 p-3 text-[10px] leading-5 text-muted">
          <p className="flex items-center gap-1.5"><IconSeal className="size-3.5 text-gold-deep" /> فاکتور رسمی و شناسنامهٔ اصالت</p>
          <p className="flex items-center gap-1.5"><IconTruck className="size-3.5 text-gold-deep" /> ارسال بیمه‌شده و کد رهگیری</p>
          <p className="flex items-center gap-1.5"><IconShield className="size-3.5 text-gold-deep" /> بازخرید تضمینی زرناب</p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[10px] text-muted">
          <IconCheck className="size-3.5 text-emerald-600" /> قیمت‌ها در لحظهٔ ثبت سفارش کنترل می‌شوند
        </div>
      </aside>
    </div>
  );
}
