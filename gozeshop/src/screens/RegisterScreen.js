import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import { register } from "../store/actions/userActions";
import styles from "./RegisterScreen.module.css";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, userInfo, error } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // Dispatch login
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      setMessage("Passwords do not match.");
    }
  };

  return (
    <>
      {error && (
        <div className="center">
          <Message className="alert">{error}</Message>
        </div>
      )}
      {loading && <Spinner></Spinner>}
      <div className={styles["form-container"]}>
        <h1 className={styles["form-title"]}>Sign Up</h1>
        <form className={styles["form"]} onSubmit={formSubmitHandler}>
          <label className={styles["label-name"]} htmlFor="text">
            Name
          </label>
          <input
            className={styles["input-name"]}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
          />
          <label className={styles["label-email"]} htmlFor="email">
            Email
          </label>
          <input
            className={styles["input-email"]}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email"
          />
          <label className={styles["label-password"]} htmlFor="password">
            Password
          </label>
          <input
            className={styles["input-password"]}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
          />
          <label className={styles["label-password"]} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={styles["input-password"]}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Type your password again"
          />
          <Button type="submit" className="btn btn-dark my-2">
            Register
          </Button>
          {message && <p className={styles["password-error"]}>{message}</p>}
        </form>

        <div className={styles["register"]}>
          <span>Or you have an account?</span>
          <Link
            className={styles.link}
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
