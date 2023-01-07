import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";

function GoogleLogoutButton() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [profile, setProfile] = useState([]);
  const logOut = () => {
    setProfile(null);
  };

  return (
    <div class="GoogleLogoutButtonWrapper">
      <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOut}
        />
      </div>
    </div>
  );
}
