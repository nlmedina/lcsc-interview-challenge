import React from "react";

import Movie from "../types/Movie";

export const MovieThumbnail: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="cell movie-thumbnail">
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
    </div>
  );
};
