import React from "react";

function CodeGeneratorResult() {
  return (
    <div>
      {/* Result summary wrapper */}
      <div>
        <p>Congrats!</p>
        <p>
          25 codes are successfully created. Type emails to share the codes!
        </p>
        <p>10 credit remained</p>
      </div>

      {/* Code share input wrapper */}
      <div>
        {/* Code receiver info wrapper */}
        <div>
          {/* Input group */}
          <div>
            <p>Name</p>
            <input type="text" />
          </div>
          {/* Input group */}
          <div>
            <p>Email</p>
            <input type="email" />
          </div>
        </div>

        {/* Code receiver info wrapper */}
        <div>
          {/* Input group */}
          <div>
            <p>Name</p>
            <input type="text" />
          </div>
          {/* Input group */}
          <div>
            <p>Email</p>
            <input type="email" />
          </div>
        </div>

        {/* Code receiver info wrapper */}
        <div>
          {/* Input group */}
          <div>
            <p>Name</p>
            <input type="text" />
          </div>
          {/* Input group */}
          <div>
            <p>Email</p>
            <input type="email" />
          </div>
        </div>
      </div>

      {/* Button */}
      <div>
        <button>Send</button>
      </div>
    </div>
  );
}

export default CodeGeneratorResult;
