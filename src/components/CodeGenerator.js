import React from "react";

function CodeGenerator() {
  return (
    <div>
      {/* Input group */}
      <div>
        <p>Code title</p>
        <input type="text" />
      </div>
      {/* Input group */}
      <div>
        <p>Code detail</p>
        <input type="text" />
      </div>

      {/*  ...  */}

      {/* Input group */}
      <div>
        <p>Experation date</p>
        <input type="date" />
      </div>
      {/* Input group */}
      <div>
        <p>Number of codes</p>
        <input type="number" />
      </div>

      {/*  ...  */}

      {/* Button */}
      <div>
        <button>Generate</button>
      </div>
    </div>
  );
}

export default CodeGenerator;
