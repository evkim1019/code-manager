import React from "react";

function CodeDetailScreen({ currentUserInfo, codeDetailInfo }) {
  console.log("codeDetailInfo", codeDetailInfo);

  // Timestamp conversion
  const convertTimestampToMilliseconds = (timestamp) => {
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    return milliseconds;
  };

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
        {/* <p>{codeDetailInfo.codeGroupExpirationDate}</p> */}
        <p>
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }).format(
            new Date(
              convertTimestampToMilliseconds(
                codeDetailInfo.codeGroupExpirationDate
              )
            )
          )}
        </p>
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
          {codeDetailInfo.codeGroupDisclaimer
            ? codeDetailInfo.codeGroupDisclaimer.map((disclaimer) => (
                <p>{disclaimer}</p>
              ))
            : null}
          {codeDetailInfo.codeGroupOwnerNote ? (
            <p>codeDetailInfo.codeGroupOwnerNote</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CodeDetailScreen;
