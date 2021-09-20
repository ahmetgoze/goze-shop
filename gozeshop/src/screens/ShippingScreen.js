import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Button from "../components/UI/Button";
import { saveShippingAddress } from "../store/actions/cartActions";
import styles from "./ShippingScreen.module.css";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className={styles["form-container"]}>
        <h1 className={styles["form-title"]}>Shipping</h1>
        <form className={styles["form"]} onSubmit={formSubmitHandler}>
          <label className={styles["label-address"]} htmlFor="address">
            Address
          </label>
          <input
            className={styles["input-address"]}
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Type your address"
          />
          <label className={styles["label-city"]} htmlFor="address">
            City
          </label>
          <input
            className={styles["input-city"]}
            type="text"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            placeholder="Type your city"
          />
          <label className={styles["label-postalcode"]} htmlFor="postalcode">
            Postal Code
          </label>
          <input
            className={styles["input-postalcode"]}
            type="text"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Type your postal code"
          />
          <label className={styles["label-country"]} htmlFor="country">
            Country
          </label>
          <input
            className={styles["input-country"]}
            type="text"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Type your country"
          />

          <Button type="submit" className="btn btn-dark my-2">
            Continue
          </Button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
