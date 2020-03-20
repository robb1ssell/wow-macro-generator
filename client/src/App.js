import React, {useState, useEffect} from 'react';
import 'sass/App.scss';


function App() {
  const [passwords, setPasswords] = useState([]);
  
  const getPasswords = () => {
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => setPasswords(passwords))
  }

  useEffect(() => {
    getPasswords(setPasswords)
  }, [])

  return (
    <div className="App">
      app is here
      <p>passwords:</p>
      {
        passwords.length > 0 ?
        passwords.map(pw => <p key={pw}>{pw}</p>)
        :
        ''
      }
      <button
        onClick={getPasswords}
      >
        Get more passwords
      </button>
    </div>
  );
}

export default App;
