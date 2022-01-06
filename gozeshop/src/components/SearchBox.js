import React, { useState } from "react";
import styles from "./SearchBox.module.css";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles["search-box"]}>
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search"
        className=""
      ></input>
      <button type="submit" className="">
        <i
          className="fas fa-search"
          style={keyword ? { color: "#dc143c" } : {}}
        ></i>
      </button>
    </form>
  );
};

export default SearchBox;
