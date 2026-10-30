"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  faqs,
  keywords,
  leads,
  orders,
  products,
  settings,
} from "@/db/schema";
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

export async function saveProductAction(formData: FormData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  if (!slug || !name) redirect("/admin/products?error=1");

  const images = String(formData.get("images") ?? "")
    .split(/[\n,]+/)
    .map((image) => image.trim())
    .filter(Boolean);

  const payload = {
    slug,
    name,
    subtitle: String(formData.get("subtitle") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    story: String(formData.get("story") ?? "").trim(),
    categorySlug: String(formData.get("categorySlug") ?? "necklace"),
    price: Number(formData.get("price") || 0),
    compareAtPrice: Number(formData.get("compareAtPrice") || 0) || null,
    weightGrams: Number(formData.get("weightGrams") || 0),
    karat: String(formData.get("karat") ?? "18"),
    stone: String(formData.get("stone") ?? "").trim(),
    stock: Number(formData.get("stock") || 0),
    images: images.length ? images : ["/images/necklace.jpg"],
    badge: String(formData.get("badge") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    ratingX10: Math.round(Number(formData.get("ratingX10") || 4.8) * 10),
    reviewCount: Number(formData.get("reviewCount") || 0),
  };

  if (id > 0) {
    await db.update(products).set(payload).where(eq(products.id, id));
  } else {
    await db.insert(products).values(payload);
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/");
  redirect("/admin/products?saved=1");
}

export async function deleteProductAction(formData: FormData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  if (id > 0) await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function updateOrderStatusAction(formData: FormData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const status = String(formData.get("status") ?? "pending");
  if (id > 0) await db.update(orders).set({ status }).where(eq(orders.id, id));
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function updateLeadStatusAction(formData: FormData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const status = String(formData.get("status") ?? "new");
  if (id > 0) await db.update(leads).set({ status }).where(eq(leads.id, id));
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function saveSeoAction(formData: FormData) {
  await guard();
  const keys = [
    "seo_title",
    "seo_description",
    "announcement",
    "gold_price_18",
    "ai_visibility_score",
    "schema_coverage",
    "core_web_vitals",
    "hero_title",
    "hero_subtitle",
    "hero_eyebrow",
  ];

  for (const key of keys) {
    const value = formData.get(key);
    if (value === null) continue;
    await db
      .insert(settings)
      .values({ key, value: String(value) })
      .onConflictDoUpdate({ target: settings.key, set: { value: String(value) } });
  }

  revalidatePath("/admin/seo");
  revalidatePath("/");
  redirect("/admin/seo?saved=1");
}

export async function saveKeywordAction(formData: FormData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const position = Number(formData.get("position") || 0);
  const aiCitations = Number(formData.get("aiCitations") || 0);
  if (id > 0) {
    await db
      .update(keywords)
      .set({ position, aiCitations, updatedAt: new Date() })
      .where(eq(keywords.id, id));
  }
  revalidatePath("/admin/seo");
}

export async function createFaqAction(formData: FormData) {
  await guard();
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const category = String(formData.get("category") ?? "عمومی").trim();
  if (question && answer) {
    await db.insert(faqs).values({ question, answer, category });
  }
  revalidatePath("/admin/seo");
  revalidatePath("/faq");
}

export async function deleteFaqAction(formData: FormData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  if (id > 0) await db.delete(faqs).where(eq(faqs.id, id));
  revalidatePath("/admin/seo");
  revalidatePath("/faq");
}
