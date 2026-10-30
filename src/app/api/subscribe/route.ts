import { NextResponse } from "next/server";

/** حالت نمایشی: عضویت خبرنامه اعتبارسنجی و لاگ می‌شود (بدون دیتابیس). */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ ok: false, message: "ایمیل معتبر نیست." }, { status: 400 });
    }
    console.log("[demo-subscriber]", email);
    return NextResponse.json({ ok: true, message: "عضویت شما در خبرنامهٔ زرناب ثبت شد." });
  } catch (error) {
    console.error("subscribe failed", error);
    return NextResponse.json({ ok: false, message: "ثبت اشتراک ناموفق بود." }, { status: 500 });
  }
}
