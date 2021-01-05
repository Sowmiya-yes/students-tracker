import './App.css';
import { useState, useEffect } from 'react';
import Homepage from './pages/Homepage';
import {signInWithGoogle, auth} from './firebase-config';

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


  return (
    <div className="App">
      <h1>Attendance Application</h1>
      {
        user ? 
        <Homepage displayName={user.displayName}/> :
        <button onClick={signInWithGoogle} className="btn">Sign In With Google</button>
      }
    </div>
  );
}

export default App;
