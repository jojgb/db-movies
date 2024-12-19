import { FunctionComponent, useState, useEffect } from "react";
import { tmdbApi } from "../../../../api/apiConfig";
import dayjs from "dayjs";

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

// Fungsi untuk mengambil data film berdasarkan tab aktif
const fetchMoviesByType = async (type: string) => {
  try {
    const response = await tmdbApi.get(`/movie/${type}`); // Endpoint dinamis
    return response.data.results.slice(0, 10); // Ambil 10 film pertama
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
    return [];
  }
};

const DiscoverSection: FunctionComponent<DiscoverSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<string>("popular"); // State aktif: "popular" atau "release_date"
  const [movies, setMovies] = useState<Movie[]>([]); // State daftar film
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Fetch data sesuai tab aktif
  const loadMovies = async () => {
    setLoading(true);
    const type = activeTab === "popular" ? "popular" : "upcoming"; // "popular" atau "upcoming"
    const data = await fetchMoviesByType(type);
    console.log({ data });
    setMovies(data);
    setLoading(false);
  };

  // Panggil data saat tab aktif berubah
  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className="flex flex-col px-4">
      <section className="flex justify-between items-center w-full mb-4">
        {/* Discover Movies */}
        <p className="flex items-center">
          <span className="border-red-500 border-t-4 pb-1">Discover</span>
          <span className="ml-1">Movies</span>
        </p>

        {/* Tabs */}
        <div className="flex gap-4 items-center">
          <p
            className={`cursor-pointer px-4 py-2 rounded-md ${
              activeTab === "popular"
                ? "bg-red-500 text-white"
                : "bg-transparent"
            }`}
            onClick={() => setActiveTab("popular")}
          >
            Popularity
          </p>
          <p
            className={`cursor-pointer px-4 py-2 rounded-md ${
              activeTab === "upcoming"
                ? "bg-red-500 text-white"
                : "bg-transparent"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Release Date
          </p>
        </div>
      </section>

      {/* Daftar Film */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-gray-800 text-white p-2 rounded"
            >
              {/* Average Vote with Star */}
              <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-white text-sm font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>

              {/* Movie Image */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-60 object-cover rounded mb-2"
              />

              {/* Movie Title */}
              <p className="font-semibold">{movie.title}</p>
              <p className="text-sm opacity-75">
                {dayjs(movie.release_date).year()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscoverSection;
