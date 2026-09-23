"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IconPlus } from "./Icons";

export function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const body = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(body.current, { height: open ? "auto" : 0, duration: 0.7, ease: "expo.out" });
    },
    { dependencies: [open] },
  );

  return (
    <div className="border-t border-line last:border-b">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left" aria-expanded={open}>
        <span className="font-semibold">{title}</span>
        <IconPlus className={`h-5 w-5 transition-transform duration-500 ease-[var(--ease-expo)] ${open ? "rotate-45" : ""}`} />
      </button>
      <div ref={body} className="overflow-hidden" style={{ height: defaultOpen ? "auto" : 0 }}>
        <div className="pb-6 text-[15px] leading-relaxed text-ink-2">{children}</div>
      </div>
    </div>
  );
}
