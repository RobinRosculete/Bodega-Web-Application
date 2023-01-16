/* Feature not completed, feature work: 
    1. Improve Form validation, and error handling
    2. Password Encription
    3. Verify if user already exists
    4. verify if new information, like password or email is already in the DB
    5. Refactor code to make it more connsistent, organized and efficient
    6. Complete Google Authentication
   *7. Fix axios.post bug, sending empty body when pressing register button for the first time
*/

import React, { useState } from "react";
import Style from "./register.module.css";
import Axios from "axios";

function Register() {
  const [errors, setErrors] = useState({}); // States used for input error handeling
  const [registerEmail, setEmailRegister] = useState(""); // Sate used to store input email
  const [registerPassword, setPasswordogin] = useState(""); //State used to store account password
  const [userType, setUserType] = useState(""); //State used to store the type of user, either CFO or USER

  //Function purpose to link to specific profile creation page
  const sendToProfileCreationPage = () => {
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
  }; // end function sendToProfileCreationPage

  //Function purpose to Send new user to the backend to store in the Database
  const sendNewUser = () => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    //Checking if new user is CFO or  user it a Customer Account
    let registerUrl = "";
    if (userType === "CFO") {
      registerUrl = `${process.env.REACT_APP_API_URL}/cfo-register`;
    } else {
      registerUrl = `${process.env.REACT_APP_API_URL}/customer-register`;
    }

    Axios.post(
      registerUrl,
      {
        registerEmail: registerEmail,
        registerPassword: registerPassword,
      },
      config
    )
      .then((response) => {
        console.log(response);
        alert(response.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }; // end function sendNewUser

  // Function purpose to handle Register, and error check input before sending to baackend
  const handleRegistration = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const userType = formData.get("userType");

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
      alert("Succsefully Registered");
      setEmailRegister(email);
      setPasswordogin(password);
      setUserType(userType);

      sendNewUser(); // Calling function to send new user information to backend

      //sendToProfileCreationPage(); // Calling function to send to specific user creation page
    }
  }; // end function handleRegistration

  //Function purpose to route to the google auth backend endpoint.
  const googleRegisterURl = `${process.env.REACT_APP_API_URL}/auth/auth/google/callback`;
  //Calling google auth api for Register/ with google
  const googleAuth = () => {
    window.open(googleRegisterURl, "_self");
  };

  return (
    <div className={Style.RegisterWrapper}>
      <h2>Register</h2>
      <form onSubmit={(event) => handleRegistration(event)}>
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
