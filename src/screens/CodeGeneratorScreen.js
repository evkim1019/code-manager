import React from "react";
import CodeGenerator from "../components/CodeGenerator";
import CodeGeneratorResult from "../components/CodeGeneratorResult";

function CodeGeneratorScreen() {
  return (
    <div className="screenContainer">
      {/* credit info wrapper */}
      <div>
        <p>Credit</p>
        <p>23</p>
      </div>

      {/* Code group info wrapper */}
      <CodeGenerator />
      <CodeGeneratorResult />
    </div>
  );
}

export default CodeGeneratorScreen;
