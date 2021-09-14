import React, { useEffect } from "react";
import styles from "./CartScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import Message from "../components/UI/Message";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
const CartScreen = ({ match, location, history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    productId && dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className={styles["cart-screen"]}>
      <Link className="btn btn-light" to="/">
        Go Back
      </Link>
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
                      dispatch(addToCart(item.product, Number(e.target.value)))
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
              onClick={checkoutHandler}
            >
              Check out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
