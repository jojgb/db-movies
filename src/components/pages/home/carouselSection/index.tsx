import { FunctionComponent, useEffect, useState } from "react";
import { tmdbApi } from "../../../../api/apiConfig";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import dayjs from "dayjs";

interface CarouselSectionProps {
  className?: string;
}

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
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
      console.log({ data });
      setMovies(data);
    };
    getPopularMovies();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
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
          arrows={false}
          className="w-full h-[500px]"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="relative w-full h-full flex">
              <div className="w-1/2 h-full">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 h-full p-4 bg-black bg-opacity-50 flex flex-col justify-between">
                {/* Rating and Title Section */}
                <div>
                  <p className="text-yellow-500 flex items-center mb-2">
                    ⭐ {movie.vote_average}
                  </p>
                  <h2 className="text-2xl font-bold text-white text-left">
                    {movie.title}
                  </h2>
                </div>
                {/* Year and Description Section */}
                <div>
                  <p className="text-white text-left">
                    {dayjs(movie.release_date).year()}
                  </p>
                  <p className="text-white mt-2 text-sm text-left">
                    {movie.overview.length > 100
                      ? `${movie.overview.substring(0, 100)}...`
                      : movie.overview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default CarouselSection;
