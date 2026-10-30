"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdmin, sessionToken, verifyPassword } from "@/lib/auth";

async function guard() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }
  const store = await cookies();
  store.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 10,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ */
/* حالت نمایشی: پنل فقط‌خواندنی است و داده‌ها از کاتالوگ دمو می‌آیند.   */
/* اکشن‌های نوشتاری بدون دیتابیس فقط مسیر را تازه‌سازی می‌کنند.         */
/* ------------------------------------------------------------------ */

export async function saveProductAction(formData: FormData) {
  await guard();
  console.log("[demo] saveProductAction skipped (no database)", String(formData.get("slug") ?? ""));
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products?saved=demo");
}

export async function deleteProductAction(formData: FormData) {
  await guard();
  console.log("[demo] deleteProductAction skipped (no database)", String(formData.get("id") ?? ""));
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function updateOrderStatusAction(formData: FormData) {
  await guard();
  console.log("[demo] updateOrderStatusAction skipped (no database)", String(formData.get("id") ?? ""));
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function updateLeadStatusAction(formData: FormData) {
  await guard();
  console.log("[demo] updateLeadStatusAction skipped (no database)", String(formData.get("id") ?? ""));
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function saveSeoAction(formData: FormData) {
  await guard();
  console.log("[demo] saveSeoAction skipped (no database)");
  revalidatePath("/admin/seo");
  revalidatePath("/");
  redirect("/admin/seo?saved=demo");
}

export async function saveKeywordAction(formData: FormData) {
  await guard();
  console.log("[demo] saveKeywordAction skipped (no database)", String(formData.get("id") ?? ""));
  revalidatePath("/admin/seo");
}

export async function createFaqAction(formData: FormData) {
  await guard();
  console.log("[demo] createFaqAction skipped (no database)");
  revalidatePath("/admin/seo");
  revalidatePath("/faq");
}

export async function deleteFaqAction(formData: FormData) {
  await guard();
  console.log("[demo] deleteFaqAction skipped (no database)", String(formData.get("id") ?? ""));
  revalidatePath("/admin/seo");
  revalidatePath("/faq");
}
