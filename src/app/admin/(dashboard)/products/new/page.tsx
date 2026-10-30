import Link from "next/link";
import { getCategories } from "@/lib/data";
import { ProductForm } from "../product-form";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <div className="space-y-5">
      <div>
        <Link href="/admin/products" className="text-[11px] text-gold-deep">← بازگشت به محصولات</Link>
        <h1 className="mt-2 text-2xl font-extrabold text-ink">افزودن محصول جدید</h1>
        <p className="mt-1 text-xs text-muted">
          اطلاعات کامل محصول، برای نمایش در فروشگاه و داده‌های ساخت‌یافتهٔ سئو استفاده می‌شود.
        </p>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
