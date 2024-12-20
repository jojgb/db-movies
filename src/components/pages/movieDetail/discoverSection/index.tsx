import { FunctionComponent, useState, useEffect } from "react";
import { tmdbApi } from "../../../../api/apiConfig";
import Card from "../../home/discoverSection/card";

interface DiscoverSectionProps {
  className?: string;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
}

const fetchMoviesByType = async (type: string) => {
  try {
    const params =
      type === "popular"
        ? { sort_by: "vote_average.desc" } // Sort by popularity (vote count descending)
        : { sort_by: "primary_release_date.desc" }; // Sort by release date (most recent)

    const response = await tmdbApi.get("/discover/movie", { params });
    return response.data.results.slice(0, 10); // Ambil 10 film pertama
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
    return [];
  }
};

const DiscoverSection: FunctionComponent<DiscoverSectionProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data sesuai tab aktif
  const loadMovies = async () => {
    setLoading(true);
    const data = await fetchMoviesByType("popular");
    console.log({ data });
    setMovies(data);
    setLoading(false);
  };

  // Panggil data saat tab aktif berubah
  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col px-8">
      <section className="flex justify-between items-center w-full mb-4 mt-8">
        {/* Discover Movies */}
        <p className="flex items-center">
          <span>Recommendation Movies</span>
        </p>
      </section>
      {/* Daftar Film */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <Card
              id={movie.id}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              title={movie.title}
              release_date={movie.release_date}
              key={movie.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscoverSection;
