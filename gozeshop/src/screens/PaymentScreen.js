import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Button from "../components/UI/Button";
import { savePaymentMethod } from "../store/actions/cartActions";
import styles from "./PaymentScreen.module.css";

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) history.push("/shipping");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <div className={styles["payment"]}>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className={styles["form-container"]}>
          <h1 className={styles["form-title"]}>Payment Method</h1>
          <form className={styles["form"]} onSubmit={formSubmitHandler}>
            <h2 className={styles["method-title"]}> Select a Method</h2>
            <div className={styles["labels"]}>
              <input
                className={styles["input-method"]}
                type="radio"
                value="PayPal"
                name="paymentMethod"
                label="Paypal or Credit Card"
                checked
                id="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className={styles["label-method"]} htmlFor="PayPal">
                PayPal or Credit Card
              </label>
            </div>
            {/* <div className={styles["labels"]}>
              <input
                className={styles["input-method"]}
                type="radio"
                name="paymentMethod"
                value="Stripe"
                label="Stripe"
                id="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className={styles["label-method"]} htmlFor="Stripe">
                Stripe
              </label>
            </div> */}
            <Button type="submit" className="btn btn-dark my-2">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
