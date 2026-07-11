import Footer from "@/layers/Footer";
import HeroBanner from "@/layers/Hero";
import TagMarquee from "@/layers/MarqueeCom";
import TrendingCreators from "@/layers/TrendingCreators";
import TrendingGrid from "@/layers/TrendingPosts";
import WhyCircleX from "@/layers/WhyCircleX";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <TagMarquee></TagMarquee>

      <TrendingGrid></TrendingGrid>
      <TrendingCreators></TrendingCreators>
      <WhyCircleX></WhyCircleX>
      <Footer></Footer>
    </div>
  );
}
