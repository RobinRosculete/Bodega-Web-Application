import React, { useState } from "react";
import Style from "./register.module.css";
import Axios from "axios";

function Register() {
  const [errors, setErrors] = useState({}); // States used for input error handeling
  const [registerEmail, setEmailRegister] = useState(""); // Sate used to store input email
  const [registerPassword, setPasswordogin] = useState(""); //State used to store account password
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

  //Function purpose to Send new user to the backend to store in the Database
  const sendNewUser = (userType) => {
    //Checking if new user is CFO or  user it a Customer Account
    let registerUrl = "";
    if (userType === "CFO") {
      registerUrl = `${process.env.REACT_APP_API_URL}/cfo-register`;
    } else {
      registerUrl = `${process.env.REACT_APP_API_URL}/customer-register`;
    }

    Axios.post(registerUrl, {
      registerEmail: registerEmail,
      registerPassword: registerPassword,
    })
      .then((response) => {
        console.log(response);
        alert(response.message);
      })
      .catch((err) => {
        console.log(err);
        // add a message to indicate there was an error with the registration
      });
  };

  // Function purpose to handle Register, and error check input before sending to baackend
  const handleRegister = (event) => {
    event.preventDefault();
    // reset errors object
    setErrors({});

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const userType = formData.get("userType");

    // validate email
    if (!email) {
      setErrors((errors) => ({ ...errors, email: "Email is required" }));
    } else if (!/^\S+@\S+$/.test(email)) {
      setErrors((errors) => ({ ...errors, email: "Email is invalid" }));
    }

    // validate password
    if (!password) {
      setErrors((errors) => ({ ...errors, password: "Password is required" }));
    } else if (password.length < 8) {
      setErrors((errors) => ({
        ...errors,
        password: "Password must be at least 8 characters long",
      }));
    }
    // validate confirmPassword
    if (!confirmPassword) {
      setErrors((errors) => ({
        ...errors,
        confirmPassword: "Confirm Password is required",
      }));
    } else if (password !== confirmPassword) {
      setErrors((errors) => ({
        ...errors,
        confirmPassword: "Passwords do not match",
      }));
    }
    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      console.log("errors:", errors);
      return;
    }
    // else
    setEmailRegister(email);
    setPasswordogin(password);
    setUserType(userType);

    //caling function to send new user information to backend
    sendNewUser(userType);
    // Calling function to send to specific user creation page
    optionSelected(userType);
    alert("Succsefully Registered");
  };

  //Function purpose to route to the google auth backend endpoint.
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
