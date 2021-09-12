import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../store/actions/productActions";
// import { PuffLoader } from "react-spinners";
import styles from "./HomeScreen.module.css";
import Product from "../components/Product";
import Spinner from "../components/UI/Spinner";
import Message from "../components/UI/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <div className={styles.banner}>
        <h1 className={styles.title}>
          <span className={styles["title-1"]}>Buy</span>
          <span className={styles["title-2"]}>the best</span>
          <span className={styles["title-3"]}>products.</span>
        </h1>
        <p className={styles.text}>
          We are specialised in bringing the best quality products for you to
          purchase <span>safely</span>.
        </p>
      </div>
      {loading && <Spinner />}

      {error && <Message className="alert">{error}</Message>}
      <div className={styles["product-grid"]}>
        {products.map((product) => {
          return <Product key={product._id} product={product}></Product>;
        })}
      </div>
    </>
  );
};

export default HomeScreen;
