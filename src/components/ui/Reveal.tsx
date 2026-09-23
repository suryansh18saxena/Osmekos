"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  stagger?: number;
  /** animate direct children instead of the wrapper */
  children_?: boolean;
};

export default function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y = 40,
  duration = 1.3,
  start = "top 88%",
  stagger = 0.1,
  children_ = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = children_ ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        filter: "blur(6px)",
        clearProps: "filter",
        duration,
        delay,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
