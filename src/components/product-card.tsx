import Link from "next/link";
import type { Product } from "@/db/schema";
import { discountPercent, formatToman, site } from "@/lib/site";
import { AddToCartButton } from "./add-to-cart";
import { IconGem, IconScale, IconStar } from "./icons";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const discount = discountPercent(product.price, product.compareAtPrice);
  const image = product.images[0] ?? "/images/necklace.jpg";

  return (
    <article className="group card-lux tilt-card relative overflow-hidden rounded-[1.5rem]">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="zoom-media relative aspect-[4/5] overflow-hidden bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${product.name} — ${product.subtitle}`}
              loading={priority ? "eager" : "lazy"}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
          </div>
        </Link>

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            {product.badge && (
              <span className="rounded-full bg-forest-deep/90 px-3 py-1 text-[10px] font-bold text-gold-pale backdrop-blur">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="w-fit rounded-full bg-wine px-3 py-1 text-[10px] font-bold text-white">
                {discount}٪ تخفیف
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 rounded-full bg-ivory/90 px-2.5 py-1 text-[10px] font-bold text-gold-deep backdrop-blur">
            <IconStar className="size-3" />
            {new Intl.NumberFormat("fa-IR", { minimumFractionDigits: 1 }).format(product.ratingX10 / 10)}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <AddToCartButton
            variant="icon"
            item={{
              slug: product.slug,
              name: product.name,
              price: product.price,
              image,
              weightGrams: product.weightGrams,
            }}
            label={`افزودن ${product.name} به سبد`}
          />
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3 text-[10px] text-muted">
          <span className="flex items-center gap-1">
            <IconScale className="size-3.5 text-gold" />
            {new Intl.NumberFormat("fa-IR").format(product.weightGrams)} گرم
          </span>
          <span className="flex items-center gap-1">
            <IconGem className="size-3.5 text-gold" />
            عیار {product.karat === "24" ? "۲۴" : "۱۸"}
          </span>
          {product.stone && product.stone !== "بدون سنگ" && (
            <span className="truncate">{product.stone.split(" ")[0]}</span>
          )}
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-bold text-ink transition-colors group-hover:text-gold-deep">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted">{product.subtitle}</p>
        </Link>

        <div className="flex items-end justify-between gap-2 pt-1">
          <div>
            {product.compareAtPrice && (
              <p className="text-[11px] text-muted line-through">
                {formatToman(product.compareAtPrice)}
              </p>
            )}
            <p className="text-sm font-extrabold text-ink">
              {formatToman(product.price)}
              <span className="ms-1 text-[10px] font-medium text-muted">تومان</span>
            </p>
          </div>
          <span className="text-[10px] text-muted">با فاکتور رسمی</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line/70 bg-white/40 px-4 py-2.5 text-[10px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-600" />
          ضمانت اصالت زرناب
        </span>
        <span className="font-display tracking-widest text-gold-deep">{site.nameEn}</span>
      </div>
    </article>
  );
}
