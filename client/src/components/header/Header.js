import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Cat from "../../Images/bodega-cat-logo.jpg";

function Header() {
  return (
    <div className={styles.navdiv}>
      {/* Logo Input */}
      <img src={Cat} alt="bodega-cat-logo" width="100" />

      {/* Navigator into Header*/}
      <ul className={styles.navul}>
        <li className={styles.navli}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.navli}>
          <Link to="/browser">Browse Shops</Link>
        </li>
        <li className={styles.navli}>
          <Link to="/CFO-Shop-Creation">Create CFO Shop</Link>
        </li>
        <li className={styles.navli}>
          <Link to="/Customer-Account-Creation">Create Customer</Link>
        </li>
        <li className={styles.navli}>
          <Link to="/yourshop">Your Shop</Link>
        </li>
        <li className={styles.navli}>
          <Link to="/customeraccount">Customer Account</Link>
        </li>
        <li className={styles.navli}>
          <Link to="/support">Support</Link>
        </li>
        <li className={styles.navli}>
          <Link to="/Login">Login</Link>
        </li>
        <li className={styles.navli}>
          <Link to="/Test-Page">TestPage</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
