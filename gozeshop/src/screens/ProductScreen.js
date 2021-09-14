import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import { listProductDetails } from "../store/actions/productActions";
import styles from "./ProductScreen.module.css";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);

  const { loading, error, product } = productDetail;

  const id = match.params.id;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <div className={styles["product-screen"]}>
      <Link className="btn btn-light" to="/">
        Go Back
      </Link>
        {loading && <Spinner />}
        {error && <Message className="alert">{error}</Message>}
        <div className={styles.product}>
          <div className={styles["product-left"]}>
            <img
              src={product.image}
              alt=""
              className={styles["product_image"]}
            />
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
              {product.countInStock > 0 && (
                <div className={styles.quantity}>
                  <label htmlFor="qty">Quantity: </label>
                  <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="my-2">
                {
                  <Button
                    onClick={addToCartHandler}
                    className={
                      product.countInStock > 0
                        ? "btn btn-dark"
                        : "btn btn-not-active"
                    }
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Chart
                  </Button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
