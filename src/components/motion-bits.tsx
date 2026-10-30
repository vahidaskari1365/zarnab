"use client";

import { useEffect, useRef, useState } from "react";
import { toPersianDigits } from "@/lib/site";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent">
      <div
        className="h-full origin-right bg-gradient-to-l from-gold-deep via-gold to-gold-light transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setDisplay(value * eased);
      if (ratio < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  const formatted = new Intl.NumberFormat("fa-IR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(display);

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function GoldTicker({ price }: { price: number }) {
  const [tick, setTick] = useState(0);
  const [change, setChange] = useState(0.42);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((current) => current + 1);
      setChange((current) => {
        const next = current + (Math.random() - 0.5) * 0.22;
        return Math.round(next * 100) / 100;
      });
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const unit = price / 1000;
  const live = unit + tick * 1.2;
  const pos = change >= 0;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-ivory/70">
      <span className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-light opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-gold-light" />
        </span>
        نرخ زندهٔ طلای ۱۸ عیار
      </span>
      <span className="font-bold text-gold-light">
        {new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(live * 1000)} تومان / گرم
      </span>
      <span className={pos ? "text-emerald-300" : "text-rose-300"}>
        {pos ? "▲" : "▼"} {toPersianDigits(Math.abs(change).toFixed(2))}٪ امروز
      </span>
      <span className="hidden text-ivory/40 sm:inline">
        انس جهانی: {toPersianDigits("3,342")} دلار · سکه امامی: {toPersianDigits("78,500,000")} تومان
      </span>
    </div>
  );
}

export function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--mx", `${x * 16}px`);
      node.style.setProperty("--my", `${y * 16}px`);
    };
    node.addEventListener("pointermove", onMove);
    return () => node.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
}
