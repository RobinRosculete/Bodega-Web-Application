import React from "react";
import Style from "./Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className={Style.LoginWrapper}>
      <h2>Please Log In </h2>
      <div>
        <br />
        <button className={Style.submitButton} onClick={googleAuth}>
          <span>Sing in with Google</span>
        </button>
        <p className={Style.text}>
          New Here ? <Link to="/CFO-Shop-Creation">Sing Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
