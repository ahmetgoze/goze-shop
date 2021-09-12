import React from "react";
import styles from "./Message.module.css";
const Message = ({ children, className }) => {
  return <p className={styles[className]}>{children}</p>;
};

export default Message;
