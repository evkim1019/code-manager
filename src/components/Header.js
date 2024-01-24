import React from "react";
import { getAuth, signOut } from "firebase/auth";

function Header({ currentUserInfo, setCurrentUserInfo, setIsAuthenticated }) {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.alert("Logout successful!");
        setIsAuthenticated(false);
        setCurrentUserInfo(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <div>
        <p>CODE MANAGER</p>
      </div>

      <div>
        <p>
          Hi,{" "}
          {currentUserInfo && currentUserInfo.userFullName
            ? currentUserInfo.userFullName
            : "there"}
        </p>
        {currentUserInfo && currentUserInfo.userFullName ? (
          <div onClick={handleLogout}>
            <p>Logout</p>
          </div>
        ) : null}
        <div>/img/</div>
      </div>
    </div>
  );
}

export default Header;
