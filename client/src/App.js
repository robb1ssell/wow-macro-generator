import React, {useState, useEffect} from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function App() {
  const onLogin = (googleUser) => {
    console.log(googleUser.profileObj);

    let user = googleUser.profileObj;
    let id_token = googleUser.getAuthResponse().id_token;
    axios({
      method: 'POST',
      url: '/api/userLogin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userInfo: user,
        idToken: id_token
      }
    })
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onLoginFail = (err) => {
    throw err;
  }

  return (
    <div className="App">
      <GoogleLogin
        clientId="836869392315-a1kdsppru2msbr38du59ck61sohlve2l.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onLogin}
        onFailure={onLoginFail}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
