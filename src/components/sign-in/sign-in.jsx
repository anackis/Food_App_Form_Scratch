
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom';
import { auth } from "../../utils/firebase/firebase";

import "./sign-in.scss";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // console.log("// User is signed in");
        setUser(user);
      } else {
        // console.log("// User is signed out");
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        navigate('/main');
      });

      // console.log("User signed in successfully!");
    } catch (error) {
      setError("Wrong Email or Password");
      // console.log(error.message);
    }
    };

    
  return (
    <div className="sign-in">
      
      {user ? <h2>You are signed In, <Link className="sign-in__link" to="/main">Come in</Link> </h2> : <h2>Sign in</h2>}
      
      <div className="home__right_divider"></div>
      <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        autoComplete="on"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="on"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
      {error && <span className="error error-for-sign-in">{error}</span>}
      </form>
    </div>
  );
};
    
export default SignIn;