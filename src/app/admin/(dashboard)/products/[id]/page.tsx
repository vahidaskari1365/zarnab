import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductById } from "@/lib/data";
import { ProductForm } from "../product-form";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) notFound();

  const [product, categories] = await Promise.all([
    getProductById(productId),
    getCategories(),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href="/admin/products" className="text-[11px] text-gold-deep">← بازگشت به محصولات</Link>
          <h1 className="mt-2 text-2xl font-extrabold text-ink">ویرایش {product.name}</h1>
          <p className="mt-1 text-xs text-muted">حالت نمایشی: تغییرات فقط به‌صورت موقت شبیه‌سازی می‌شود.</p>
        </div>
        <Link href={`/products/${product.slug}`} className="btn btn-outline !px-4 !py-2.5 text-xs">
          مشاهدهٔ صفحهٔ محصول
        </Link>
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
