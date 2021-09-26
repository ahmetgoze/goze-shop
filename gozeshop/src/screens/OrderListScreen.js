import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { listOrders } from "../store/actions/orderActions";
import {
  createProduct,
  listProducts,
  removeProduct,
} from "../store/actions/productActions";
import styles from "./ProductListScreen.module.css";

const OrderListScreen = ({ history, matcj }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo.isAdmin && userInfo) {
      dispatch(listOrders());
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      {loading && <Spinner></Spinner>}
      {orders && (
        <div className={styles["table-container"]}>
          <table>
            <caption>Orders</caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">USER</th>
                <th scope="col">DATE</th>
                <th scope="col">TOTAL PRICE</th>
                <th scope="col">PAID</th>
                <th scope="col">DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "crimson" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "crimson" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className="btn btn-sm btn-light">Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderListScreen;
