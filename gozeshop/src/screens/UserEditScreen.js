import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { getUserDetails, updateUser } from "../store/actions/userActions";
import styles from "./UserEditScreen.module.css";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      history.push("/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, history, successUpdate]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/userlist" className="btn btn-light my-2 fade-in">
        Go Back
      </Link>
      <div className={styles["form-container"]}>
        <h1 className={styles["form-title"]}>Edit User</h1>
        {error && (
          <div className="center">
            <Message className="alert">{error}</Message>
          </div>
        )}
        {loading && <Spinner></Spinner>}
        {loadingUpdate && <Spinner></Spinner>}
        {user && (
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

            <label className={styles["label-email"]} htmlFor="email">
              Is Admin?
            </label>
            <input
              className={styles["input-checkbox"]}
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />

            <Button type="submit" className="btn btn-dark my-2">
              Update
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default UserEditScreen;
