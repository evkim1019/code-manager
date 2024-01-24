import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function RegisterScreen({ setIsAuthenticated, setCurrentUserInfo }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const navigate = useNavigate();

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
  };
  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleRegister = () => {
    const auth = getAuth();
    try {
      createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      setIsAuthenticated(true);
      setCurrentUserInfo({
        userEmail: emailInput,
        userFullName: "",
        userNumber: "",
        isBusinessOwner: false,
        userOwnedBusinesses: [],
        userCredit: 0,
        userJoinDate: "",
        userOwnedCodes: [],
      });
      navigate("/");
      window.alert("You are registered!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>REGISTER</h2>
      {/* Register box */}
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
      </div>

      {/* TODO:  fill all input boxes for account info */}

      {/* Register box */}
      <div>
        {/* Input group */}
        {/* "userEmail": "rando@gmail.com",
    "userPassword": "asdf",
    "userFullName": "Rando May",
    "userNumber": "",
    "isBusinessOwner": false,
    "userOwnedBusinesses": [],
    "userCredit": 0,
    "userJoinDate": "12-04-2023",
    "userOwnedCodes": [] */}
        <div>
          <p>Full name</p>
          {/* <input
            type="text"
            value={emailInput}
            onChange={handleEmailInputChange}
          /> */}
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
      </div>

      {/* Button */}
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default RegisterScreen;
