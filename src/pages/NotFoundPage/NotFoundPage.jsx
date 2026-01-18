import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={css.wrapper}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>Page not found</p>
      <Link className={css.link} to="/">
        Go to Home
      </Link>
    </main>
  );
}
