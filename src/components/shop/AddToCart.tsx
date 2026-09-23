"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { getProduct } from "@/lib/products";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import { IconMinus, IconPlus } from "@/components/ui/Icons";

export default function AddToCart({ slug, withQty = false, className = "" }: { slug: string; withQty?: boolean; className?: string }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const product = getProduct(slug);
  if (!product) return null;

  if (!product.available) {
    return (
      <Button variant="outline" disabled className={className}>
        Coming soon
      </Button>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {withQty && (
        <div className="flex items-center overflow-hidden rounded-full border border-ink/20">
          <button className="stepper-btn h-[52px] w-12" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            <IconMinus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center tabular-nums">{qty}</span>
          <button className="stepper-btn h-[52px] w-12" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
            <IconPlus className="h-4 w-4" />
          </button>
        </div>
      )}
      <Magnetic>
        <Button
          arrow
          onClick={() => {
            add(slug, qty);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
        >
          {added ? "Added to bag" : "Add to bag"}
        </Button>
      </Magnetic>
    </div>
  );
}
