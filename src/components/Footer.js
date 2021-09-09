import React from "react";
import Container from "./UI/Container";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className={styles.copyright}>Copyright &copy; GozeShop - 2021</div>
      </Container>
    </footer>
  );
};

export default Footer;
