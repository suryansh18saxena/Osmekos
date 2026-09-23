"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "lotion", label: "Lotion" },
  { key: "set", label: "Sets" },
  { key: "soon", label: "Coming soon" },
] as const;

export default function ShopGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const ref = useRef<HTMLDivElement>(null);
  const list = PRODUCTS.filter((p) => filter === "all" || p.category === filter);

  useGSAP(
    () => {
      gsap.fromTo(".grid-item", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 1.1, ease: "expo.out", overwrite: true });
    },
    { scope: ref, dependencies: [filter] },
  );

  return (
    <div ref={ref}>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-400 ${filter === f.key ? "border-ink bg-ink text-cream" : "border-ink/20 text-ink hover:border-ink"}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
        {list.map((p) => (
          <div key={p.slug} className="grid-item">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
