"use client";

import { useState } from "react";
import { IconSparkle } from "./icons";

export function ProductGallery({
  images,
  name,
  badge,
}: {
  images: string[];
  name: string;
  badge?: string | null;
}) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : ["/images/necklace.jpg"];

  return (
    <div>
      <div className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gallery[active]}
          alt={`${name} — تصویر ${active + 1}`}
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/20 via-transparent to-transparent" />
        {badge && (
          <span className="absolute right-4 top-4 rounded-full bg-forest-deep/90 px-4 py-1.5 text-[11px] font-bold text-gold-pale backdrop-blur">
            {badge}
          </span>
        )}
        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1.5 text-[10px] font-bold text-gold-deep backdrop-blur">
          <IconSparkle className="size-3.5" /> تصویر واقعی قطعهٔ موجود
        </span>
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 flex gap-3">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`تصویر ${index + 1}`}
              className={`relative size-20 overflow-hidden rounded-xl border-2 transition ${
                active === index ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
