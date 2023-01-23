/* Feature not completed, feature work: 
    1. Improve Form validation, and error handling
    2. Password Encription
    3. Verify if user exists, or if he need to register
    5. Refactor code to make it more connsistent, organized and efficient
    6. Complete Google Authentication
*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Style from "./login.module.css";
import Axios from "axios";


function Login() {
  const [errors, setErrors] = useState({}); // States used for input error handeling
  const [emailLogin, setEmailLogin] = useState(""); // State used to store input email
  const [passwordLogin, setPasswordogin] = useState(""); //State used to store account password
  const [idLogin, setLoginID] = useState(0);
  const [dataObject, setDataObject] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  // Function purpose to handle login, and error check input before sending to backend
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
      //Send login email and login password to backend
      Axios.post(loginURL, {
        emailLogin: emailLogin,
        passwordLogin: passwordLogin,
      })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          if(Object.keys(response.data).length !== 0){
            setLoginID(response.data);
          }
        })
        .catch((err) => {
          console(err);
        });


    }//end else statement
  };


  
    function verificationOfLogin() {
      if(idLogin !== 0){
        console.log(idLogin);
        setLoggedIn(true);

        const loginURL2 = `${process.env.REACT_APP_API_URL}/User-Login/login2`;
        //Send loginID information to backend
        Axios.post(loginURL2, {
          idLogin: idLogin,
        })
          .then((response) => {
            console.log(response);
            console.log(response.data);
            if(Object.keys(response.data).length !== 0){
              setDataObject(response.data);
            }
          })
          .catch((err) => {
            console(err);
          });
  
      }
      else{
        setLoggedIn(false);
      }

    }//end function



  /*
  const googleLoginURl = `${process.env.REACT_APP_API_URL}/auth/auth/google/callback`;
  //Calling google auth api for login with google
  const googleAuth = () => {
    window.open(googleLoginURl, "_self");
  };
  */

  return (
  <div>{loggedIn && <h1> Login Verified. </h1>}
       {loggedIn && dataObject.map((record) => (
          <div key={record.CFO_id} className="food-business">
            <h2> </h2>
            <h3>Food Business: {record.CFO_Shop_Name}</h3>
            <p>
              Owner: {record.CFO_firstname} {record.CFO_lastname}
            </p>
            <p>
              Located at: {record.address1} {record.address2}
            </p>
            <p>
              {record.state} {record.city} {record.zipcode}
            </p>
            <p>
              Please Contact at: {record.phone_number} {record.email_address} {record.CFO_website_link}
            </p>
            <p>Food Tags: {record.CFO_food_tag}</p>
          </div>
        ))}

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
          <button type="submit" onClick={verificationOfLogin} className={Style.submitButton}>
            Log in
          </button>
        </div>
      </form>
      or
      <div>
        <Link to="/register">
          <button type="submit" className={Style.submitButton}>
            Register
          </button>
        </Link>
      </div>
      <button className={Style.GoogleLogin}>
        <span>Sign in with Google</span>
      </button>
    </div>

  </div>
    
  );
}

export default Login;
