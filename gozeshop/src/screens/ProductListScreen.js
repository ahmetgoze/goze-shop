import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import { listProducts, removeProduct } from "../store/actions/productActions";
import styles from "./ProductListScreen.module.css";

const ProductListScreen = ({ history, matcj }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productRemove = useSelector((state) => state.productRemove);
  const { success: successRemove } = productRemove;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history, successRemove]);

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure?")) {
      // Delete products
      dispatch(removeProduct(userId));
    }
  };

  const createProductHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {loading && <Spinner></Spinner>}
      {products && (
        <div className={styles["table-container"]}>
          <table>
            <caption>Products</caption>
            <thead>
              <tr>
                <th scope="col">IMAGE</th>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} alt={product.name} />
                  </td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <div className={styles["table-buttons"]}>
                      <Link to={`/product-${product._id}-edit`}>
                        <Button className="btn btn-sm btn-light">
                          <i className="fas fa-user-edit"></i>
                        </Button>
                      </Link>

                      <Button
                        className="btn btn-sm btn-light"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles["create-button"]}>
            <Button className="btn btn-dark" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductListScreen;
