import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import styles from "./PlaceOrderScreen.module.css";

const PlaceOrderScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const { cartItems, shippingAddress } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const placeOrderHandler = () => {
    
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <ul className={styles["summary-list"]}>
        <li className={styles["summary-items"]}>
          <h2 className={styles["title"]}>Shipping</h2>
          <p className={styles["text"]}>
            <strong>Address: </strong>
            {cart.shippingAddress.address} {cart.shippingAddress.postalCode},{" "}
            {cart.shippingAddress.city}
            {"/"}
            {cart.shippingAddress.country}{" "}
          </p>
        </li>
        <li className={styles["summary-items"]}>
          <h2 className={styles["title"]}>Payment Method</h2>
          <p className={styles["text"]}>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </p>
        </li>
        <li>
          <h2 className={styles["title"]}>Order Items</h2>
          {cartItems.length === 0 && (
            <div className="my-3">
              <Message className="alert">Your cart is empty</Message>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className={styles["cart"]}>
              <ul className={styles["cart-list"]}>
                {cartItems.map((item) => (
                  <li className={styles["cart-items"]} key={item.product}>
                    <img
                      className={styles["cart-image"]}
                      src={item.image}
                      alt={item.name}
                    />
                    <Link
                      className={styles["cart-title"]}
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                    <div className={styles["cart-price"]}>${item.price}</div>
                    <div className={styles.quantity}>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles["cart-remove-item"]}>
                      <Button
                        type="button"
                        className="btn btn-light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles["checkout"]}>
                <div className={styles["checkout-box"]}>
                  <span className={styles["checkout-title"]}>Subtotal</span>
                  <span className={styles["checkout-price"]}>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className={styles["checkout-box"]}>
                  <span className={styles["checkout-title"]}>Shipping</span>
                  <span className={styles["checkout-price"]}>$9.99</span>
                </div>
                <div className={styles["checkout-box"]}>
                  <span className={styles["checkout-title"]}>Total</span>

                  <span className={styles["checkout-price"]}>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 9.99)
                      .toFixed(2)}
                  </span>
                </div>
                <Button
                  className="btn btn-dark"
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </li>
      </ul>
    </>
  );
};

export default PlaceOrderScreen;
