import { NavLink, Outlet, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  const location = useLocation();
  const isMoviesPage = location.pathname.startsWith("/movies");

  return (
    <>
      <nav className={`${css.nav} ${isMoviesPage ? css.noBorder : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          Movies
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
}
