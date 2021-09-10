import React from "react";
import styles from "./HomeScreen.module.css";
import products from "../products";
import Product from "../components/Product";

const HomeScreen = () => {
  console.log(products);
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
      <div className={styles["product-grid"]}>
        {products.map((product) => {
          return <Product key={product._id} product={product}></Product>;
        })}
      </div>
    </>
  );
};

export default HomeScreen;
