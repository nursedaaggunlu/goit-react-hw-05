import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../../services/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMoviesByQuery(query);
        setMovies(data);
      } catch {
        setError("Failed to load movies");
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, [query]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const value = form.elements.query.value.trim();

    if (!value) return;

    setSearchParams({ query: value });
    form.reset();
  }

  return (
    <main>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Search movies"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {query && !isLoading && !error && movies.length === 0 && (
        <p>No movies found!</p>
      )}

      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
