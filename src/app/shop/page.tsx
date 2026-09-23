import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ShopGrid from "@/components/shop/ShopGrid";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="pb-24 md:pb-40">
      <PageHeader eyebrow="Shop" title={<>Everything your skin <em>needs.</em></>} text="One honest lotion, thoughtfully bundled. More barrier-first essentials arriving soon." />
      <div className="container-x mt-14 md:mt-20">
        <ShopGrid />
      </div>
    </div>
  );
}
