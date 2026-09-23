# OsmeKos — Skincare that feels right

E-commerce site for the OsmeKos Body Lotion (Triple Ceramide Complex + Niacinamide).
Built with Next.js 16 (App Router), Tailwind CSS 4, GSAP 3.15 (ScrollTrigger + SplitText), Lenis smooth scroll and Zustand. Type is Playfair Display for display (hero at weight 500, three-line stacked headline with an italic gold middle word) and Manrope for body. Gradient text needs bottom padding on the element itself, or descenders get clipped.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | What it does |
| --- | --- |
| `/` | Preloader, full-bleed photo hero, marquee, benefits, ingredients (annotated bottle + card grid), pinned bottle showcase, texture, horizontal gallery, how-to-use, reviews, shop CTA |
| `/shop` | Filterable product grid (lotion, sets, coming soon) with quick add |
| `/product/[slug]` | Gallery, sticky buy box with quantity, accordions (key ingredients, full INCI, how to use, shipping), related products |
| `/cart` | Bag with quantity steppers and summary |
| `/checkout` | Contact, address and payment form with animated order confirmation |
| `/about` | Brand story, values, company and customer-care details |

## Structure

- `src/app` — routes, root layout (fonts, smooth scroll, preloader, cursor, navbar, cart drawer, footer)
- `src/components/home` — one file per home section
- `src/components/shop` — product card, grid, gallery, add-to-cart
- `src/components/ui` — buttons, magnetic wrapper, scroll reveal, split-text reveal, parallax image, marquee, accordion, icons
- `src/lib/products.ts` — product catalogue, ingredients, INCI, reviews
- `src/store` — cart (persisted to localStorage) and UI state
- `public/products` — product photography cropped from the brand reference sheets, plus three composites generated from them: `hero-bg.jpg` (wide hero), `hero-bg-mobile.jpg` (portrait hero) and `bottle-frame.jpg` (ingredients panel)

## Imagery pipeline

The two supplied reference sheets were upscaled 4x with Real-ESRGAN (ONNX, run on CPU), giving 6144×4096 sources. Every file in `public/products` is cropped from those at the exact panel bounds, measured from the white gutters so no seam lines leak in. Three files are composites built from the clean bottle region: `hero-bg.jpg` (3840×2160), `hero-bg-mobile.jpg` and `bottle-frame.jpg`. The upscale and asset scripts live in the session scratchpad, so re-run them only if the source photography changes.

Many panels have marketing copy printed into them. Show those whole, in a frame matching their aspect ratio, and use `ParallaxImage` with `mode="card"`, which moves the frame instead of zooming the photo, so nothing gets cropped.

## Effects kit (`src/components/fx`)

- `ScrollProgress`: gold reading-progress bar pinned to the top of the viewport.
- `VelocityMarquee`: marquee that speeds up and skews with scroll velocity and follows scroll direction.
- `CountUp`: numbers count up when scrolled into view and keep their prefix and suffix, for example `1,200` or `100%`.
- `useSpotlight`: a gold spotlight that follows the pointer, a 3D tilt and a hover lift on cards. It is used on ingredient and review cards.
- `GoldDust`: canvas bokeh in the hero. It pauses off-screen and under reduced motion.
- `.text-shimmer`: animated liquid-gold gradient text, used on the hero "Moisture" and the footer "K".
- `Manifesto`: philosophy paragraph whose words fill in as you scroll, with image pills that expand inline.

## Animation notes

- GSAP plugins are registered once in `src/lib/gsap.ts`; every component uses `useGSAP` with a scope so animations clean up on unmount.
- Lenis drives scrolling and feeds `ScrollTrigger.update`; it is paused while the preloader, cart drawer or mobile menu is open.
- Do not combine Tailwind `translate-*` / `opacity-0` classes with GSAP tweens on the same element. Tailwind 4 uses the CSS `translate` property, which GSAP bakes into its transform cache and the element ends up offset. Set initial states with `gsap.set` instead.
- The navbar is a floating glass capsule: translucent white, `backdrop-blur`, inner highlight and a glass pill that glides under hovered links. It hides on scroll down and returns on scroll up.
- There is no custom cursor.
- The preloader plays fully once per browser session, then does a short reveal on later loads.
- Next.js caches optimised images under `.next/cache/images` keyed by path. When a file in `public/` is replaced in place, clear that folder or rename the file, otherwise the old version keeps being served.
