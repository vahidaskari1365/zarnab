"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { IconCart, IconCheck, IconMinus, IconPlus } from "./icons";

type ItemInput = {
  slug: string;
  name: string;
  price: number;
  image: string;
  weightGrams?: number;
};

export function AddToCartButton({
  item,
  variant = "solid",
  className = "",
  label = "افزودن به سبد",
}: {
  item: ItemInput;
  variant?: "solid" | "outline" | "icon";
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1900);
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleAdd}
        aria-label={label}
        className={`grid size-10 place-items-center rounded-full border border-gold/40 bg-ivory/95 text-gold-deep shadow-lg backdrop-blur transition hover:bg-gold hover:text-white ${className}`}
      >
        {added ? <IconCheck className="size-4" /> : <IconCart className="size-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`btn ${variant === "solid" ? "btn-gold" : "btn-outline"} w-full text-xs ${className}`}
    >
      {added ? <IconCheck className="size-4" /> : <IconCart className="size-4" />}
      {added ? "به سبد افزوده شد" : label}
    </button>
  );
}

export function AddToCartBar({ item, stock }: { item: ItemInput; stock: number }) {
  const { add } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function addNow(goToCart: boolean) {
    add(item, quantity);
    if (goToCart) {
      router.push("/cart");
      return;
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1900);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-line bg-white/70">
          <button
            type="button"
            aria-label="کاهش تعداد"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="grid size-10 place-items-center text-espresso transition hover:text-gold-deep"
          >
            <IconMinus className="size-4" />
          </button>
          <span className="w-8 text-center text-sm font-bold">{quantity}</span>
          <button
            type="button"
            aria-label="افزایش تعداد"
            onClick={() => setQuantity((value) => Math.min(10, value + 1))}
            className="grid size-10 place-items-center text-espresso transition hover:text-gold-deep"
          >
            <IconPlus className="size-4" />
          </button>
        </div>
        <span className="text-xs text-muted">
          {stock > 0 ? `${new Intl.NumberFormat("fa-IR").format(stock)} عدد موجود در گالری` : "ناموجود"}
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          disabled={stock <= 0}
          onClick={() => addNow(false)}
          className="btn btn-outline text-xs disabled:opacity-50"
        >
          {added ? <IconCheck className="size-4" /> : <IconCart className="size-4" />}
          {added ? "افزوده شد" : "افزودن به سبد"}
        </button>
        <button
          type="button"
          disabled={stock <= 0}
          onClick={() => addNow(true)}
          className="btn btn-gold text-xs disabled:opacity-50"
        >
          خرید سریع و پرداخت
        </button>
      </div>
    </div>
  );
}
