import React, { useState } from "react";
import Style from "./Login.module.css";
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
          <p> Email: </p>
          <input
            type="email"
            name="email"
            pattern="[^@]+@[^@]+\.[^@]+"
            required
            error={errors.email}
            aria-invalid={errors.email ? "true" : "false"}
          />
        </label>
        <label>
          <p> Password: </p>
          <input
            type="password"
            name="password"
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
    </div>
  );
}

export default Login;
