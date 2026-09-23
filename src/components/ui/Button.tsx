"use client";

import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";
import { IconArrow } from "./Icons";

type Variant = "primary" | "outline" | "gold" | "light";

type Props = {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

const styles: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  primary: { base: "bg-ink text-cream", fill: "bg-gold", hoverText: "group-hover:text-ink" },
  outline: { base: "border border-ink/25 text-ink", fill: "bg-ink", hoverText: "group-hover:text-cream" },
  gold: { base: "bg-gold text-ink", fill: "bg-ink", hoverText: "group-hover:text-cream" },
  light: { base: "bg-cream text-ink", fill: "bg-gold", hoverText: "group-hover:text-ink" },
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  arrow = false,
  type = "button",
  disabled,
}: Props) {
  const s = styles[variant];
  const cls = `group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${s.base} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`;
  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-[650ms] ease-[var(--ease-expo)] group-hover:translate-y-0 ${s.fill}`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 z-[5] w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-[left,opacity] duration-[900ms] ease-[var(--ease-expo)] group-hover:left-[120%] group-hover:opacity-100"
      />
      <span className={`relative z-10 transition-colors duration-500 ${s.hoverText}`}>{children}</span>
      {arrow && (
        <IconArrow
          className={`relative z-10 h-4 w-4 transition-all duration-500 group-hover:translate-x-1 ${s.hoverText}`}
        />
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {inner}
    </button>
  );
}
