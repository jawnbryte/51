import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "gold",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "gold" | "muted" | "sealed" | "danger" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em]",
        tone === "gold" && "text-gold shadow-[0_0_0_1px_rgb(196_165_116/0.45)]",
        tone === "muted" && "text-muted shadow-[0_0_0_1px_rgb(232_228_220/0.12)]",
        tone === "sealed" && "text-gold-bright bg-gold/10 shadow-[0_0_0_1px_rgb(196_165_116/0.5)]",
        tone === "danger" && "text-danger shadow-[0_0_0_1px_rgb(180_84_74/0.55)]",
        className,
      )}
      {...props}
    />
  );
}
