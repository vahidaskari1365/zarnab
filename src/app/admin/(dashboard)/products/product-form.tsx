import type { Category, Product } from "@/lib/catalog";
import { saveProductAction } from "../../actions";
import Link from "next/link";

export function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) {
  return (
    <form action={saveProductAction} className="space-y-5">
      {product && <input type="hidden" name="id" value={product.id} />}

      <section className="rounded-2xl border border-line bg-white/85 p-5">
        <h2 className="text-sm font-bold text-ink">اطلاعات اصلی</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="name">نام محصول *</label>
            <input id="name" name="name" required defaultValue={product?.name} className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor="slug">شناسه در URL (لاتین) *</label>
            <input id="slug" name="slug" required dir="ltr" defaultValue={product?.slug} className="field text-left" placeholder="grdnbnd-mehra" />
          </div>
          <div>
            <label className="field-label" htmlFor="subtitle">زیرعنوان</label>
            <input id="subtitle" name="subtitle" defaultValue={product?.subtitle} className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor="categorySlug">دسته‌بندی</label>
            <select id="categorySlug" name="categorySlug" defaultValue={product?.categorySlug ?? categories[0]?.slug} className="field">
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="field-label" htmlFor="description">توضیحات محصول (برای صفحه و سئو)</label>
          <textarea id="description" name="description" rows={4} defaultValue={product?.description} className="field resize-none" />
        </div>
        <div className="mt-4">
          <label className="field-label" htmlFor="story">روایت قطعه</label>
          <textarea id="story" name="story" rows={3} defaultValue={product?.story} className="field resize-none" />
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white/85 p-5">
        <h2 className="text-sm font-bold text-ink">مشخصات و قیمت</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <label className="field-label" htmlFor="price">قیمت (تومان) *</label>
            <input id="price" name="price" type="number" min={0} required defaultValue={product?.price} className="field" dir="ltr" />
          </div>
          <div>
            <label className="field-label" htmlFor="compareAtPrice">قیمت قبل از تخفیف</label>
            <input id="compareAtPrice" name="compareAtPrice" type="number" min={0} defaultValue={product?.compareAtPrice ?? ""} className="field" dir="ltr" />
          </div>
          <div>
            <label className="field-label" htmlFor="stock">موجودی</label>
            <input id="stock" name="stock" type="number" min={0} defaultValue={product?.stock ?? 0} className="field" dir="ltr" />
          </div>
          <div>
            <label className="field-label" htmlFor="weightGrams">وزن (گرم)</label>
            <input id="weightGrams" name="weightGrams" type="number" min={0} defaultValue={product?.weightGrams ?? 0} className="field" dir="ltr" />
          </div>
          <div>
            <label className="field-label" htmlFor="karat">عیار</label>
            <select id="karat" name="karat" defaultValue={product?.karat ?? "18"} className="field">
              <option value="18">۱۸ عیار</option>
              <option value="24">۲۴ عیار</option>
              <option value="14">۱۴ عیار</option>
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="stone">سنگ</label>
            <input id="stone" name="stone" defaultValue={product?.stone} className="field" placeholder="الماس ۰٫۴ قیراط GIA" />
          </div>
          <div>
            <label className="field-label" htmlFor="badge">برچسب</label>
            <input id="badge" name="badge" defaultValue={product?.badge ?? ""} className="field" placeholder="پرفروش" />
          </div>
          <div>
            <label className="field-label" htmlFor="ratingX10">امتیاز (۱ تا ۵)</label>
            <input id="ratingX10" name="ratingX10" type="number" step={0.1} min={1} max={5} defaultValue={product ? product.ratingX10 / 10 : 4.8} className="field" dir="ltr" />
          </div>
          <div>
            <label className="field-label" htmlFor="reviewCount">تعداد نظرات</label>
            <input id="reviewCount" name="reviewCount" type="number" min={0} defaultValue={product?.reviewCount ?? 0} className="field" dir="ltr" />
          </div>
        </div>
        <div className="mt-4">
          <label className="field-label" htmlFor="images">تصاویر (هر خط یک مسیر)</label>
          <textarea id="images" name="images" rows={2} dir="ltr" defaultValue={product?.images.join("\n") ?? "/images/necklace.jpg"} className="field resize-none text-left" />
        </div>
        <label className="mt-4 flex items-center gap-2 text-xs text-espresso">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} className="size-4 accent-[#b8893b]" />
          نمایش در منتخب صفحهٔ اصلی
        </label>
      </section>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn btn-gold text-xs">
          {product ? "ذخیرهٔ تغییرات" : "افزودن محصول"}
        </button>
        <Link href="/admin/products" className="btn btn-outline text-xs">انصراف</Link>
      </div>
    </form>
  );
}
