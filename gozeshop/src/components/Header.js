import React from "react";
import { useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import logo from "../img/logo2.svg";
import styles from "./Header.module.css";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
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
              <NavLink to="/login" activeClassName={styles["navbar-active"]}>
                <i className="fas fa-user"></i>Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
