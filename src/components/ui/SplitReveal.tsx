"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useUI } from "@/store/ui";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  /** run as soon as the preloader finishes instead of on scroll */
  immediate?: boolean;
  start?: string;
  type?: "lines" | "words" | "chars";
  stagger?: number;
  duration?: number;
};

export default function SplitReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  immediate = false,
  start = "top 85%",
  type = "lines",
  stagger,
  duration = 1.4,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const loaded = useUI((s) => s.loaded);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (immediate && !loaded) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });

      let split: SplitText | undefined;
      let tween: gsap.core.Tween | undefined;
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        split = SplitText.create(el, {
          type,
          mask: type,
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) => {
            const targets = type === "lines" ? self.lines : type === "words" ? self.words : self.chars;
            tween = gsap.from(targets, {
              yPercent: 110,
              rotate: type === "chars" ? 4 : 0,
              filter: "blur(8px)",
              clearProps: "filter",
              duration,
              delay,
              ease: "expo.out",
              stagger: stagger ?? (type === "lines" ? 0.09 : type === "words" ? 0.04 : 0.02),
              ...(immediate ? {} : { scrollTrigger: { trigger: el, start, once: true } }),
            });
            return tween;
          },
        });
      });

      return () => {
        cancelled = true;
        tween?.scrollTrigger?.kill();
        tween?.kill();
        split?.revert();
      };
    },
    { scope: ref, dependencies: [loaded] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
