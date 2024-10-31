import "./App.css";
import movies from "../../data/movies.json";

function App() {
  return (
    <>
      <h1>Langara TV+++</h1>
      <div className="grid">
        {movies.map((movie) => {
          return (
            <div key={movie.imdbID} className="cell movie-thumbnail">
              <img src={movie.Poster} alt={`${movie.Title} Poster`} />
              {/* <div>{movie.Title}</div> */}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
