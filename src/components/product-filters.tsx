"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { IconSearch } from "./icons";

export function ProductFilters({
  categories,
  activeCategory,
  currentSort,
  currentQuery,
  basePath = "/products",
}: {
  categories: { slug: string; name: string }[];
  activeCategory?: string;
  currentSort?: string;
  currentQuery?: string;
  basePath?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function go(next: Record<string, string | undefined>) {
    const search = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value) search.set(key, value);
      else search.delete(key);
    });
    startTransition(() => router.push(`${basePath}${search.size ? `?${search.toString()}` : ""}`));
  }

  return (
    <div className={`rounded-3xl border border-line bg-white/70 p-4 backdrop-blur ${pending ? "opacity-70" : ""}`}>
      <form
        className="flex flex-col gap-3 lg:flex-row lg:items-center"
        onSubmit={(event) => {
          event.preventDefault();
          const value = new FormData(event.currentTarget).get("q");
          go({ q: value ? String(value) : undefined });
        }}
      >
        <div className="relative flex-1">
          <IconSearch className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            name="q"
            defaultValue={currentQuery ?? ""}
            placeholder="جستجو در نام، سنگ یا توضیح قطعه…"
            className="field !pr-10"
            aria-label="جستجوی محصول"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="hidden text-xs text-muted sm:block">
            مرتب‌سازی
          </label>
          <select
            id="sort"
            value={currentSort ?? "featured"}
            onChange={(event) => go({ sort: event.target.value })}
            className="field !w-auto !py-2.5 text-xs"
          >
            <option value="featured">منتخب زرناب</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
            <option value="weight">بیشترین وزن</option>
          </select>
          <button type="submit" className="btn btn-gold !px-4 !py-2.5 text-xs">
            جستجو
          </button>
        </div>
      </form>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => go({ category: undefined })}
          className={`shrink-0 rounded-full border px-4 py-2 text-xs transition ${
            !activeCategory
              ? "border-gold bg-gold text-white"
              : "border-line bg-white text-espresso hover:border-gold/60"
          }`}
        >
          همه
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => go({ category: category.slug })}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs transition ${
              activeCategory === category.slug
                ? "border-gold bg-gold text-white"
                : "border-line bg-white text-espresso hover:border-gold/60"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
