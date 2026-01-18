import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../services/tmdbApi";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReviews() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError("Comments not loaded");
      } finally {
        setIsLoading(false);
      }
    }

    loadReviews();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (reviews.length === 0) {
    return <p>No reviews found.</p>;
  }

  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.item}>
          <h4 className={css.author}>Author: {review.author}</h4>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
