import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";

function Header({ currentUserInfo, setCurrentUserInfo, setIsAuthenticated }) {
  const navigate = useNavigate();

  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.alert("Logout successful!");
        setIsAuthenticated(false);
        setCurrentUserInfo(null);
        navigate("/");

        // Remove local storage info
        localStorage.removeItem("CM-user");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="header-component-wrapper">
      <div>
        <Link to="/">
          <p style={{ textDecoration: "underline" }}>CODE MANAGER</p>
        </Link>
      </div>

      <div className="header-account">
        <p>
          {currentUserInfo && currentUserInfo.userFullName ? null : "Hi, there"}
        </p>
        {currentUserInfo && currentUserInfo.userFullName ? (
          <div onClick={handleLogout}>
            <p>Logout</p>
          </div>
        ) : null}

        {currentUserInfo && currentUserInfo.userFullName ? (
          <div className="avatar">
            {currentUserInfo.userFullName[0].toUpperCase()}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
