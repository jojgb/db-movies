import { FunctionComponent } from "react";
import NavItem from "./navItem";

interface NavbarProps {
  className?: string;
  fontColor?: string;
}

const Navbar: FunctionComponent<NavbarProps> = ({ className, fontColor }) => {
  return (
    <nav
      className={"p-4 fixed top-0 left-0 w-full z-50 shadow-md".concat(
        className ? " " + className : ""
      )}
    >
      <ul className="flex justify-between items-center w-full">
        <NavItem label="Moovie Time" href="/" className={fontColor} />

        <div className="flex items-center relative w-1/3">
          <input
            type="text"
            placeholder="Find moovie"
            className={
              "w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
            }
          />
          <span className="absolute right-3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m2.15-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>

        <div className="flex space-x-5">
          <NavItem label="CATEGORIES" href="/" className={fontColor} />
          <NavItem label="MOOVIES" href="/list" className={fontColor} />
          <NavItem label="TV SHOWS" href="/" className={fontColor} />
          <NavItem label="LOGIN" href="/" className={fontColor} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
