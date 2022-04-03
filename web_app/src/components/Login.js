
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";

// const clientId =
//   '766338807168-qt90s6t8o21mh03c328t9nbb35s4hgl0.apps.googleusercontent.com';

function Login() {
  const navigateObj = useNavigate();
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj.email);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    //refreshTokenSetup(res);
    /**
     * Used to redirect user to the dashboard screen
     */
    
    document.getElementById('divApiResponse').innerHTML = "Login Successful! Redirecting..."
    window.localStorage.setItem('userEmail', res.profileObj.email);
    setTimeout(() => {
      //window.location.href = window.location.protocol + "//" + window.location.host + "/Dashboard"
      navigateObj('/Dashboard',{ replace: true })
    }, 200);
  };

  const onFailure = (res) => {
    document.getElementById('divApiResponse').innerHTML = "Login Failed! Please try again!"
    console.log('Login failed: res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
      <div id="divApiResponse" style={{marginTop:"20px"}}></div>
    </div>
  );
}


export default Login;
