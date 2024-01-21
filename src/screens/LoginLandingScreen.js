import React, { useEffect, useState } from "react";

function LoginLandingScreen({ userList, setCurrentUserInfo }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
  };
  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
  };
  const handleLogin = (e) => {
    // Remove all input
    setEmailInput("");
    setPasswordInput("");

    // Login success
    for (let i = 0; i < Object.values(userList).length; i++) {
      if (
        Object.values(userList)[i].userEmail === emailInput &&
        Object.values(userList)[i].userPassword === passwordInput
      ) {
        window.alert("Login success!");
        setCurrentUserInfo(Object.values(userList)[i]);
      }
    }
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
          <a href="">Don't have account?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginLandingScreen;
