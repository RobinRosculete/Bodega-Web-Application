import React, { useState } from "react";
import { Link } from "react-router-dom";
import Style from "./register.module.css";
import Axios from "axios";

function Register() {
  const [errors, setErrors] = useState({}); // States used for input error handeling
  const [emailRegister, setEmailRegister] = useState(""); // Sate used to store input email
  const [passwordRegister, setPasswordogin] = useState(""); //State used to store account password
  const [userType, setUserType] = useState(""); //State used to store the type of user, either CFO or USER

  //Function purpose to link to specific profile creation page
  const optionSelected = (userType) => {
    if (userType !== "none") {
      window.location.href =
        userType === "CFO"
          ? "/CFO-Shop-Creation"
          : "/Customer-Account-Creation";
    } else {
      console.log(
        "Error: Invalid User Option Selected. Error Location Client/src/Pages/Rgister/Register.js"
      );
    }
  };

  // Function purpose to handle Register, and error check input before sending to baackend
  const handleRegister = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!email) {
      setErrors((errors) => ({ ...errors, email: "Email is required" }));
    } else if (!password) {
      setErrors((errors) => ({ ...errors, password: "Password is required" }));
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      setErrors((errors) => ({
        ...errors,
        password: "Passwords do not match",
      }));
    } else {
      //Seting Email a
      alert("Succsefully Registered");
      setEmailRegister(email);
      setPasswordogin(password);
      optionSelected(userType); // Calling function to send to specific user creation page
    }
  };

  const googleRegisterURl = `${process.env.REACT_APP_API_URL}/auth/auth/google/callback`;
  //Calling google auth api for Register/ with google
  const googleAuth = () => {
    window.open(googleRegisterURl, "_self");
  };

  return (
    <div className={Style.RegisterWrapper}>
      <h2>Register</h2>
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
        <label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            minLength="8"
            maxLength="32"
            required
            error={errors.confirmPassword}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
        </label>
        <div className={Style.radioWrapper}>
          CFO
          <input
            type="radio"
            name="userType"
            value="CFO"
            required
            className={Style.radioInput}
            onChange={(e) => {
              setUserType(e.target.value);
            }}
          />
          Customer
          <input
            type="radio"
            name="userType"
            value="Customer"
            required
            className={Style.radioInput}
            onChange={(e) => {
              setUserType(e.target.value);
            }}
          />
          <button type="submit" className={Style.submitButton}>
            Register
          </button>
        </div>
      </form>
      <p>or</p>
      <button className={Style.GoogleRegister} onClick={googleAuth}>
        <span>Continue with Google</span>
      </button>
    </div>
  );
}

export default Register;
