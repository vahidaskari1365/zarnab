"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { toPersianDigits } from "@/lib/site";
import { IconCart, IconGem, IconSparkle, IconPhone } from "./icons";

const tabs = [
  { href: "/", label: "خانه", icon: IconSparkle },
  { href: "/products", label: "فروشگاه", icon: IconGem },
  { href: "/cart", label: "سبد خرید", icon: IconCart },
  { href: "/contact", label: "مشاوره", icon: IconPhone },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const { count } = useCart();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      aria-label="ناوبری سریع موبایل"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line/80 bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl shadow-[0_-12px_30px_-24px_rgba(70,49,20,0.7)] lg:hidden"
    >
      <ul className="grid grid-cols-4" dir="rtl">
        {tabs.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition ${
                  active ? "text-gold-deep" : "text-muted"
                }`}
              >
                <span
                  className={`grid size-9 place-items-center rounded-full transition ${
                    active ? "bg-gold-pale text-gold-deep" : "text-espresso"
                  }`}
                >
                  <Icon className="size-[1.15rem]" />
                  {tab.href === "/cart" && count > 0 && (
                    <span className="absolute right-[calc(50%-1.35rem)] top-1.5 grid size-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-white">
                      {toPersianDigits(count)}
                    </span>
                  )}
                </span>
                {tab.label}
                {active && <span className="absolute bottom-1 h-0.5 w-6 rounded-full bg-gold" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
