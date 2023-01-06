import React, { useState } from "react";
import Style from "./Login.module.css";
import GLogin from "../../components/loginButton/GoogleLoginButton.js";
import Axios from "axios";

//const bcrypt = require("bcryptjs");
function Login() {
  const [errors, setErrors] = useState({}); // States used for input error handeling
  const [emailLogin, setEmailLogin] = useState(""); // Sate used to store input email
  const [passwordLogin, setPasswordogin] = useState(""); //State used to store account password

  // Function purpose to handle login, and error check input before sending to baackend
  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    //const password = bcrypt.hashSync(formData.get("password"), 10);

    if (!email) {
      setErrors((errors) => ({ ...errors, email: "Email is required" }));
    }
    if (!password) {
      setErrors((errors) => ({ ...errors, password: "Password is required" }));
    }
    //Seting Email Login
    setEmailLogin(email);
    setPasswordogin(password);

    //Send login information to backend
    Axios.post("http://localhost:3001/User-Login/login", {
      emailLogin: emailLogin,
      passwordLogin: passwordLogin,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className={Style.LoginWrapper}>
      <h2>Log In </h2>
      <form onSubmit={(event) => handleLogin(event)}>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            pattern="[^@]+@[^@]+\.[^@]+"
            required
            error={errors.email}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <br />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength="8"
            maxLength="32"
            required
            error={errors.password}
            aria-invalid={errors.password ? "true" : "false"}
          />
        </label>
        <div>
          <br />
          <button type="submit" className={Style.submitButton}>
            Log in
          </button>
          <br />
        </div>
      </form>
      <GLogin></GLogin>
    </div>
  );
}

export default Login;
