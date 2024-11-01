import { Grid } from "@radix-ui/themes";
import React from "react";

import Movie from "../types/Movie";
import MovieThumbnail from "../MovieThumbnail";

interface MovieGridProps {
  movies: Movie[];
  onClick: (movie: Movie) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, onClick }) => {
  return (
    <Grid columns="6" gap="3" width="auto">
      {movies.map((movie: Movie) => {
        return (
          <MovieThumbnail key={movie.imdbID} movie={movie} onClick={onClick} />
        );
      })}
    </Grid>
  );
};
