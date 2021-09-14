import React, { useEffect } from "react";
import styles from "./CartScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/actions/cartActions";
import Message from "../components/UI/Message";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/UI/Button";
const CartScreen = ({ match, location }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    productId && dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (productID) => {
    console.log("remove");
  };

  return (
    <>
      <Link className="btn btn-light" to="/">
        Go Back
      </Link>
      {cartItems.length === 0 && (
        <div className="my-3">
          <Message className="alert">Your cart is empty</Message>
        </div>
      )}
      {cartItems.length > 0 && (
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
      )}
    </>
  );
};

export default CartScreen;
