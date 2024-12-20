import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { tmdbApi } from "../../../api/apiConfig"; // Pastikan endpoint TMDB sudah ada
import dayjs from "dayjs";
import noPreviewImage from "../../../assets/download.png";
import DiscoverSection from "./discoverSection";

interface MovieDetailProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  budget: number;
  status: string;
  original_language: string;
  genres: { id: number; name: string }[];
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>(); // Ambil parameter ID dari URL
  const [movie, setMovie] = useState<MovieDetailProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <div className="text-white text-center">Loading...</div>;

  if (!movie)
    return <div className="text-white text-center">Movie not found</div>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen mt-16">
      {/* Backdrop Image */}
      {movie.backdrop_path && (
        <div
          className="w-full h-60 bg-cover bg-center rounded-lg mb-6"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          }}
        ></div>
      )}

      {/* Navbar-like Section behind Poster */}
      <div className="bg-black text-white p-4 mb-6 relative z-10">
        <div className="flex justify-end items-center">
          {/* Rating */}
          <span className="text-yellow-400 text-lg">★</span>
          <span className="text-white text-lg font-semibold mr-4">
            {movie.vote_average.toFixed(1)}
          </span>
          {/* Movie Status */}
          <p className="text-lg mr-4">
            <span className="font-semibold">Status:</span> {movie.status}
          </p>
          {/* Movie Language */}
          <p className="text-lg mr-4">
            <span className="font-semibold">Language:</span>{" "}
            {movie.original_language.toUpperCase()}
          </p>
          {/* Movie Budget */}
          <p className="text-lg">
            <span className="font-semibold">Budget:</span> $
            {movie.budget.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative px-8">
        {/* Poster Image */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          onError={(e) => (e.currentTarget.src = noPreviewImage)}
          className="w-full md:w-1/3 object-cover rounded-lg -mt-52 z-20" // Increased negative margin to move poster higher
        />

        {/* Movie Details */}
        <div className="flex-1 mt-16">
          {" "}
          {/* Adjusted margin-top for spacing */}
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">
            <span className="font-semibold">Release Date:</span>{" "}
            {dayjs(movie.release_date).format("MMMM D, YYYY")}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Rating:</span>{" "}
            {movie.vote_average.toFixed(1)} / 10
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Genres:</span>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-md leading-relaxed">{movie.overview}</p>
        </div>
      </div>

      {/* Discover Section placed below movie details */}
      <DiscoverSection />
    </div>
  );
};

export default MovieDetail;
