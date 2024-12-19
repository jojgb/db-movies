import { FunctionComponent } from "react";
import CarouselSection from "./carouselSection";
import DiscoverSection from "./discoverSection";

interface HomeProps {
  className?: string;
}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="bg-black text-white">
      {/* Carousel   */}
      <CarouselSection />

      {/* Discover Movies */}
      <DiscoverSection />
    </div>
  );
};

export default Home;
