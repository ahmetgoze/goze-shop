import React from "react";
import { Link } from "react-router-dom";
import Card from "./UI/Card";
import styles from "./Product.module.css";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card>
      <div className={styles["product-card"]}>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <Link className={styles["product_name"]} to={`/product/${product._id}`}>
          {product.name}
        </Link>

        <Rating value={product.rating} text={`${product.numReviews} reviews`} />

        <h3 className={styles["product_price"]}>${product.price}</h3>
      </div>
    </Card>
  );
};

export default Product;
