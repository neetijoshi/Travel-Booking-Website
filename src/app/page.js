import BestHotels from "@/components/best-hotels/BestHotels";
import Hero from "@/components/hero/hero";
import PopularLocations from "@/components/popular-locations/PopularLocations";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero/>
      <PopularLocations/>
      <Hero />
      <BestHotels/>
    </>
  );
}
