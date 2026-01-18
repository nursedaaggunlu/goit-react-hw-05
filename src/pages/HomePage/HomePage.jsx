import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTrendingMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch {
        setError("An error occurred while uploading the movies.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTrendingMovies();
  }, []);

  return (
    <main>
      <h1 className={css.title}>Trending Today</h1>

      {isLoading && <p className={css.status}>Loading...</p>}
      {error && <p className={css.status}>{error}</p>}
      {!isLoading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </main>
  );
}
