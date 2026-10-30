"use client";

import { useState } from "react";
import { IconCheck, IconSparkle } from "./icons";

const topics = [
  "مشاورهٔ خرید",
  "مشاورهٔ نیم‌ست عروس",
  "سفارش طراحی اختصاصی",
  "سرمایه‌گذاری طلا",
  "پس‌ازفروش و سایزبندی",
];

export function LeadForm({
  defaultTopic,
  source = "فرم تماس",
  dark = false,
}: {
  defaultTopic?: string;
  source?: string;
  dark?: boolean;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("loading");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          topic: form.get("topic"),
          message: form.get("message"),
          source,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) throw new Error(data.message || "ارسال درخواست انجام نشد");
      setState("done");
      setMessage(data.message || "درخواست شما ثبت شد.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "خطای نامشخص");
    }
  }

  if (state === "done") {
    return (
      <div
        className={`rounded-3xl border p-8 text-center ${
          dark ? "border-gold/30 bg-white/5 text-ivory" : "border-gold/30 bg-cream/70 text-ink"
        }`}
      >
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-gold/15 text-gold-deep">
          <IconCheck className="size-7" />
        </span>
        <p className="text-lg font-bold">درخواست شما ثبت شد</p>
        <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-ivory/70" : "text-muted"}`}>
          {message} کارشناس زرناب حداکثر تا یک روز کاری با شما تماس می‌گیرد.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="lead-name">
            نام و نام خانوادگی
          </label>
          <input id="lead-name" name="name" required className="field" placeholder="مثلاً نگار موسوی" />
        </div>
        <div>
          <label className="field-label" htmlFor="lead-phone">
            شماره تماس
          </label>
          <input
            id="lead-phone"
            name="phone"
            required
            dir="ltr"
            inputMode="tel"
            pattern="09[0-9]{9}"
            placeholder="09121234567"
            className="field text-left"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="lead-email">
            ایمیل (اختیاری)
          </label>
          <input id="lead-email" name="email" type="email" dir="ltr" className="field text-left" placeholder="you@example.com" />
        </div>
        <div>
          <label className="field-label" htmlFor="lead-topic">
            موضوع درخواست
          </label>
          <select id="lead-topic" name="topic" defaultValue={defaultTopic ?? topics[0]} className="field">
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="lead-message">
          توضیح کوتاه
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={4}
          className="field resize-none"
          placeholder="بودجه، سلیقه، تاریخ مراسم یا سوال شما…"
        />
      </div>
      <button type="submit" disabled={state === "loading"} className="btn btn-gold w-full disabled:opacity-60">
        <IconSparkle className="size-4" />
        {state === "loading" ? "در حال ارسال…" : "درخواست مشاورهٔ اختصاصی"}
      </button>
      {state === "error" && <p className="text-xs text-wine">{message}</p>}
      <p className={`text-[11px] leading-relaxed ${dark ? "text-ivory/50" : "text-muted"}`}>
        اطلاعات شما محرمانه است و فقط برای هماهنگی مشاوره استفاده می‌شود.
      </p>
    </form>
  );
}
