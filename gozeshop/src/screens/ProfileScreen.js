import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import {
  getUserDetails,
  updateUserDetails,
} from "../store/actions/userActions";
import styles from "./ProfileScreen.module.css";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [editState, setEditState] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!user.name || success) {
        dispatch({
          type: USER_UPDATE_RESET,
        });
        dispatch(getUserDetails("/profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch, success]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      // DISPATCH UPDATE PROFILE
      dispatch(
        updateUserDetails({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  const changeFormStateHandler = () => {
    // handle
    setEditState((prevState) => !prevState);
  };

  return (
    <>
      {error && (
        <div className="center">
          <Message className="alert">{error}</Message>
        </div>
      )}
      {loading && <Spinner></Spinner>}
      <div className={styles["profile-screen"]}>
        {/* <div className={styles["purchase-history"]}>PURCHASE HISTORY</div> */}
        <div className={styles["profile"]}>
          <div className={styles["profile-header"]}>
            <div className={styles["profile-pic"]}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles["profile-name"]}>{user.name}</div>
          </div>
          {!editState && (
            <form className={styles["form"]}>
              <label className={styles["label-email"]} htmlFor="email">
                Email
              </label>
              <label className={styles["label-email-info"]}>{user.email}</label>
              <label className={styles["label-password"]} htmlFor="password">
                Password
              </label>
              <label className={styles["label-password-info"]}>......</label>
            </form>
          )}
          {editState && (
            <form className={styles["form"]} onSubmit={formSubmitHandler}>
              <label className={styles["label-email"]} htmlFor="text">
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
              <label
                className={styles["label-password"]}
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={styles["input-password"]}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Type your password again"
              />
              <Button type="submit" className="btn btn-dark">
                Update
              </Button>
              {message && <p className={styles["password-error"]}>{message}</p>}
              {success && (
                <p className={styles["password-error"]}>
                  "Successfully changed the informations."
                </p>
              )}
            </form>
          )}
          <div
            onClick={changeFormStateHandler}
            className={styles["profile-edit"]}
          >
            <i className="fas fa-pen"></i>
            {!editState ? "Edit" : "Go Back"}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
