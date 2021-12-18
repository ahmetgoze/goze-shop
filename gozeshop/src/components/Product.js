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
          <div className={styles["image-container"]}>
            <img src={product.image} alt={product.name} />
          </div>
        </Link>
        <Link className={styles["product_name"]} to={`/product/${product._id}`}>
          {product.name}
        </Link>

        <Rating
          value={product.rating && product.rating}
          text={
            product.numReviews ?
            (product.numReviews > 1
              ? `${product.numReviews} reviews`
              : `${product.numReviews} review`) : "Not rated yet"
          }
        />

        <h3 className={styles["product_price"]}>${product.price}</h3>
      </div>
    </Card>
  );
};

export default Product;
