import './App.css';
import { useState, useEffect } from 'react';
import {signInWithGoogle, signOut, auth} from './firebase-config';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if(user) {
        const { displayName, email }  = user;
        setUser({
          displayName,
          email
        })
      } else {
        setUser(null)
      }
    })
  }, [])

  console.log(user)

  return (
    <div className="App">
      {
        user ? 
        <button onClick={signOut}>Sign Out</button> :
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      }
    </div>
  );
}

export default App;
