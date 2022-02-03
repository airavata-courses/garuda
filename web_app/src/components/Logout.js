import React from 'react';
import { GoogleLogout } from 'react-google-login';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    window.localStorage.removeItem('userEmail');
    window.location.href = window.location.protocol + "//" + window.location.host + "/"
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