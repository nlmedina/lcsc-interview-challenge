import React from "react";

import Movie from "../types/Movie";

interface MovieThumbnailProps {
  movie: Movie;
  onClick: (m: Movie) => void;
}

export const MovieThumbnail: React.FC<MovieThumbnailProps> = ({
  movie,
  onClick,
}) => {
  return (
    <div
      className="movie-thumbnail"
      role="button"
      onClick={() => {
        console.log("Reached!");
        onClick(movie);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
    </div>
  );
};
