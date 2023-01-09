import React, { useState, Link } from "react";
import Style from "./register.module.css";
import Axios from "axios";

function Register() {
  const [errors, setErrors] = useState({}); // States used for input error handeling
  const [emailRegister, setEmailRegister] = useState(""); // Sate used to store input email
  const [passwordRegister, setPasswordogin] = useState(""); //State used to store account password

  // Function purpose to handle Register, and error check input before sending to baackend
  const handleRegister = (event) => {
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
    //Seting Email Register
    setEmailRegister(email);
    setPasswordogin(password);

    const RegisterURL = `${process.env.REACT_APP_API_URL}/User-Register/Register`;
    //Send Register information to backend
    Axios.post(RegisterURL, {
      emailRegister: emailRegister,
      passwordRegister: passwordRegister,
    }).then((response) => {
      console.log(response);
    });
  };

  const googleRegisterURl = `${process.env.REACT_APP_API_URL}/auth/auth/google/callback`;
  //Calling google auth api for Register with google
  const googleAuth = () => {
    window.open(googleRegisterURl, "_self");
  };

  return (
    <div className={Style.RegisterWrapper}>
      <h2>Log In </h2>
      <form onSubmit={(event) => handleRegister(event)}>
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
      <button className={Style.GoogleRegister} onClick={googleAuth}>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}

export default Register;
