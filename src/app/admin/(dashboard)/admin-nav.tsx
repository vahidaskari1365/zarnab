"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "../actions";
import {
  IconBrain,
  IconCart,
  IconGem,
  IconSparkle,
  IconTrend,
  IconMail,
} from "@/components/icons";

const links = [
  { href: "/admin", label: "داشبورد", icon: IconTrend },
  { href: "/admin/products", label: "محصولات", icon: IconGem },
  { href: "/admin/orders", label: "سفارش‌ها", icon: IconCart },
  { href: "/admin/leads", label: "درخواست‌ها", icon: IconMail },
  { href: "/admin/seo", label: "سئو و هوش مصنوعی", icon: IconBrain },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin" className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full border border-gold/40 bg-white/10 font-display text-lg text-gold-light">
          Z
        </span>
        <div>
          <p className="font-display text-lg tracking-[0.25em] text-ivory">ZARNAB</p>
          <p className="text-[9px] tracking-[0.2em] text-gold-light/70">ADMIN CONSOLE</p>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                active
                  ? "bg-gold text-white shadow-lg"
                  : "text-ivory/70 hover:bg-white/10 hover:text-ivory"
              }`}
            >
              <Icon className="size-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-[11px] text-ivory/70 transition hover:border-gold hover:text-gold-light"
        >
          <IconSparkle className="size-4" />
          مشاهدهٔ سایت
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full rounded-xl bg-white/10 px-3 py-2.5 text-[11px] text-ivory/70 transition hover:bg-wine hover:text-white"
          >
            خروج از پنل
          </button>
        </form>
      </div>
    </div>
  );
}
