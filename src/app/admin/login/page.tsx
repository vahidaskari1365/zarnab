import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { loginAction } from "../actions";
import { IconSeal, IconShield } from "@/components/icons";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ error?: string }>;

export default async function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[1.75rem] border border-line bg-white/85 p-8 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-gold-pale to-cream font-display text-xl font-semibold text-gold-deep">
            Z
          </span>
          <div>
            <p className="font-display text-xl tracking-[0.28em] text-ink">ZARNAB</p>
            <p className="text-[10px] tracking-[0.2em] text-gold-deep">مدیریت گالری</p>
          </div>
        </div>

        <h1 className="mt-6 text-xl font-extrabold text-ink">ورود به پنل مدیریت</h1>
        <p className="mt-2 text-xs leading-6 text-muted">
          دسترسی به محصولات، سفارش‌ها، درخواست‌های مشاوره و داشبورد سئو.
        </p>

        <form action={loginAction} className="mt-6 space-y-3">
          <div>
            <label htmlFor="password" className="field-label">رمز عبور مدیریت</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="field"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="rounded-xl bg-wine/10 p-3 text-xs text-wine">
              رمز عبور نادرست است. دوباره تلاش کنید.
            </p>
          )}
          <button type="submit" className="btn btn-gold w-full text-xs">
            <IconShield className="size-4" />
            ورود امن
          </button>
        </form>

        <div className="mt-5 rounded-xl border border-dashed border-gold/40 bg-gold-pale/30 p-3 text-[11px] leading-6 text-muted">
          <p className="font-bold text-gold-deep">دسترسی نسخهٔ نمایشی</p>
          <p>
            رمز پیش‌فرض: <code className="rounded bg-white px-1.5 py-0.5 text-ink" dir="ltr">zarnab1405</code>
          </p>
          <p className="text-[10px]">برای تغییر، متغیر محیطی ADMIN_PASSWORD را تنظیم کنید.</p>
        </div>

        <div className="mt-5 flex items-center justify-between text-[11px] text-muted">
          <Link href="/" className="hover:text-gold-deep">← بازگشت به سایت</Link>
          <span className="flex items-center gap-1"><IconSeal className="size-3.5" /> نشست رمزنگاری‌شده</span>
        </div>
      </div>
    </div>
  );
}
