import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HomeScreen.module.css";
import Product from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

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
