import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [passwords, setPasswords] = useState([])

  const getPasswords = () => {
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => setPasswords(passwords))
  }

  useEffect(() => {
    getPasswords()
  }, [])

  return (
    <div className="App">
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
