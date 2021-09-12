import { PuffLoader } from "react-spinners";

import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles["loading-spinner"]}>
      <PuffLoader color="crimson" />
    </div>
  );
};

export default Spinner;
