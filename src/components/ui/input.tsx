import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md bg-elevated px-3.5 font-sans text-base text-fg placeholder:text-subtle shadow-[0_0_0_1px_rgb(232_228_220/0.12)] outline-none transition-[box-shadow] duration-150 focus:shadow-[0_0_0_1px_rgb(196_165_116/0.7)]",
        className,
      )}
      {...props}
    />
  );
}
