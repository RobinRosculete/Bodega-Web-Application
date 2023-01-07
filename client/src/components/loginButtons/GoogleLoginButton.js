import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

function GoogleLoginButton() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [profile, setProfile] = useState([]);
  //Hook purpose to initialize our Client
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  //function purpose to console lof the result of our login
  const onSuccess = (res) => {
    console.log("success:", res);
    window.location.href = "http://localhost:3000/yourshop";
  };
  //Function purpose to handle error, when login
  const onFailure = (err) => {
    console.log("failed:", err);
  };
  //Login Button Starts Here
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
}

export default GoogleLoginButton;
