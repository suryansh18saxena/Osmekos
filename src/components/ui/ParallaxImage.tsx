"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number;
  reveal?: boolean;
  sizes?: string;
  priority?: boolean;
  /**
   * "inner" drifts the photo inside its frame (needs a little overscan).
   * "card" moves the whole frame and never crops the image — use it for
   * artwork with text near the edges.
   */
  mode?: "inner" | "card";
};

export default function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  speed = 1,
  reveal = true,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  mode = "inner",
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = wrap.current;
      if (!el) return;
      if (mode === "inner") {
        const amt = Math.min(4.5, 4 * speed);
        gsap.fromTo(
          el.querySelector("img"),
          { yPercent: -amt },
          { yPercent: amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      } else {
        gsap.fromTo(
          el,
          { y: 50 * speed },
          { y: -50 * speed, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      }
      if (reveal) {
        gsap.from(el.firstElementChild, {
          clipPath: "inset(10% 6% 10% 6% round 2rem)",
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      }
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]" style={{ clipPath: "inset(0 round 0)" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          className={`object-cover will-change-transform ${mode === "inner" ? "scale-[1.1]" : ""} ${imgClassName}`}
        />
      </div>
    </div>
  );
}
