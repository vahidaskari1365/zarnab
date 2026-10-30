import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "سبد خرید و تکمیل سفارش طلا و جواهرات زرناب با ارسال بیمه‌شده و پرداخت امن.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <div className="bg-gradient-to-b from-cream/50 to-ivory">
      <div className="container-x py-10 lg:py-14">
        <div className="mb-7">
          <span className="eyebrow">تکمیل خرید</span>
          <h1 className="mt-3 text-[clamp(1.7rem,4vw,2.5rem)] text-ink">سبد خرید و پرداخت</h1>
          <p className="mt-2 text-sm text-muted">
            سفارش شما پس از کنترل موجودی و تایید نرخ روز طلا نهایی می‌شود.
          </p>
        </div>
        <CartView />
      </div>
    </div>
  );
}
