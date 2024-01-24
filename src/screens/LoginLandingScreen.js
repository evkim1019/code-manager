import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";

function LoginLandingScreen({
  usersDB,
  setCurrentUserInfo,
  setIsAuthenticated,
}) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
  };
  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      // Login success
      setIsAuthenticated(true);
      for (let i = 0; i < Object.values(usersDB).length; i++) {
        if (Object.values(usersDB)[i].userEmail === emailInput) {
          setCurrentUserInfo(Object.values(usersDB)[i]);
        }
      }
    } catch (error) {
      // TODO: Login fail code below
    }

    // Remove all input
    setEmailInput("");
    setPasswordInput("");
  };

  return (
    <div className="screenContainer">
      {/* Login box */}
      <div>
        {/* Input group */}
        <div>
          <p>Email</p>
          <input
            type="email"
            value={emailInput}
            onChange={handleEmailInputChange}
          />
        </div>
        {/* Input group */}
        <div>
          <p>Password</p>
          <input
            type="password"
            value={passwordInput}
            onChange={handlePasswordInputChange}
          />
        </div>
        {/* Checkbox group */}
        <div>
          <input type="checkbox" />
          <p>Save login info</p>
        </div>
        {/* Button */}
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
        {/* Hyperlinks group */}
        <div>
          <a href="">Forgot the password?</a>
          <Link to={"/register"}>
            <p>Don't have account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginLandingScreen;
