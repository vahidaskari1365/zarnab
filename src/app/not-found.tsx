import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-6xl font-semibold text-gold/60">404</span>
      <h1 className="mt-4 text-2xl font-extrabold text-ink">این صفحه در گالری پیدا نشد</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-muted">
        ممکن است این قطعه از کالکشن خارج شده باشد. فروشگاه را ببینید یا با مشاور زرناب تماس بگیرید.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/products" className="btn btn-gold text-xs">مشاهدهٔ فروشگاه</Link>
        <Link href="/contact" className="btn btn-outline text-xs">مشاورهٔ خرید</Link>
      </div>
    </div>
  );
}
