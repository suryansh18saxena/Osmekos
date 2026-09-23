"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCart, cartTotals } from "@/store/cart";
import { useUI } from "@/store/ui";
import { formatPrice } from "@/lib/format";
import { IconClose, IconMinus, IconPlus } from "./ui/Icons";
import Button from "./ui/Button";

export default function CartDrawer() {
  const ref = useRef<HTMLDivElement>(null);
  const initialised = useRef(false);
  const { lines, isOpen, close, setQty, remove, hydrated, setHydrated } = useCart();
  const lenis = useUI((s) => s.lenis);
  const { items, subtotal, shipping, total, count } = cartTotals(lines);

  useEffect(() => {
    useCart.persist.rehydrate();
    setHydrated();
  }, [setHydrated]);

  useGSAP(
    () => {
      const el = ref.current!;
      const panel = el.querySelector(".cart-panel");
      const overlay = el.querySelector(".cart-overlay");
      if (!initialised.current) {
        initialised.current = true;
        gsap.set(panel, { xPercent: 100 });
        gsap.set(overlay, { autoAlpha: 0 });
        if (!isOpen) return;
      }
      if (isOpen) {
        gsap.set(el, { pointerEvents: "auto" });
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(overlay, { autoAlpha: 1, duration: 0.5 }, 0)
          .to(panel, { xPercent: 0, duration: 0.9 }, 0)
          .from(".cart-row", { x: 30, autoAlpha: 0, stagger: 0.06, duration: 0.8 }, 0.25);
        lenis?.stop();
      } else {
        gsap
          .timeline({ defaults: { ease: "expo.inOut" }, onComplete: () => gsap.set(el, { pointerEvents: "none" }) })
          .to(panel, { xPercent: 100, duration: 0.7 }, 0)
          .to(overlay, { autoAlpha: 0, duration: 0.5 }, 0.1);
        if (useUI.getState().loaded) lenis?.start();
      }
    },
    { scope: ref, dependencies: [isOpen] },
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[150]">
      <div className="cart-overlay absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={close} />
      <aside className="cart-panel absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5 md:px-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.25em]">
            Your bag <span className="text-muted">({hydrated ? count : 0})</span>
          </h2>
          <button onClick={close} aria-label="Close cart" className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink hover:text-cream">
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8" data-lenis-prevent>
          {items.length === 0 ? (
            <div className="cart-row flex h-full flex-col items-center justify-center text-center">
              <p className="display text-4xl">Your bag is <em>empty.</em></p>
              <p className="mt-4 max-w-xs text-sm text-muted">Softer skin is one click away. Start with the Body Lotion.</p>
              <Button href="/product/body-lotion" className="mt-8" onClick={close}>
                Shop the lotion
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map(({ product, qty }) => (
                <li key={product.slug} className="cart-row flex gap-5">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-sand">
                    <Image src={product.images[0]} alt={product.name} fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/product/${product.slug}`} onClick={close} className="font-semibold">
                          {product.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted">{product.size}</p>
                      </div>
                      <p className="font-semibold tabular-nums">{formatPrice(product.price * qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-full border border-ink/15">
                        <button className="stepper-btn" onClick={() => setQty(product.slug, qty - 1)} aria-label="Decrease">
                          <IconMinus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                        <button className="stepper-btn" onClick={() => setQty(product.slug, qty + 1)} aria-label="Increase">
                          <IconPlus className="h-4 w-4" />
                        </button>
                      </div>
                      <button onClick={() => remove(product.slug)} className="link-line text-[11px] uppercase tracking-[0.2em] text-muted">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-row border-t border-line px-6 py-6 md:px-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            {subtotal < 999 && (
              <p className="mt-3 text-xs text-gold-2">Add {formatPrice(999 - subtotal)} more for free shipping.</p>
            )}
            <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
            <Button href="/checkout" className="mt-6 w-full" arrow onClick={close}>
              Checkout
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}
