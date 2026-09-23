import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Ingredients from "@/components/home/Ingredients";
import Showcase from "@/components/home/Showcase";
import Texture from "@/components/home/Texture";
import Gallery from "@/components/home/Gallery";
import Ritual from "@/components/home/Ritual";
import Reviews from "@/components/home/Reviews";
import ShopCta from "@/components/home/ShopCta";
import VelocityMarquee from "@/components/fx/VelocityMarquee";

const WORDS = ["Nourish", "Hydrate", "Soften", "For all skin types", "Triple Ceramide Complex", "2% Niacinamide"];

export default function Home() {
  return (
    <>
      <Hero />
      <VelocityMarquee className="border-y border-line py-5" speed={55}>
        {WORDS.map((w) => (
          <span key={w} className="flex items-center gap-8 pr-8 text-[12px] font-semibold uppercase tracking-[0.3em] text-ink">
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </VelocityMarquee>
      <Intro />
      <Ingredients />
      <Showcase />
      <Texture />
      <Gallery />
      <Ritual />
      <Reviews />
      <ShopCta />
    </>
  );
}
