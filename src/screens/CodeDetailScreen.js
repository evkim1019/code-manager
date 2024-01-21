import React from "react";

function CodeDetailScreen({ currentUserInfo, codeDetailInfo }) {
  return (
    <div>
      {/* To scan wrapper */}
      <div>
        <p>
          {codeDetailInfo.isCodeUsed ? "Used" : "Unused"}
          {codeDetailInfo.isCodeUsed
            ? ` used at ${codeDetailInfo.codeUsedDate}`
            : null}
        </p>
        <p>{codeDetailInfo.codeGroupTitle}</p>
        <p>{codeDetailInfo.codeId}</p>
        <p>{codeDetailInfo.codeGroupDetail}</p>
        <p>{codeDetailInfo.codeGroupExpirationDate}</p>
      </div>

      {/* Code group details wrapper */}
      <div>
        {/* code info display group */}
        <div>
          <p>
            {codeDetailInfo.businessIsVarified ? "Verified" : "Not verified"}
          </p>
          <p>{codeDetailInfo.businessName}</p>
          <p>{codeDetailInfo.businessId}</p>
          <p>{codeDetailInfo.businessIntroduction}</p>
        </div>
        {/* business info display group */}
        <div>
          <p>{codeDetailInfo.businessAddress}</p>
          <p>{codeDetailInfo.businessContactNumber}</p>
          <p>asdfdasf</p>
        </div>
        {/* code detail display group */}
        <div>
          {codeDetailInfo.codeGroupDisclaimer.map((disclaimer) => (
            <p>{disclaimer}</p>
          ))}
          {codeDetailInfo.codeGroupOwnerNote ? (
            <p>codeDetailInfo.codeGroupOwnerNote</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CodeDetailScreen;
