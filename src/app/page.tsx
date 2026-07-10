import Footer from "@/layers/Footer";
import HeroBanner from "@/layers/Hero";
import TrendingGrid from "@/layers/TrendingPosts";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <HeroBanner></HeroBanner>
     <TrendingGrid></TrendingGrid>
     <Footer></Footer>
    </div>
  );
}
