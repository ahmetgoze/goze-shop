import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import logo from "../img/logo-alt.svg";
import styles from "./Header.module.css";

const Header = () => {
  const [navbar, Setnavbar] = useState(false);

  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);

  const { cartItems } = cart;
  const { name } = userLogin.userInfo;

  const changeNavbar = () => {
    if (window.scrollY > 50) {
      Setnavbar(true);
    } else {
      Setnavbar(false);
    }
  };

  const logoutHandler = () => {};

  window.addEventListener("scroll", changeNavbar);

  return (
    <header className={navbar ? styles["sticky-header"] : styles["header"]}>
      <div className={styles["navbar-container"]}>
        <div className={styles.navbar}>
          <NavLink to="/" className={styles["navbar_logo"]}>
            <img src={logo} alt="Logo" />
          </NavLink>
          <ul className={styles["navbar_link"]}>
            <li>
              <NavLink to="/cart" activeClassName={styles["navbar-active"]}>
                <i className="fas fa-shopping-cart">
                  {cartItems.length > 0 && (
                    <>
                      {" "}
                      <span className={styles.circle}></span>
                      <span className={styles["items-in-cart"]}>
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </span>
                    </>
                  )}
                </i>
                Cart
              </NavLink>
            </li>
            <li>
              {!name && (
                <NavLink to="/login" activeClassName={styles["navbar-active"]}>
                  <i className="fas fa-user"></i>Sign In
                </NavLink>
              )}
              {name && (
                <>
                  <NavLink
                    to="/profile" className={styles['user-profile']}
                    activeClassName={styles["navbar-active"]}
                  >
                    <i className="fas fa-user-circle"></i>
                    {`${name}`}
                  <ul className={styles["dropdown-menu"]}>
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <Link to="/" onClick={logoutHandler}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
