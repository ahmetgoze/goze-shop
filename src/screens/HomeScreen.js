import React from "react";
import styles from "./HomeScreen.module.css";
import products from "../products";
import Product from "../components/Product";

const HomeScreen = () => {
  console.log(products);
  return (
    <>
      <div className={styles["product-grid"]}>
        {products.map((product) => {
          return <Product key={product._id} product={product}></Product>;
        })}
      </div>
    </>
  );
};

export default HomeScreen;
