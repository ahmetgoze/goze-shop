import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import {
  listProductDetails,
  updateProduct,
} from "../store/actions/productActions";
import styles from "./ProductEditScreen.module.css";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, product, error } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (err) {
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/productlist" className="btn btn-light my-2 fade-in">
        Go Back
      </Link>
      <div className={styles["form-container"]}>
        <h1 className={styles["form-title"]}>Edit Product</h1>
        {errorUpdate && (
          <div className="center">
            <Message className="alert">{error}</Message>
          </div>
        )}
        {loadingUpdate && <Spinner></Spinner>}
        {error && (
          <div className="center">
            <Message className="alert">{error}</Message>
          </div>
        )}
        {loading && <Spinner></Spinner>}
        {product && (
          <form className={styles["form"]} onSubmit={formSubmitHandler}>
            <label className={styles["label-name"]} htmlFor="text">
              Name
            </label>
            <input
              className={styles["input-name"]}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
            <label className={styles["label-email"]} htmlFor="price">
              Price
            </label>
            <input
              className={styles["input-email"]}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />

            <label className={styles["label-email"]} htmlFor="image">
              Image
            </label>
            <input
              className={styles["input-email"]}
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image url"
            />
            <label
              className={`${styles["label-email"]} ${styles["label-upload"]} btn btn-light btn-sm`}
              htmlFor="image-upload"
            >
              <i className="fas fa-cloud-upload-alt"></i>
            </label>
            <input
              id="image-upload"
              className="input-file"
              type="file"
              label="Choose File"
              onChange={uploadFileHandler}
            />
            {uploading && <Spinner></Spinner>}

            <label className={styles["label-email"]} htmlFor="brand">
              Brand
            </label>
            <input
              className={styles["input-email"]}
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter brand"
            />

            <label className={styles["label-email"]} htmlFor="category">
              Category
            </label>
            <input
              className={styles["input-email"]}
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
            />

            <label className={styles["label-email"]} htmlFor="countInStock">
              Count In Stock
            </label>
            <input
              className={styles["input-email"]}
              type="text"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              placeholder="Enter count in stock"
            />

            <label className={styles["label-email"]} htmlFor="description">
              Description
            </label>
            <textarea
              className={styles["textarea"]}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            ></textarea>

            <Button type="submit" className="btn btn-dark my-2">
              Update
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default ProductEditScreen;
