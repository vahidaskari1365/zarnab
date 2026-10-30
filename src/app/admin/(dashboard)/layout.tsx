import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { AdminNav } from "./admin-nav";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="sticky top-0 z-30 flex shrink-0 flex-row items-center justify-between bg-forest-deep p-4 lg:h-screen lg:w-64 lg:flex-col lg:items-stretch lg:p-5">
        <div className="hidden lg:block">
          <AdminNav />
        </div>
        <div className="flex w-full items-center justify-between gap-2 overflow-x-auto no-scrollbar lg:hidden">
          <span className="font-display text-lg tracking-[0.25em] text-ivory">ZARNAB ADMIN</span>
          <div className="flex shrink-0 items-center gap-1.5">
            <a href="/admin/products" className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-ivory">محصولات</a>
            <a href="/admin/orders" className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-ivory">سفارش‌ها</a>
            <a href="/admin/leads" className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-ivory">درخواست‌ها</a>
            <a href="/admin/seo" className="rounded-full bg-gold px-3 py-1.5 text-[10px] text-white">سئو</a>
            <a href="/" className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] text-ivory">سایت</a>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}
