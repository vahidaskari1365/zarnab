import Link from "next/link";
import { getCategories, getProducts } from "@/lib/data";
import { formatToman } from "@/lib/site";
import { faNumber, formatDateShort } from "@/lib/admin-ui";
import { deleteProductAction } from "../../actions";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ saved?: string; error?: string }>;

export default async function AdminProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([getProducts({ limit: 100 }), getCategories()]);
  const categoryNames = Object.fromEntries(categories.map((category) => [category.slug, category.name]));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-gold-deep">مدیریت کاتالوگ</p>
          <h1 className="mt-2 text-2xl font-extrabold text-ink">محصولات گالری</h1>
          <p className="mt-1 text-xs text-muted">{faNumber(products.length)} قطعه ثبت شده است.</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-gold !px-4 !py-2.5 text-xs">افزودن محصول جدید</Link>
      </div>

      {params.saved && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
          تغییرات محصول با موفقیت ذخیره شد.
        </p>
      )}
      {params.error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
          نام و شناسهٔ محصول الزامی است.
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-line bg-white/85">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[48rem] text-right text-xs">
            <thead className="bg-cream/60 text-[10px] text-muted">
              <tr>
                <th className="p-3 font-medium">قطعه</th>
                <th className="p-3 font-medium">دسته</th>
                <th className="p-3 font-medium">قیمت</th>
                <th className="p-3 font-medium">وزن</th>
                <th className="p-3 font-medium">موجودی</th>
                <th className="p-3 font-medium">منتخب</th>
                <th className="p-3 font-medium">تاریخ</th>
                <th className="p-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-line/60 align-middle">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.images[0]} alt="" className="size-11 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-ink">{product.name}</p>
                        <p className="text-[10px] text-muted" dir="ltr">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-muted">{categoryNames[product.categorySlug] ?? product.categorySlug}</td>
                  <td className="p-3 font-bold text-espresso">{formatToman(product.price)}</td>
                  <td className="p-3 text-muted">{faNumber(product.weightGrams)} گرم</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-1 text-[10px] ${product.stock <= 3 ? "bg-amber-100 text-amber-800" : "bg-emerald-50 text-emerald-800"}`}>
                      {faNumber(product.stock)} عدد
                    </span>
                  </td>
                  <td className="p-3 text-muted">{product.featured ? "بله" : "—"}</td>
                  <td className="p-3 text-[10px] text-muted">{formatDateShort(product.createdAt)}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}`} className="rounded-full border border-line px-2.5 py-1 text-[10px] text-gold-deep hover:border-gold">
                        ویرایش
                      </Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={product.id} />
                        <button type="submit" className="rounded-full border border-rose-200 px-2.5 py-1 text-[10px] text-rose-700 hover:bg-rose-50">
                          حذف
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted">محصولی ثبت نشده است.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
