"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/db/schema";
import { formatToman } from "@/lib/site";
import { IconArrow, IconBrain, IconClose, IconSparkle } from "./icons";

const occasions = [
  { id: "wedding", label: "عروسی و نامزدی", categories: ["set", "ring"], hint: "نیم‌ست و انگشتر" },
  { id: "gift", label: "هدیهٔ ماندگار", categories: ["necklace", "earrings"], hint: "گردنبند و گوشواره" },
  { id: "daily", label: "استفادهٔ روزمره", categories: ["bracelet", "ring"], hint: "دستبند و رینگ" },
  { id: "invest", label: "سرمایه‌گذاری", categories: ["bullion"], hint: "سکه و شمش" },
];

const budgets = [
  { id: "a", label: "تا ۳۵ میلیون", max: 35_000_000 },
  { id: "b", label: "۳۵ تا ۶۰ میلیون", max: 60_000_000 },
  { id: "c", label: "۶۰ تا ۸۵ میلیون", max: 85_000_000 },
  { id: "d", label: "بدون محدودیت", max: 1_000_000_000 },
];

export function SmartAdvisor({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);

  const matches = useMemo(() => {
    const chosenOccasion = occasions.find((item) => item.id === occasion);
    const chosenBudget = budgets.find((item) => item.id === budget);
    if (!chosenOccasion || !chosenBudget) return [];
    return products
      .filter(
        (product) =>
          chosenOccasion.categories.includes(product.categorySlug) &&
          product.price <= chosenBudget.max,
      )
      .sort((a, b) => b.ratingX10 - a.ratingX10)
      .slice(0, 2);
  }, [occasion, budget, products]);

  function reset() {
    setStep(0);
    setOccasion(null);
    setBudget(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/70 px-5 py-3 text-xs font-bold text-forest transition hover:border-gold hover:bg-white"
      >
        <span className="pulse-ring relative grid size-7 place-items-center rounded-full bg-forest text-gold-light">
          <IconBrain className="size-4" />
        </span>
        مشاور هوشمند خرید
        <IconArrow className="size-4 rotate-180 text-gold-deep transition-transform group-hover:-translate-x-1" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-forest-deep/60 p-4 backdrop-blur-md sm:items-center">
          <div className="w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-gold/30 bg-ivory shadow-2xl">
            <div className="flex items-center justify-between bg-forest-deep px-5 py-4 text-ivory">
              <div className="flex items-center gap-2">
                <IconSparkle className="size-4 text-gold-light" />
                <p className="text-sm font-bold">مشاور هوشمند زرناب</p>
              </div>
              <button
                type="button"
                aria-label="بستن"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-full border border-white/20 transition hover:border-gold"
              >
                <IconClose className="size-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="mb-5 flex items-center gap-2">
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className={`h-1 flex-1 rounded-full transition ${
                      step >= index ? "bg-gold" : "bg-line"
                    }`}
                  />
                ))}
              </div>

              {step === 0 && (
                <div>
                  <p className="text-sm font-bold text-ink">مناسبت خرید چیست؟</p>
                  <p className="mt-1 text-xs text-muted">بر اساس موقعیت، پیشنهاد دقیق‌تری می‌دهیم.</p>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {occasions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setOccasion(item.id);
                          setStep(1);
                        }}
                        className={`rounded-2xl border p-3.5 text-right transition ${
                          occasion === item.id
                            ? "border-gold bg-gold-pale"
                            : "border-line bg-white/70 hover:border-gold/60"
                        }`}
                      >
                        <span className="block text-sm font-bold text-ink">{item.label}</span>
                        <span className="mt-1 block text-[11px] text-muted">{item.hint}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="text-sm font-bold text-ink">بودجهٔ تقریبی شما؟</p>
                  <p className="mt-1 text-xs text-muted">قیمت‌ها شفاف و شامل فاکتور رسمی است.</p>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {budgets.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setBudget(item.id);
                          setStep(2);
                        }}
                        className={`rounded-2xl border p-3.5 text-sm font-bold transition ${
                          budget === item.id
                            ? "border-gold bg-gold-pale text-gold-deep"
                            : "border-line bg-white/70 text-ink hover:border-gold/60"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="mt-4 text-xs text-muted underline"
                  >
                    بازگشت
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-sm font-bold text-ink">پیشنهاد اختصاصی برای شما</p>
                  <p className="mt-1 text-xs text-muted">
                    {occasions.find((item) => item.id === occasion)?.label} ·{" "}
                    {budgets.find((item) => item.id === budget)?.label}
                  </p>
                  <div className="mt-4 space-y-3">
                    {matches.length === 0 && (
                      <p className="rounded-2xl border border-line bg-white/60 p-4 text-xs leading-6 text-muted">
                        برای این ترکیب، قطعهٔ موجودی در گالری آنلاین پیدا نشد. کارشناسان ما می‌توانند
                        سفارش اختصاصی برای شما طراحی کنند.
                      </p>
                    )}
                    {matches.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-2xl border border-line bg-white/80 p-3 transition hover:border-gold"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="size-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-ink">{product.name}</p>
                          <p className="text-[11px] text-muted">{product.subtitle}</p>
                          <p className="mt-1 text-xs font-bold text-gold-deep">
                            {formatToman(product.price)} تومان
                          </p>
                        </div>
                        <IconArrow className="size-4 text-gold" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button type="button" onClick={reset} className="text-xs text-muted underline">
                      شروع دوباره
                    </button>
                    <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-gold !px-4 !py-2 text-[11px]">
                      مشاورهٔ انسانی
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
