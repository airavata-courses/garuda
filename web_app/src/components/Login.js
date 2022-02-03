
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

// const clientId =
//   '766338807168-qt90s6t8o21mh03c328t9nbb35s4hgl0.apps.googleusercontent.com';

function Login() {

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj.email);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    //refreshTokenSetup(res);
    /**
     * Used to redirect user to the dashboard screen
     */
    window.localStorage.setItem('userEmail', res.profileObj.email);
    window.location.href = window.location.protocol + "//" + window.location.host + "/Dashboard"

    
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
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
    </div>
  );
}


export default Login;
