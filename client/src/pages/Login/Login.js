/* All Login functionality features completed by Jonathan Cordova on 01/26/2023:*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Style from "./login.module.css";
import Axios from "axios";


function Login() {
  const [errors, setErrors] = useState({}); // States used for input error handeling
  //const [emailLogin, setEmailLogin] = useState(""); // State used to store input email
  //const [passwordLogin, setPasswordLogin] = useState(""); //State used to store account password
  //const [idLogin, setLoginID] = useState(0);
  const [dataObjectA, setDataObjectA] = useState([]);
  const [dataObjectB, setDataObjectB] = useState([]);
  const [loggedInA, setLoggedInA] = useState(false);
  const [loggedInB, setLoggedInB] = useState(false);


  // Function purpose to handle login, and error check input before sending to backend
  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Email is currently: ", email);
    console.log("Password is currently: ", password);

    if (!email) {
      setErrors((errors) => ({ ...errors, email: "Email is required" }));
    } else if (!password) {
      setErrors((errors) => ({ ...errors, password: "Password is required" }));
    } else {
      //setEmailLogin(email);
      //setPasswordLogin(password);

      const loginURL = `${process.env.REACT_APP_API_URL}/User-Login/login`;
      //Send login email and login password to backend
      Axios.post(loginURL, {
        //Using email and password variables directly to prevent initialization with blank variables
        emailLogin: email,
        passwordLogin: password,
      })
        .then((response) => {
          console.log("response: ", response);
          console.log("response.data: ", response.data);
          console.log("response.data[0]: ", response.data[0]);
          console.log("Object.keys(response.data).length: ", Object.keys(response.data).length);

          if(response.data[0] !== undefined){

            console.log("response.data[0].login_id: ", response.data[0].login_id);
            //setLoginID(response.data[0].login_id);

            Customer_Verifying(response.data[0].login_id);
            CFO_Verifying(response.data[0].login_id);

          }else{
            setLoggedInA(false);
            setLoggedInB(false);
          }
        })
        .catch((err) => {
          setLoggedInA(false);
          setLoggedInB(false);
          console(err);
        });
    }//end else statement
  };



  function CFO_Verifying(id_number) {
    if(id_number !== 0){
      console.log("In CFO_Verifying function: ", id_number);
      
      const loginURLa = `${process.env.REACT_APP_API_URL}/User-Login/logina`;
      //Send loginID information to backend
      Axios.post(loginURLa, {
        idLogin: id_number,
      })
        .then((response) => {
          if(response.data[0] !== undefined){
            setDataObjectA(response.data);
            setLoggedInA(true);
          }else{
            setLoggedInA(false);
          }
        })
        .catch((err) => {
          console(err);
        });
    }
    else{
      setLoggedInA(false);
    }
  }//end function

    function Customer_Verifying(id_number) {
      if(id_number !== 0){
        console.log("In Customer_Verifying function: ", id_number);

        const loginURLb = `${process.env.REACT_APP_API_URL}/User-Login/loginb`;
        //Send loginID information to backend
        Axios.post(loginURLb, {
          idLogin: id_number,
        })
          .then((response) => {
            if(response.data[0] !== undefined){
              setDataObjectB(response.data);
              setLoggedInB(true);
            }else{
              setLoggedInB(false);
            }
          })
          .catch((err) => {
            console(err);
          });
      }
      else{
        setLoggedInB(false);
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
  <div>{loggedInA && <h1> Login Verified. </h1>}
       {loggedInA && dataObjectA.map((record) => (
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
        {loggedInB && <h1> Login Verified. </h1>}
        {loggedInB && dataObjectB.map((record) => (
          <div key={record.customer_id} className="food-business">
            <h2> </h2>
            <h3>Customer Account: {record.customer_id}</h3>
            <p>
              My Name: {record.customer_firstname} {record.customer_lastname}
            </p>
            <p>
              Currently Living At: {record.address1} {record.address2}
            </p>
            <p>
              {record.state} {record.city} {record.zipcode}
            </p>
            <p>
              My Phone and Email: {record.phone_number} {record.email_address}
            </p>
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
          <button type="submit" className={Style.submitButton}>
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
