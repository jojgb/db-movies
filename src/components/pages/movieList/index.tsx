import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tmdbApi } from "../../../api/apiConfig";
import Card from "./card";
import { setMovies } from "../../../redux/moviesSlice"; // Import setMovies dari moviesSlice
import { RootState } from "../../../redux/store"; // RootState untuk selector

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const MovieList: FunctionComponent = () => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const dispatch = useDispatch();

  const searchQuery = useSelector((state: RootState) => state.search.query);
  const movies = useSelector((state: RootState) => state.movie.movies);
  console.log({ movies });
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Genres
  const fetchGenres = async () => {
    try {
      const response = await tmdbApi.get("/genre/movie/list");
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Fetch Movies with Filters
  const fetchMovies = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: Record<string, any> = {
        sort_by: sortBy,
        with_genres: selectedGenres.join(","),
        query: searchQuery,
      };

      const response = searchQuery
        ? await tmdbApi.get("/search/movie", { params: { query: searchQuery } })
        : await tmdbApi.get("/discover/movie", { params });

      // Dispatch to Redux instead of using setMovies in local state
      dispatch(setMovies(response.data.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenres, sortBy, searchQuery]);

  // Handle Genre Checkbox Change
  const handleGenreChange = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="mt-16 p-4 bg-gray-900 text-white">
      {/* Title */}
      <div className="flex items-center justify-between p-4 mb-4">
        <h1 className="text-3xl font-bold border-b-4 border-red-500 inline-block">
          Movies
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex px-4">
        {/* Left Sidebar for Filters */}
        <div className="w-1/4 pr-4">
          <h2 className="text-xl font-bold mb-2 text-left">Sort By</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded-md w-full"
          >
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
          </select>

          <h2 className="text-xl font-bold mb-2 mt-4 text-left">Genres</h2>
          <div className="flex flex-col gap-2 mb-6">
            {genres.map((genre) => (
              <label key={genre.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                  className="mr-2"
                />
                {genre.name}
              </label>
            ))}
          </div>
        </div>

        {/* Right Side for Movie Grid */}
        <div className="w-3/4">
          {/* Movies Grid */}
          {loading ? (
            <p className="text-center">Loading movies...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies?.map((movie: Movie) => (
                <Card
                  id={movie.id}
                  key={movie.id}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  title={movie.title}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
