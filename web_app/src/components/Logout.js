import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigateObj = useNavigate();
  const onSuccess = () => {
    console.log('Logout made successfully');
    window.localStorage.removeItem('userEmail');
    //window.location.href = window.location.protocol + "//" + window.location.host + "/"
    navigateObj('/',{ replace: true })
  };

  return (
    <div>
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;