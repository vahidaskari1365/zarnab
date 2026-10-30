"use client";

import { useState } from "react";
import type { Faq } from "@/db/schema";
import { IconChevron } from "./icons";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line/80 overflow-hidden rounded-3xl border border-line bg-white/60">
      {items.map((item) => {
        const expanded = open === item.id;
        return (
          <div key={item.id} className="px-5 md:px-7">
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : item.id)}
              aria-expanded={expanded}
              className="flex w-full items-center justify-between gap-4 py-5 text-right"
            >
              <span className={`text-sm font-bold transition-colors md:text-base ${expanded ? "text-gold-deep" : "text-ink"}`}>
                {item.question}
              </span>
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                  expanded ? "rotate-180 border-gold bg-gold text-white" : "border-line text-gold-deep"
                }`}
              >
                <IconChevron className="size-4" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pe-10 text-sm leading-7 text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
