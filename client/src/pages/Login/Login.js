import React, { useState } from "react";
import Style from "./Login.module.css";

function Login() {
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
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

    // Additional validation and form submission logic goes here
  };

  return (
    <div className={Style.LoginWrapper}>
      <h2>Log In </h2>
      <form onSubmit={(event) => handleSubmit(event)}>
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
