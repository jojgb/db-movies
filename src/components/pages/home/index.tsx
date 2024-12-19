import { FunctionComponent } from "react";
import CarouselSection from "./carouselSection";

interface HomeProps {
  className?: string;
}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="bg-black text-white">
      {/* Carousel   */}
      <CarouselSection />

      {/* Discover Movies */}
      <section className="p-4 text-center">
        <h1 className="text-3xl font-bold my-6">Discover Movies</h1>
        <p>Explore our collection of popular movies and TV shows!</p>
      </section>
    </div>
  );
};

export default Home;
