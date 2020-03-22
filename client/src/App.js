import React, {useState, useEffect} from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';

function App() {
  const [passwords, setPasswords] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const getPasswords = () => {
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => setPasswords(passwords))
  }

  const responseGoogle = (response) => {
    console.log(response);
  }

  useEffect(() => {
    getPasswords()
  }, [])

  return (
    <div className="App">
      <GoogleLogin
        clientId="836869392315-a1kdsppru2msbr38du59ck61sohlve2l.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <hr/>
      {
        passwords.length > 0 ?
          passwords.map(p => <p key={p}>{p}</p>)
        :
        ''
      }
      <button onClick={getPasswords}>
        get more
      </button>
    </div>
  );
}

export default App;
