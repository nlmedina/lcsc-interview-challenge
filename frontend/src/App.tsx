import { useState } from "react";
import { Theme, ThemePanel } from "@radix-ui/themes";

import MovieGrid from "./MovieGrid";

import "./App.css";
import movies from "../movies.json";
import { MoviePreview } from "./MoviePreview/MoviePreview";
import Movie from "./types/Movie";

function App() {
  const [isMoviePreviewOpen, setIsMoviePreviewOpen] = useState(false);
  const [moviePreviewed, setMoviePreviewed] = useState<Movie | null>(null);

  const handlePreviewMovie = (movie: Movie) => {
    setMoviePreviewed(movie);
    setIsMoviePreviewOpen(true);
  };

  return (
    <Theme>
      <h1>Langara TV+++</h1>
      <MovieGrid movies={movies} onClick={handlePreviewMovie} />
      <MoviePreview
        open={isMoviePreviewOpen}
        movie={moviePreviewed}
        onOpenChange={setIsMoviePreviewOpen}
      />
      <ThemePanel />
    </Theme>
  );
}

export default App;
