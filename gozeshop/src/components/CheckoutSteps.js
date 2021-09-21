import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CheckoutSteps.module.css";

const CheckoutSteps = ({ step1, step2, step3, step4, step5, orderId }) => {
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
            <p className={styles["not-active"]}>Sign In</p>
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
            <p className={styles["not-active"]}>Shipping</p>
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
            <p className={styles["not-active"]}>Payment</p>
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
            <p className={styles["not-active"]}>Place Order</p>
          )}
        </li>
        <li className={styles["navbar-list-item"]}>
          {step5 ? (
            <NavLink
              className={styles["active"]}
              to={`/order/${orderId}`}
              disabled
              activeClassName={styles["active-navlink"]}
            >
              Summary
            </NavLink>
          ) : (
            <p className={styles["not-active"]}>Summary</p>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutSteps;
