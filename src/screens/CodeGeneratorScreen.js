import React, { useState } from "react";
import CodeGenerator from "../components/CodeGenerator";
import CodeGeneratorResult from "../components/CodeGeneratorResult";

function CodeGeneratorScreen({
  isAuthenticated,
  currentUserInfo,
  businessesDB,
  codeGroupsDB,
  codesDB,
}) {
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [numberOfCode, setNumberOfCode] = useState(0);

  // Avoid generating existing code group id
  function isCodeGroupIdDuplicate(codeGroupId, codeGroupsDB) {
    return Object.keys(codeGroupsDB).includes(codeGroupId);
  }
  // Generate code group id function
  function generateUniqueCodeGroupId(codeGroupsDB) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const generateCode = () => {
      let codeGroupId = "";
      for (let j = 0; j < 8; j++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        codeGroupId += characters[randomIndex];
      }
      return codeGroupId;
    };

    let newCodeGroupId;
    do {
      newCodeGroupId = generateCode();
    } while (isCodeDuplicate(newCodeGroupId, codeGroupsDB));

    return newCodeGroupId;
  }

  // Avoid generating existing code
  function isCodeDuplicate(code, codesDB) {
    return Object.keys(codesDB).includes(code);
  }
  // Generate code function
  function generateUniqueCodes(count, codesDB) {
    const codes = [];
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const generateCode = () => {
      let code = "";
      for (let j = 0; j < 8; j++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }
      return code;
    };

    while (codes.length < count) {
      const newCode = generateCode();
      if (!isCodeDuplicate(newCode, codesDB)) {
        codes.push(newCode);
      }
    }

    return codes;
  }

  // Handle inputs
  const handleNumberOfCodeChange = (e) => {
    setNumberOfCode(e.target.value);
  };
  const handleSelectBusiness = (e) => {
    setSelectedBusinessId(e.target.value);
  };

  // Submit for generation
  const handleGenerate = () => {
    // Generate codes
    console.log(generateUniqueCodes(numberOfCode, codesDB));
    // Gather info to register
    let generatedCodeGroupId = generateUniqueCodeGroupId(codeGroupsDB);
    let generatedCodes = generateUniqueCodes(numberOfCode, codesDB);

    // info to add in codesDB
    console.log(
      generatedCodes.map((code) => {
        return {
          codeId: code,
          codeGroupId: generatedCodeGroupId,
          businessId: selectedBusinessId,
          isCodeUsed: false,
          codeUsedDate: null,
        };
      })
    );

    // info to add in codeGroupsDB
    console.log({
      businessId: selectedBusinessId,
      codeGroupCreated: "timestamp here",
      codeGroupDetail: "",
      codeGroupDisclaimer: [],
      codeGroupExpirationDate: "timestamp here",
      codeGroupExpired: false,
      codeGroupId: generatedCodeGroupId,
      codeGroupOwnerNote: "",
      codeGroupTitle: "",
      codes: generatedCodes,
    });

    // info to add in businessesDB
    console.log(
      "from this",
      businessesDB[selectedBusinessId].businessOwnedCodeGroups,
      "to this",
      businessesDB[selectedBusinessId].businessOwnedCodeGroups.push(
        generatedCodeGroupId
      )
    );
  };

  console.log("generator props", businessesDB);

  return (
    <div className="screen">
      {/* credit info wrapper */}
      <div>
        <p>Credit</p>
        <p>23</p>
      </div>

      {/* Code group info wrapper */}
      <div>
        {/* Input group */}
        <div>
          <label htmlFor="businessSelect">Select business</label>
          <select
            id="businessSelect"
            onChange={handleSelectBusiness}
            value={selectedBusinessId}
          >
            {/* Map over your businesses data and create an option for each business */}
            {currentUserInfo.userOwnedBusinesses.map((businessId) => (
              <option key={businessId} value={businessId}>
                {businessesDB[businessId].businessName}
              </option>
            ))}
          </select>
        </div>
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
          <input
            type="number"
            value={numberOfCode}
            onChange={handleNumberOfCodeChange}
          />
        </div>

        {/*  ...  */}

        {/* Button */}
        <div onClick={handleGenerate}>
          <p>Generate</p>
        </div>
      </div>
      {/* <CodeGeneratorResult /> */}
    </div>
  );
}

export default CodeGeneratorScreen;
