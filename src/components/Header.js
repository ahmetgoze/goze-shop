import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/logo2.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles["navbar-container"]}>
        <div className={styles.navbar}>
          <NavLink to="/" className={styles["navbar_logo"]}>
            <img src={logo} alt="Logo" />
          </NavLink>
          <ul className={styles["navbar_link"]}>
            <li>
              <NavLink to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <i className="fas fa-user"></i> Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
