import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/catalog";

type IncomingItem = { slug?: unknown; quantity?: unknown };

/**
 * حالت نمایشی: سفارش اعتبارسنجی و ثبت موقت می‌شود (بدون دیتابیس).
 * پاسخ همان ساختار قبل را دارد تا تجربهٔ کاربر تغییر نکند.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const rawItems = Array.isArray(body.items) ? (body.items as IncomingItem[]) : [];
    const customerName = String(body.customerName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const city = String(body.city ?? "").trim();
    const address = String(body.address ?? "").trim();
    const note = String(body.note ?? "").trim();
    const paymentMethod = String(body.paymentMethod ?? "online");

    if (customerName.length < 3) {
      return NextResponse.json({ ok: false, message: "نام و نام خانوادگی را کامل وارد کنید." }, { status: 400 });
    }
    if (!/^09\d{9}$/.test(phone)) {
      return NextResponse.json({ ok: false, message: "شمارهٔ موبایل معتبر نیست (مثال: 09121234567)." }, { status: 400 });
    }
    if (city.length < 2 || address.length < 8) {
      return NextResponse.json({ ok: false, message: "شهر و نشانی کامل را وارد کنید." }, { status: 400 });
    }
    if (rawItems.length === 0) {
      return NextResponse.json({ ok: false, message: "سبد خرید خالی است." }, { status: 400 });
    }

    type OrderItemDraft = {
      slug: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
      weightGrams: number;
    };

    const items = rawItems
      .map<OrderItemDraft | null>((item) => {
        const product = PRODUCTS.find((row) => row.slug === String(item.slug));
        if (!product) return null;
        const quantity = Math.max(1, Math.min(10, Number(item.quantity) || 1));
        return {
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity,
          image: product.images[0] ?? "/images/necklace.jpg",
          weightGrams: product.weightGrams,
        };
      })
      .filter((item): item is OrderItemDraft => item !== null);

    if (items.length === 0) {
      return NextResponse.json({ ok: false, message: "محصولات سبد خرید معتبر نیستند." }, { status: 400 });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderNumber = `ZR-${Date.now().toString(36).toUpperCase().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;

    console.log("[demo-order]", orderNumber, customerName, phone, total, JSON.stringify(items));

    return NextResponse.json({
      ok: true,
      orderNumber,
      total,
      message: "سفارش شما ثبت شد. کارشناس زرناب برای تایید نهایی تماس می‌گیرد.",
    });
  } catch (error) {
    console.error("order failed", error);
    return NextResponse.json(
      { ok: false, message: "ثبت سفارش ناموفق بود. لطفاً دوباره تلاش کنید." },
      { status: 500 },
    );
  }
}
