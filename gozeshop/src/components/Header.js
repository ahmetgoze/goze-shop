import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import logo from "../img/logo2.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["navbar-container"]}>
        <div className={styles.navbar}>
          <NavLink to="/" className={styles["navbar_logo"]}>
            <img src={logo} alt="Logo" />
          </NavLink>
          <ul className={styles["navbar_link"]}>
            <li>
              <NavLink to="/cart" activeClassName={styles["navbar-active"]}>
                <i className="fas fa-shopping-cart"></i> Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName={styles["navbar-active"]}>
                <i className="fas fa-user"></i> Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
