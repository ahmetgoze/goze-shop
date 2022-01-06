import React, { useEffect } from "react";
import Line from "../img/Line.svg";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../store/actions/productActions";
// import { PuffLoader } from "react-spinners";
import styles from "./HomeScreen.module.css";
import Product from "../components/Product";
import Spinner from "../components/UI/Spinner";
import Message from "../components/UI/Message";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <div className={styles.banner}>
        <div className={styles["banner-title"]}>
          <h1>
            {/* <span className={styles["title-1"]}>Get</span>
          <span className={styles["title-2"]}>the best</span>
        <span className={styles["title-3"]}>products.</span> */}
            <span>Electronics,</span>
            <br />
            <span>Computers,</span>
            <br />
            <span>
              Smartphones <span className={styles["banner-colored"]}>&</span>{" "}
              <br /> many more.
            </span>{" "}
            <br />
          </h1>
          <img className={styles.line} src={Line} alt="" />
        </div>
        {/* <p className={styles.text}>
        We specialize in bringing the best products for you to order safely and get them delivered quickly.
        </p> */}
        <div className={styles["banner-text"]}>
          <p>
            We specialize in bringing the best products for you to order{" "}
            <span className={styles["banner-colored"]}>safely </span>
            and get them delivered{" "}
            <span className={styles["banner-colored"]}>quickly</span>.
          </p>
        </div>
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
