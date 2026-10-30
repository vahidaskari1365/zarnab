import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ ok: false, message: "ایمیل معتبر نیست." }, { status: 400 });
    }
    await db.insert(subscribers).values({ email }).onConflictDoNothing();
    return NextResponse.json({ ok: true, message: "عضویت شما در خبرنامهٔ زرناب ثبت شد." });
  } catch (error) {
    console.error("subscribe failed", error);
    return NextResponse.json({ ok: false, message: "ثبت اشتراک ناموفق بود." }, { status: 500 });
  }
}
