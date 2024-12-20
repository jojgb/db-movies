import { FunctionComponent, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../redux/searchSlice";
import NavItem from "./navItem";
import { tmdbApi } from "../../api/apiConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Movie } from "../pages/movieList";

interface NavbarProps {
  className?: string;
  fontColor?: string;
}

const Navbar: FunctionComponent<NavbarProps> = ({ className, fontColor }) => {
  const [search, setSearch] = useState<string>("");
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // To toggle dropdown visibility
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); // Store filtered movie suggestions
  const movies = useSelector((state: RootState) => state.movie.movies);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    dispatch(setSearchQuery(query));

    // Filter movies based on search query
    if (query.trim()) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
      setShowDropdown(true); // Show dropdown with suggestions
    } else {
      setFilteredMovies([]);
      setShowDropdown(false); // Hide dropdown if query is empty
    }

    navigate("/list"); // Redirect to list page on search change
  };

  // Fetch Genres
  const fetchGenres = async () => {
    try {
      const response = await tmdbApi.get("/genre/movie/list");
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleCategoryClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuggestionClick = (movie: any) => {
    setSearch(movie.title);
    setFilteredMovies([]);
    setShowDropdown(false);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <nav
      className={`p-4 fixed top-0 left-0 w-full z-50 pr-8 shadow-md ${className}`}
    >
      <ul className="flex justify-between items-center w-full">
        <NavItem label="Moovie Time" href="/" className={fontColor} />

        <div className="flex items-center relative w-1/3">
          <input
            type="text"
            placeholder="Find moovie"
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-md bg-slate-800 text-white"
          />
          {showDropdown && filteredMovies.length > 0 && (
            <ul className="absolute left-0 top-full bg-slate-800 text-white p-2 rounded-md mt-2 shadow-md w-full z-50">
              {filteredMovies.map((movie) => (
                <li
                  key={movie.id}
                  className="py-2 px-4 hover:bg-slate-700 cursor-pointer text-left" // Align text to the left
                  onClick={() => handleSuggestionClick(movie)} // Handle suggestion click
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex space-x-5">
          <div className="relative" ref={dropdownRef}>
            <NavItem
              label="CATEGORIES"
              className={fontColor}
              onClick={handleCategoryClick}
            />
            {showDropdown && (
              <ul className="absolute left-0 top-full bg-slate-800 text-white p-2 rounded-md mt-2 shadow-md w-48 z-50">
                {genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="py-2 px-4 hover:bg-slate-700 cursor-pointer"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <NavItem label="MOVIES" href="/list" className={fontColor} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
