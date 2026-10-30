"use client";

import { useState } from "react";
import { IconCheck, IconSparkle } from "./icons";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) throw new Error(data.message || "ثبت اشتراک انجام نشد");
      setState("done");
      setMessage(data.message || "عضویت شما ثبت شد.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "خطای نامشخص");
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-3 text-xs text-gold-light">
        <IconCheck className="size-4" />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "space-y-2" : "space-y-3"}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          dir="ltr"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-label="ایمیل برای دریافت خبرنامه"
          className="field !rounded-full !border-white/20 !bg-white/10 !text-ivory placeholder:!text-ivory/40"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn btn-gold shrink-0 !px-5 !py-3 text-xs disabled:opacity-60"
        >
          <IconSparkle className="size-4" />
          {state === "loading" ? "در حال ثبت…" : "عضویت در خبرنامه"}
        </button>
      </div>
      {state === "error" && <p className="text-xs text-gold-light">{message}</p>}
      <p className="text-[11px] leading-relaxed text-ivory/50">
        هفته‌ای یک ایمیل؛ کالکشن‌های تازه، تحلیل کوتاه بازار طلا و دعوت به رویدادهای خصوصی گالری.
      </p>
    </form>
  );
}
