
import React, { useContext, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import AppContext from './AppContext';
// const clientId =
//   '766338807168-qt90s6t8o21mh03c328t9nbb35s4hgl0.apps.googleusercontent.com';

function Login() {
  const globalMyContext = useContext(AppContext)
  let navigateObj = useNavigate();
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
    {globalMyContext.fnSetGlobalUserName(res.profileObj.email)}
    //window.localStorage.setItem('userEmail', res.profileObj.email);
    setTimeout(() => {
      navigateObj('/Dashboard',{ replace: true, state:{ userEmail: res.profileObj.email} })
      //window.location.href = window.location.protocol + "//" + window.location.host + "/Dashboard"
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
