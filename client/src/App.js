import React, {useState, useEffect} from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function App() {
  const onLogin = (googleUser) => {
    //console.log(googleUser);
    let id_token = googleUser.getAuthResponse().id_token;
    axios({
      method: 'POST',
      url: '/users/create',
      data: {
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
        clientId="836869392315-8rs1dt2a491mgg7qvr8hntbunkfdtgg1.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onLogin}
        onFailure={onLoginFail}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
