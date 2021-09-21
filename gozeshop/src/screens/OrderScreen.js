import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import { getOrderDetails } from "../store/actions/orderActions";
import styles from "./OrderScreen.module.css";

const OrderScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const orderId = match.params.id;
  useEffect(() => {
    if (!order || order.id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
    // eslint-disable-next-line
  }, [orderId, dispatch]);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order } = orderDetails;
  return (
    <>
      <CheckoutSteps
        step1
        step2
        step3
        step4
        step5
        orderId={orderId}
      ></CheckoutSteps>
      {loading && <Spinner></Spinner>}
      {!loading && (
        <ul className={styles["summary-list"]}>
          <div className={styles["summary-top"]}>
            <div>
              <li>
                <h2 className={styles["title"]}>Order Items</h2>
                {order.orderItems.length === 0 && (
                  <div className="my-3">
                    <Message className="alert">Order is empty</Message>
                  </div>
                )}
                {order.orderItems.length > 0 && (
                  <div className={styles["cart"]}>
                    <ul className={styles["cart-list"]}>
                      {order.orderItems.map((item) => (
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
                          <div className={styles["cart-price"]}>
                            ${item.price}
                          </div>
                          <div className={styles["cart-price"]}> x</div>
                          <div className={styles["cart-price"]}>
                            {" "}
                            {item.qty}
                          </div>
                          <div className={styles["cart-price"]}> =</div>
                          <div className={styles.quantity}>
                            ${item.price * item.qty}
                          </div>
                          {/* <div className={styles["cart-remove-item"]}>
                        <Button type="button" className="btn btn-light">
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div> */}
                        </li>
                      ))}
                    </ul>
                    {/* <div className={styles["checkout"]}>
                  <div className={styles["checkout-box"]}>
                    <span className={styles["checkout-title"]}>Subtotal</span>
                    <span className={styles["checkout-price"]}>
                      $
                      {order.orderItems
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
                      {order.orderItems
                        .reduce(
                          (acc, item) => acc + item.qty * item.price,
                          9.99
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div> */}
                  </div>
                )}
              </li>
            </div>
            <div>
              <div className={styles["checkout"]}>
                <div className={styles["checkout-box"]}>
                  <span className={styles["checkout-title"]}>Subtotal</span>
                  <span className={styles["checkout-price"]}>
                    $
                    {order.orderItems
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
                    {order.orderItems
                      .reduce((acc, item) => acc + item.qty * item.price, 9.99)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <li className={styles["summary-items"]}>
            <h2 className={styles["title"]}>ORDER NO</h2>
            <p className={styles["text"]}>{order._id}</p>
          </li>
          <li className={styles["summary-items"]}>
            <h2 className={styles["title"]}>Shipping</h2>
            <p className={styles["text"]}>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p className={styles["text"]}>
              <strong>Email: </strong>
              {order.user.email}
            </p>
            <p className={styles["text"]}>
              <strong>Address: </strong>
              {order.shippingAddress.address} {order.shippingAddress.postalCode}
              , {order.shippingAddress.city}
              {"/"}
              {order.shippingAddress.country}{" "}
            </p>
          </li>
          <li className={styles["summary-items"]}>
            <h2 className={styles["title"]}>Payment Method</h2>
            <p className={styles["text"]}>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
          </li>
        </ul>
      )}
    </>
  );
};

export default OrderScreen;
