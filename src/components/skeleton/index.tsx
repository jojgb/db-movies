import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse bg-gray-800 p-2 rounded-lg">
      {/* Poster */}
      <div className="w-full h-48 bg-gray-700 rounded-md"></div>
      {/* Title */}
      <div className="mt-2 h-4 bg-gray-700 rounded w-3/4"></div>
      {/* Release Date */}
      <div className="mt-1 h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
