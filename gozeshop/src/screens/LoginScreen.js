import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import { login } from "../store/actions/userActions";
import styles from "./LoginScreen.module.css";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // Dispatch login
    dispatch(login(email, password));
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
        <h1 className={styles["form-title"]}>Sign In</h1>
        <form className={styles["form"]} onSubmit={formSubmitHandler}>
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
          <Button type="submit" className="btn btn-dark my-2">
            Sign In
          </Button>
        </form>

        <div className={styles["register"]}>
          <span>Or Register Using</span>
          <Link
            className={styles.link}
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
