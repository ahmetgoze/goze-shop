import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./CheckoutSteps.module.css";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav>
      <ul className={styles["navbar-list"]}>
        <li className={styles["navbar-list-item"]}>
          {step1 ? (
            <Link className={styles["active"]} to="/login">
              Sign In
            </Link>
          ) : (
            <li className={styles["not-active"]}>Sign In</li>
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
            <li className={styles["not-active"]}>Shipping</li>
          )}
        </li>
        <li className={styles["navbar-list-item"]}>
          {step3 ? (
            <Link className={styles["active"]} to="/payment">
              Payment
            </Link>
          ) : (
            <li className={styles["not-active"]}>Payment</li>
          )}
        </li>
        <li className={styles["navbar-list-item"]}>
          {step4 ? (
            <Link className={styles["active"]} to="/placeorder">
              Place Order
            </Link>
          ) : (
            <li className={styles["not-active"]}>Place Order</li>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutSteps;
