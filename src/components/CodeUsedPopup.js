import React from "react";

import "./CodeUsedPopup.css";

function CodeUsedPopup() {
  return (
    <div className="popupWrapper">
      <div className="popupCloseButton">
        <p>X</p>
      </div>
      {/* Content */}
      <div>
        <p className="font-xx-large">Used</p>
        <p>This code is already used</p>
      </div>

      <div className="spacer-small"></div>
      {/* Buttons */}
      <div>
        <div className="button-primary">
          <p>Button</p>
        </div>
        <div className="spacer-small"></div>
        <div className="font-small">Need any help?</div>
      </div>
    </div>
  );
}

export default CodeUsedPopup;
