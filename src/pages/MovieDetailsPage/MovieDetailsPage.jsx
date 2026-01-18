import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../services/tmdbApi";
import css from "./MovieDetailsPage.module.css";
import { getImageUrl } from "../../services/tmdbApi";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from ?? "/movies";

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError("Movie information could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    }

    loadMovie();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const posterUrl = getImageUrl(movie.poster_path, "w300");

  return (
    <main>
      <Link to={backLink} className={css.backLink}>
        ← Go back
      </Link>

      <div className={css.topSection}>
        {movie.poster_path ? (
          <img src={posterUrl} alt={movie.title} className={css.poster} />
        ) : (
          <div className={css.noPoster}>
            The movie poster <br /> cannot be displayed.
          </div>
        )}

        <div className={css.details}>
          <h1 className={css.title}>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>

          <p className={css.score}>
            User score: {Math.round(movie.vote_average * 10)}%
          </p>

          <h3 className={css.sectionTitle}>Overview</h3>
          <p className={css.overview}>{movie.overview}</p>

          <h3 className={css.sectionTitle}>Genres</h3>
          <p className={css.genres}>
            {movie.genres.map((genre) => genre.name).join(" ")}
          </p>
        </div>
      </div>

      <h3 className={css.subTitle}>Additional information</h3>
      <ul className={css.infoList}>
        <li>
          <Link to="cast" state={{ from: backLink }} className={css.infoLink}>
            Cast
          </Link>
        </li>
        <li>
          <Link
            to="reviews"
            state={{ from: backLink }}
            className={css.infoLink}
          >
            Reviews
          </Link>
        </li>
      </ul>

      <div className={css.bottomSection}>
        <Outlet />
      </div>
    </main>
  );
}
