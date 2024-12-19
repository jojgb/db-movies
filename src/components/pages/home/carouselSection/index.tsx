import { FunctionComponent, useEffect, useState } from "react";
import { tmdbApi } from "../../../../api/apiConfig";
import Carousel from "react-multi-carousel"; // Import React Multi Carousel
import "react-multi-carousel/lib/styles.css"; // Import carousel styles

interface CarouselSectionProps {
  className?: string;
}

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
}

const CarouselSection: FunctionComponent<CarouselSectionProps> = () => {
  const fetchPopularMovies = async () => {
    try {
      const response = await tmdbApi.get("/movie/popular");
      return response.data.results.slice(0, 5); // Ambil 5 data pertama
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      return [];
    }
  };

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetchPopularMovies();
      setMovies(data);
    };
    getPopularMovies();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // screens larger than 2000px
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      // screens between 1024px and 3000px
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      // screens between 464px and 1024px
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      // screens smaller than 464px
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {/* Carousel */}
      <section className="w-full">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          showDots
          arrows
          className="w-full h-[500px]"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="relative w-full h-full">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 w-full">
                <h2 className="text-2xl font-bold">{movie.title}</h2>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default CarouselSection;
