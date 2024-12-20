import dayjs from "dayjs";
import { FunctionComponent } from "react";
import noPreviewImage from "../../../../../assets/download.png";

interface CardProps {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

const Card: FunctionComponent<CardProps> = ({
  id,
  title,
  release_date,
  poster_path,
  vote_average,
}) => {
  return (
    <div
      key={id}
      className="relative group bg-gray-800 text-white rounded overflow-hidden"
    >
      {/* Overlay Hitam */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>

      {/* Container untuk Rating, Teks, dan Tombol */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
        {/* Bagian Atas - Rating */}
        <div
          className={`
            absolute
            top-2 right-2
            group-hover:top-2 group-hover:left-1/2
            group-hover:translate-x-[-50%] 
            transition-all duration-300
            z-10
          `}
        >
          <div className="bg-black/70 px-3 py-1 rounded flex items-center gap-1">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-white text-lg font-semibold">
              {vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Bagian Tengah - Teks Action */}
        <div
          className="
            flex-grow opacity-0 group-hover:opacity-100
            transition-opacity duration-300 
            flex justify-center items-center text-center"
        >
          <p className="text-white font-semibold">Action</p>
        </div>

        {/* Bagian Bawah - Tombol View */}
        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-red-500 text-black px-4 py-2 rounded-full font-semibold transition-all duration-200 hover:bg-yellow-600">
            View
          </button>
        </div>
      </div>

      {/* Movie Image */}
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-full h-60 object-cover group-hover:blur-sm transition-all duration-300"
        onError={(e) => (e.currentTarget.src = noPreviewImage)}
      />

      {/* Movie Title & Release Year */}
      <div className="p-2 group-hover:blur-sm transition-all duration-300">
        <p className="font-semibold">{title}</p>
        <p className="text-sm opacity-75">
          {release_date ? dayjs(release_date).year() : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default Card;
