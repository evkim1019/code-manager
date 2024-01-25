import React from "react";

function SignupScreen() {
  return (
    <div className="screenContainer">
      {/* Input group */}
      <div>
        <p>Email</p>
        <input type="email" />
      </div>
      {/* Input group */}
      <div>
        <p>Full name</p>
        <input type="text" />
      </div>
      {/* Input group */}
      <div>
        <p>Password</p>
        <input type="password" />
      </div>
      {/* Checkbox group */}
      <div>
        <input type="checkbox" />
        <p>Have a business?</p>
        <p>Register your business and generate codes</p>
      </div>
      {/* If owned business? wrapper */}
      <div>
        {/* Input group */}
        <div>
          <p>Business name</p>
          <input type="text" />
        </div>
        {/* Input group */}
        <div>
          <p>Business name</p>
          <input type="text" />
        </div>
        {/* Input group */}
        <div>
          <p>Tax Id</p>
          <p>
            register the tax id and get verification badge for your business
          </p>
          <input type="text" />
        </div>
        {/* Input group */}
        <div>
          <p>Business address</p>
          <input type="text" />
        </div>
        {/* Input group */}
        <div>
          <p>Business contact number</p>
          <input type="number" />
        </div>
      </div>
      {/* Button */}
      <div>
        <button>Sign up</button>
      </div>
    </div>
  );
}

export default SignupScreen;
