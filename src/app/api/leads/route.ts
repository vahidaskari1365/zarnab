import { NextResponse } from "next/server";

/** حالت نمایشی: سرنخ‌ها اعتبارسنجی و لاگ می‌شوند (بدون دیتابیس). */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const topic = String(body.topic ?? "مشاوره خرید").trim();
    const message = String(body.message ?? "").trim();
    const source = String(body.source ?? "website").trim();

    if (name.length < 3) {
      return NextResponse.json({ ok: false, message: "نام خود را کامل وارد کنید." }, { status: 400 });
    }
    if (!/^09\d{9}$/.test(phone)) {
      return NextResponse.json({ ok: false, message: "شمارهٔ موبایل معتبر نیست." }, { status: 400 });
    }

    console.log("[demo-lead]", name, phone, email, topic, message.slice(0, 120));

    return NextResponse.json({
      ok: true,
      message: "درخواست شما در صف بررسی قرار گرفت.",
    });
  } catch (error) {
    console.error("lead failed", error);
    return NextResponse.json({ ok: false, message: "ارسال درخواست ناموفق بود." }, { status: 500 });
  }
}
