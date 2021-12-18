import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import {
  createProductReview,
  listProductDetails,
} from "../store/actions/productActions";
import styles from "./ProductScreen.module.css";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    userInfo,
  } = userLogin;

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: reviewLoading,
    error: reviewError,
    success: reviewSuccess,
  } = productCreateReview;

  const id = match.params.id;

  useEffect(() => {
    if (reviewSuccess) {
      setComment("");
      setRating(0);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, reviewSuccess]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    console.log(e);
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  console.log(product.rating);

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
                  value={product.rating && product.rating}
                  text={
                    product.numReviews
                      ? product.numReviews > 1
                        ? `${product.numReviews} reviews`
                        : `${product.numReviews} review`
                      : "Not rated yet"
                  }
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
        <div className={styles["review-section"]}>
          <span className={styles["review-title"]}>
            {product.reviews.length > 0 && product.reviews.length}
            {product.reviews.length > 0 &&
              (product.reviews.length <= 1 ? " review" : " reviews")}
          </span>
          <ul className={styles["review-list"]}>
            {product.reviews.map((review) => (
              <li className={styles["review-list-item"]} key={review._id}>
                <span className={styles["review-rating"]}>
                  <Rating value={review.rating && review.rating}></Rating>
                </span>
                <strong className={styles["review-comment"]}>
                  {review.comment}
                </strong>
                <div className={styles["review-bottom"]}>
                  <p className={styles["review-user_name"]}>
                    <span>reviewed by</span> {review.name.split(" ")[0]}
                  </p>
                  <p className={styles["review-date"]}>
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>
              </li>
            ))}
            <li>
              <h2 style={{ marginBottom: ".5rem" }}>Write a Review</h2>
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className={styles.quantity}>
                    <label htmlFor="rat">Rating </label>
                    <select
                      id="rat"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Exellent</option>
                    </select>
                    <br />
                    <div className={styles["comment"]}>
                      <label
                        className={styles["comment-label"]}
                        htmlFor="comment"
                      >
                        Comment{" "}
                      </label>
                      <textarea
                        className={styles["comment-text"]}
                        name="comment"
                        id="comment"
                        value={comment}
                        cols="15"
                        rows="5"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="my-2">
                      {
                        <Button
                          className={
                            rating > 0 ? "btn btn-dark" : "btn btn-not-active"
                          }
                          type="submit"
                          disabled={rating === 0}
                        >
                          Submit
                        </Button>
                      }
                    </div>
                  </div>
                </form>
              ) : (
                <p className={styles["review-signup-text"]}>
                  Please <Link to="/login">sign in</Link> to write a review.{" "}
                </p>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
