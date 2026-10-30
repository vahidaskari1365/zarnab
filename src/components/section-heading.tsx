import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  action,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "start" | "center";
  action?: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-5 md:flex-row md:items-end ${
        align === "center" ? "text-center md:flex-col md:items-center" : "md:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        <span className={`eyebrow ${light ? "!text-gold-light" : ""}`}>{eyebrow}</span>
        <h2
          className={`mt-4 text-[clamp(1.75rem,4vw,2.85rem)] leading-[1.35] ${
            light ? "text-ivory" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-4 text-sm leading-7 md:text-[0.95rem] ${
              light ? "text-ivory/70" : "text-muted"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
