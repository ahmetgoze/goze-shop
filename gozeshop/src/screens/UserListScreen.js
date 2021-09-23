import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import { deleteUser, listUsers } from "../store/actions/userActions";
import styles from "./UserListScreen.module.css";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(userId));
    }
  };
  return (
    <>
      {loading && <Spinner></Spinner>}
      {users && (
        <div className={styles["table-container"]}>
          <table>
            <caption>Users</caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ADMIN</th>
                <th scope="col">EDIT/DELETE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "crimson" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/user/${user._id}/edit`}>
                      <Button className="btn btn-sm btn-light">
                        <i className="fas fa-user-edit"></i>
                      </Button>
                    </Link>
                    {!user.isAdmin && (
                      <Button
                        className="btn btn-sm btn-light"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserListScreen;
