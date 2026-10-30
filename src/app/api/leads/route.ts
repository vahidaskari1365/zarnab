import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

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

    await db.insert(leads).values({
      name,
      phone,
      email: email.slice(0, 160),
      topic: topic.slice(0, 120),
      message: message.slice(0, 2000),
      source: source.slice(0, 60),
    });

    return NextResponse.json({
      ok: true,
      message: "درخواست شما در صف بررسی قرار گرفت.",
    });
  } catch (error) {
    console.error("lead failed", error);
    return NextResponse.json({ ok: false, message: "ارسال درخواست ناموفق بود." }, { status: 500 });
  }
}
