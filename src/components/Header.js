import React from "react";

function Header({ currentUserInfo }) {
  return (
    <div>
      <div>
        <p>CODE MANAGER</p>
      </div>

      <div>
        <p>
          Hi,{" "}
          {currentUserInfo.userFullName
            ? currentUserInfo.userFullName
            : "there"}
        </p>
        <div>/img/</div>
      </div>
    </div>
  );
}

export default Header;
