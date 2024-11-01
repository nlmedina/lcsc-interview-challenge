import "./App.css";
import movies from "../movies.json";
import MovieThumbnail from "./MovieThumbnail";
import Movie from "./types/Movie";

function App() {
  return (
    <>
      <h1>Langara TV+++</h1>
      <div className="grid">
        {movies.map((movie: Movie) => {
          return <MovieThumbnail key={movie.imdbID} movie={movie} />;
        })}
      </div>
    </>
  );
}

export default App;
