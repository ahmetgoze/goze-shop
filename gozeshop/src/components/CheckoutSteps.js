import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CheckoutSteps.module.css";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav>
      <ul className={styles["navbar-list"]}>
        <li className={styles["navbar-list-item"]}>
          {step1 ? (
            <NavLink
              disabled
              className={styles["active"]}
              to="/login"
              activeClassName={styles["active-navlink"]}
            >
              Sign In
            </NavLink>
          ) : (
            <a href="/" className={styles["not-active"]}>
              Sign In
            </a>
          )}
        </li>
        <li className={styles["navbar-list-item"]}>
          {step2 ? (
            <NavLink
              className={styles["active"]}
              to="/shipping"
              activeClassName={styles["active-navlink"]}
            >
              Shipping
            </NavLink>
          ) : (
            <a href="/" className={styles["not-active"]}>
              Shipping
            </a>
          )}
        </li>
        <li className={styles["navbar-list-item"]}>
          {step3 ? (
            <NavLink
              className={styles["active"]}
              to="/payment"
              activeClassName={styles["active-navlink"]}
            >
              Payment
            </NavLink>
          ) : (
            <a href="/" disabled className={styles["not-active"]}>
              Payment
            </a>
          )}
        </li>
        <li className={styles["navbar-list-item"]}>
          {step4 ? (
            <NavLink
              className={styles["active"]}
              to="/placeorder"
              activeClassName={styles["active-navlink"]}
            >
              Place Order
            </NavLink>
          ) : (
            <a href="/" disabled className={styles["not-active"]}>
              Place Order
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutSteps;
