import React, { useState } from "react";
import Style from "./login.module.css";
import Axios from "axios";

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

    if (!email) {
      setErrors((errors) => ({ ...errors, email: "Email is required" }));
    } else if (!password) {
      setErrors((errors) => ({ ...errors, password: "Password is required" }));
    } else {
      setEmailLogin(email);
      setPasswordogin(password);

      const loginURL = `${process.env.REACT_APP_API_URL}/User-Login/login`;
      //Send login information to backend
      Axios.post(loginURL, {
        emailLogin: emailLogin,
        passwordLogin: passwordLogin,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console(err);
        });
    }
  };

  const googleLoginURl = `${process.env.REACT_APP_API_URL}/auth/auth/google/callback`;
  //Calling google auth api for login with google
  const googleAuth = () => {
    window.open(googleLoginURl, "_self");
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
          <button type="submit" className={Style.submitButton}>
            Log in
          </button>
        </div>
      </form>
      <p>or</p>
      <button type="submit" className={Style.submitButton}>
        Register
      </button>
      <button className={Style.GoogleLogin} onClick={googleAuth}>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}

export default Login;
