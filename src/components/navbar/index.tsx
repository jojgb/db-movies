import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../redux/searchSlice";
import NavItem from "./navItem";

interface NavbarProps {
  className?: string;
  fontColor?: string;
}

const Navbar: FunctionComponent<NavbarProps> = ({ className, fontColor }) => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(setSearchQuery(search));
      navigate("/list");
    }
    dispatch(setSearchQuery(search));
  };

  return (
    <nav
      className={`p-4 fixed top-0 left-0 w-full z-50 shadow-md ${className}`}
    >
      <ul className="flex justify-between items-center w-full">
        <NavItem
          label="Moovie Time"
          href="/"
          className={fontColor} // Font color for this item
        />

        <div className="flex items-center relative w-1/3">
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              placeholder="Find moovie"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-slate-800 text-white"
            />
          </form>
        </div>

        <div className="flex space-x-5">
          <NavItem label="CATEGORIES" href="/" className={fontColor} />
          <NavItem label="MOVIES" href="/list" className={fontColor} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
