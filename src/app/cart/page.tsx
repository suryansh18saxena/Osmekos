"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, cartTotals } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/ui/Button";
import { IconMinus, IconPlus } from "@/components/ui/Icons";

export default function CartPage() {
  const { lines, setQty, remove, hydrated } = useCart();
  const { items, subtotal, shipping, total } = cartTotals(lines);

  return (
    <div className="pb-24 md:pb-40">
      <PageHeader eyebrow="Your bag" title={<>Almost <em>there.</em></>} />
      <div className="container-x mt-14 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {!hydrated ? null : items.length === 0 ? (
            <div className="rounded-[2rem] border border-line p-10 text-center">
              <p className="font-display text-3xl">Your bag is empty.</p>
              <Button href="/shop" className="mt-6">Browse the shop</Button>
            </div>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {items.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-6 py-6">
                  <Link href={`/product/${product.slug}`} className="relative h-36 w-28 shrink-0 overflow-hidden rounded-2xl bg-sand">
                    <Image src={product.images[0]} alt={product.name} fill sizes="112px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link href={`/product/${product.slug}`} className="text-lg font-semibold">{product.name}</Link>
                        <p className="mt-1 text-sm text-muted">{product.subtitle}</p>
                        <p className="text-xs text-muted">{product.size}</p>
                      </div>
                      <p className="font-semibold tabular-nums">{formatPrice(product.price * qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center overflow-hidden rounded-full border border-ink/15">
                        <button className="stepper-btn" onClick={() => setQty(product.slug, qty - 1)} aria-label="Decrease"><IconMinus className="h-4 w-4" /></button>
                        <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                        <button className="stepper-btn" onClick={() => setQty(product.slug, qty + 1)} aria-label="Increase"><IconPlus className="h-4 w-4" /></button>
                      </div>
                      <button onClick={() => remove(product.slug)} className="link-line text-[11px] uppercase tracking-[0.2em] text-muted">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="sticky top-28 rounded-[2rem] bg-sand p-8">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.25em]">Summary</h2>
            <dl className="mt-6 flex flex-col gap-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between border-t border-ink/15 pt-4 text-base font-semibold"><dt>Total</dt><dd className="tabular-nums">{formatPrice(total)}</dd></div>
            </dl>
            <Button href="/checkout" className="mt-8 w-full" arrow disabled={items.length === 0}>Checkout</Button>
            <p className="mt-4 text-center text-xs text-muted">Taxes included. Free shipping over ₹999.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
