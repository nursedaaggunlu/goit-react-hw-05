import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits, getImageUrl } from "../../services/tmdbApi";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCast() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieCredits(movieId);
        setCast(data);
      } catch {
        setError("Players failed to load");
      } finally {
        setIsLoading(false);
      }
    }

    loadCast();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>Player list is empty.</p>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.item}>
          {actor.profile_path ? (
            <img
              src={getImageUrl(actor.profile_path, "w200")}
              alt={actor.name}
              loading="lazy"
            />
          ) : (
            <div className={css.noImage}>No image</div>
          )}
          <p>{actor.name}</p>
          <p className={css.character}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
