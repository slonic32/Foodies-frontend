import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

export default function Logo({ variant = "dark" }) {
  return (
    <NavLink
      to="/"
      className={`${css.logo} ${
        variant === "light" ? css.logoLight : css.logoDark
      }`}
    >
      foodies
    </NavLink>
  );
}