export type Ingredient = {
  pct: string;
  name: string;
  short: string;
  long: string;
};

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: "lotion" | "set" | "soon";
  price: number;
  compareAt?: number;
  size: string;
  images: string[];
  badge?: string;
  description: string;
  benefits: string[];
  available: boolean;
  contents?: string[];
};

export const INGREDIENTS: Ingredient[] = [
  {
    pct: "6%",
    name: "Glycerin",
    short: "Deeply hydrates",
    long: "A humectant that pulls water into the upper layers of the skin and keeps it there, so skin stays plump and comfortable for hours after application.",
  },
  {
    pct: "3%",
    name: "Shea Butter",
    short: "Nourishes & softens",
    long: "Rich in fatty acids and vitamins, shea butter melts into dry patches, smoothing rough texture and leaving a soft, cushioned finish.",
  },
  {
    pct: "2%",
    name: "Coconut Oil",
    short: "Helps retain moisture",
    long: "A lightweight emollient that seals hydration in without a heavy, greasy film, so the lotion absorbs fast and stays breathable.",
  },
  {
    pct: "2%",
    name: "Niacinamide",
    short: "Supports even-looking skin",
    long: "Vitamin B3 supports a healthy skin barrier and a more even, refined look over time. Gentle enough for daily use on all skin types.",
  },
  {
    pct: "0.9%",
    name: "Triple Ceramide Complex",
    short: "Strengthens skin barrier",
    long: "Ceramide NP, AP and EOP replenish the skin's own lipids, reinforcing the moisture barrier that keeps water in and irritants out.",
  },
  {
    pct: "0.5%",
    name: "Vitamin E",
    short: "Antioxidant care",
    long: "Tocopherol protects skin lipids from everyday oxidative stress and adds a final layer of comfort to the formula.",
  },
];

export const INCI =
  "Aqua, Glycerin 6%, Cetearyl Alcohol, Cetyl Alcohol, Glyceryl Stearate SE, Ceteareth-20, C12-15 Alkyl Benzoate, Isododecane, Butyrospermum Parkii (Shea) Butter 3%, Niacinamide 2%, Cocos Nucifera (Coconut) Oil 2%, Palmitic Acid 1%, Stearic Acid 1%, Dimethicone (and) Dimethiconol, Carbomer, Tocopherol 0.5%, Ceramide NP 0.5%, Ceramide AP 0.2%, Ceramide EOP 0.2%, Phenoxyethanol, Sodium Benzoate, Disodium EDTA, Fragrance, Limonene, Citronellol, Linalool, Geraniol, Hexyl Cinnamal.";

export const HOW_TO_USE = [
  {
    title: "Apply",
    text: "Take a generous amount on clean, dry body skin. A little goes further than you think.",
  },
  {
    title: "Massage",
    text: "Work it in with slow, circular motions until fully absorbed. Non-greasy, so it's done in seconds.",
  },
  {
    title: "Repeat",
    text: "Best after a shower while skin is still slightly damp. Use morning and evening, or as needed.",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "body-lotion",
    name: "Body Lotion",
    subtitle: "Triple Ceramide Complex + Niacinamide",
    category: "lotion",
    price: 899,
    size: "200 ml / 6.76 fl. oz.",
    images: [
      "/products/front.jpg",
      "/products/rock.jpg",
      "/products/pump.jpg",
      "/products/back.jpg",
      "/products/flatlay-towel.jpg",
    ],
    badge: "Bestseller",
    description:
      "A thoughtfully formulated daily lotion combining Glycerin, Shea Butter, Niacinamide, Triple Ceramides, Coconut Oil and Vitamin E to replenish hydration, nourish dry skin and support the skin's natural moisture barrier. Leaves skin soft, smooth and comfortable.",
    benefits: ["Absorbs quickly", "Non-greasy finish", "Leaves skin soft and smooth", "Perfect for daily use"],
    available: true,
  },
  {
    slug: "the-duo",
    name: "The Duo",
    subtitle: "Two Body Lotions, one for home and one for travel",
    category: "set",
    price: 1699,
    compareAt: 1798,
    size: "2 × 200 ml",
    images: ["/products/more-than-moisture.jpg", "/products/brand-hero.jpg", "/products/front.jpg"],
    badge: "Save ₹99",
    description:
      "Keep one by the shower and one in your bag. The same ceramide-rich formula, twice over, so your daily ritual never skips a day.",
    benefits: ["Two full-size bottles", "Same formula, same care", "Free shipping included"],
    available: true,
    contents: ["2 × Body Lotion 200 ml"],
  },
  {
    slug: "daily-ritual-set",
    name: "Daily Ritual Set",
    subtitle: "Three months of softer skin",
    category: "set",
    price: 2399,
    compareAt: 2697,
    size: "3 × 200 ml",
    images: ["/products/formulated.jpg", "/products/flatlay-towel.jpg", "/products/lightweight.jpg"],
    badge: "Best value",
    description:
      "A season's supply of the OsmeKos Body Lotion. Three bottles, one ritual, and skin that stays consistently nourished from the first week to the last.",
    benefits: ["Three full-size bottles", "Lowest price per ml", "Free shipping included"],
    available: true,
    contents: ["3 × Body Lotion 200 ml"],
  },
  {
    slug: "hand-cream",
    name: "Hand Cream",
    subtitle: "Ceramides + Shea Butter",
    category: "soon",
    price: 449,
    size: "50 ml",
    images: ["/products/swatch.jpg", "/products/pump.jpg"],
    badge: "Coming soon",
    description:
      "The same barrier-first thinking, sized for your hands. Fast-absorbing, non-greasy, and built for a day of washing and typing.",
    benefits: ["Fast-absorbing", "Non-greasy", "Barrier support"],
    available: false,
  },
  {
    slug: "body-wash",
    name: "Body Wash",
    subtitle: "Gentle, low-foam cleanse",
    category: "soon",
    price: 649,
    size: "250 ml",
    images: ["/products/pump.jpg", "/products/swatch.jpg"],
    badge: "Coming soon",
    description:
      "A gentle cleanse that respects your barrier, so the lotion has less to repair. Launching later this year.",
    benefits: ["Sulfate-free", "Skin-neutral pH", "Light natural scent"],
    available: false,
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const REVIEWS = [
  { name: "Ananya R.", city: "Bengaluru", text: "Absorbs in seconds and my skin stays soft all day. The first lotion I've actually finished a bottle of." },
  { name: "Karan M.", city: "Mumbai", text: "Non-greasy is not a marketing line here. I put it on and get dressed straight away." },
  { name: "Sneha P.", city: "Pune", text: "My winter dryness is gone. The ceramides really do something, my skin feels calmer." },
  { name: "Ritika S.", city: "New Delhi", text: "Smells subtle, feels expensive, priced honestly. The pump is a small luxury." },
  { name: "Arjun V.", city: "Hyderabad", text: "I have sensitive skin and this didn't sting once. Now on my third bottle." },
  { name: "Meera K.", city: "Chennai", text: "The label tells you exactly what's inside and how much. That transparency won me over." },
  { name: "Devansh T.", city: "Jaipur", text: "Lightweight but somehow my elbows and knees are finally smooth. Great after a shower." },
  { name: "Priya N.", city: "Kolkata", text: "Bought the Duo, one lives in my gym bag. It's become a habit, not a chore." },
];
