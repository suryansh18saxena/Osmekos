import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/fx/ScrollProgress";

const serif = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://osmekos.com"),
  title: {
    default: "OsmeKos — Skincare that feels right",
    template: "%s — OsmeKos",
  },
  description:
    "OsmeKos Body Lotion with Triple Ceramide Complex, Niacinamide, Shea Butter and Vitamin E. Deep hydration, non-greasy, for all skin types.",
  openGraph: {
    title: "OsmeKos — Skincare that feels right",
    description: "Thoughtfully formulated body care. Nourish. Hydrate. Soften.",
    images: ["/products/brand-hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        <Preloader />
        <ScrollProgress />
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
