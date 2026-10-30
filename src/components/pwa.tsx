"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconClose, IconSparkle } from "./icons";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "zarnab-install-dismissed";

export function PwaProvider() {
  const pathname = usePathname();
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch((error) => console.warn("SW registration failed", error));
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const ua = window.navigator.userAgent;
    const iosDevice = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && "ontouchend" in document);
    setIsIos(iosDevice);

    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      dismissed = false;
    }

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
      if (!dismissed) setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    if (iosDevice && !dismissed) {
      const timer = window.setTimeout(() => setVisible(true), 5000);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", onPrompt);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!visible || pathname.startsWith("/admin")) return null;

  async function install() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") {
      setVisible(false);
      setPromptEvent(null);
    }
  }

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore storage errors */
    }
  }

  return (
    <div className="fixed inset-x-3 bottom-[5.1rem] z-[65] lg:bottom-5 lg:right-5 lg:left-auto lg:w-80">
      <div className="relative rounded-2xl border border-gold/35 bg-ivory/97 p-4 shadow-[0_24px_60px_-24px_rgba(70,49,20,0.55)] backdrop-blur-xl">
        <button
          type="button"
          onClick={dismiss}
          aria-label="بستن پیشنهاد نصب"
          className="absolute left-2 top-2 grid size-7 place-items-center rounded-full text-muted transition hover:bg-cream hover:text-ink"
        >
          <IconClose className="size-3.5" />
        </button>
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gradient-to-br from-gold-pale to-cream font-display text-lg font-semibold text-gold-deep">
            Z
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-ink">زرناب را روی دستگاه نصب کنید</p>
            <p className="mt-1 text-[11px] leading-5 text-muted">
              {isIos
                ? "در سافاری روی دکمهٔ اشتراک‌گذاری بزنید و «Add to Home Screen» را انتخاب کنید."
                : "دسترسی سریع‌تر به گالری، سبد خرید و دانشنامهٔ طلا بدون نوار مرورگر."}
            </p>
          </div>
        </div>
        {!isIos && promptEvent && (
          <button
            type="button"
            onClick={install}
            className="btn btn-gold mt-3 w-full !px-4 !py-2.5 text-[11px]"
          >
            <IconSparkle className="size-3.5" />
            نصب اپلیکیشن زرناب
          </button>
        )}
        {isIos && (
          <p className="mt-3 rounded-lg bg-cream/70 px-3 py-2 text-[10px] text-gold-deep">
            پشتیبانی از حالت تمام‌صفحه و کار در حالت آفلاین
          </p>
        )}
      </div>
    </div>
  );
}

export function ServiceWorkerReset() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV === "production") return;
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => registrations.forEach((registration) => registration.unregister()))
      .catch(() => {});
  }, []);
  return null;
}
