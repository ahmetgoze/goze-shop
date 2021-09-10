import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Button from "../components/UI/Button";
import styles from "./ProductScreen.module.css";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  const id = match.params.id;
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${id}`);

      setProduct(data);
    };
    fetchProducts();
  }, [id]);

  return (
    <>
      <Link className="btn btn-light" to="/">
        Go Back
      </Link>
      <div className={styles.product}>
        <div className={styles["product-left"]}>
          <img src={product.image} alt="" className={styles["product_image"]} />
        </div>
        <div className={styles["product-right"]}>
          <div className={styles["product-right_top"]}>
            <h2>{product.name}</h2>
            <span>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </span>
          </div>
          <div className={styles["product-right_bottom"]}>
            <h3 className={styles.price}>
              <span>Price: </span>${product.price}
            </h3>
            <p className={styles.description}>
              <span>
                Description: <br />
              </span>{" "}
              {product.description}
            </p>
            <p className={styles.stock}>
              <span>Status: </span>{" "}
              {product.countInStock ? "In Stock" : "Out of Stock"}{" "}
            </p>
            <div className="my-2">
              <Button className={"btn btn-dark"}>Add To Chart</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
