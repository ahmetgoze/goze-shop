import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import { createOrder } from "../store/actions/orderActions";
import styles from "./PlaceOrderScreen.module.css";

const PlaceOrderScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);

  const { cartItems } = cart;
  const { success, order, error, loading } = orderCreate;
  console.log(orderCreate);
  console.log(success);

  // Calculate prices
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = 9.99;
  cart.totalPrice = Number((cart.itemsPrice + cart.shippingPrice).toFixed(2));

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: Number(cart.totalPrice),
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      {loading && <Spinner></Spinner>}
      <ul className={styles["summary-list"]}>
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
                {error && <Message className="alert">{error}</Message>}
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
      </ul>
    </>
  );
};

export default PlaceOrderScreen;
