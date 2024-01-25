import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CodeDetailScreen.css";
import CodeUsedPopup from "../components/CodeUsedPopup";

function CodeDetailScreen({
  isLoading,
  codesDB,
  businessesDB,
  codeGroupsDB,
  isAuthenticated,
  currentUserInfo,
  codeDetailInfo,
}) {
  const navigate = useNavigate();

  const [codeDetailInfoMounted, setCodeDetailInfoMounted] =
    useState(codeDetailInfo);
  const [isPageLoading, setIsPageLoading] = useState(isLoading);

  useEffect(() => {
    setCodeDetailInfoMounted(codeDetailInfo);
    const currentPath = window.location.pathname.substring(1);
    if (
      isAuthenticated &&
      currentUserInfo.userOwnedCodes.includes(currentPath)
    ) {
      setCodeDetailInfoMounted({
        ...codesDB[currentPath],
        ...businessesDB[codesDB[currentPath].businessId],
        ...codeGroupsDB[codesDB[currentPath].codeGroupId],
      });
    } else {
      navigate("/");
    }
  }, []);

  // Timestamp conversion
  const convertTimestampToMilliseconds = (timestamp) => {
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    return milliseconds;
  };

  return (
    <div className="screen">
      {isPageLoading ? (
        <div>Code detail page loading...</div>
      ) : (
        <>
          {/* Popup */}
          {codeDetailInfoMounted.isCodeUsed ? <CodeUsedPopup /> : null}

          {/* To scan wrapper */}
          <div className="codeDetail-section-wrapper list-section">
            <p className="font-badge">
              {codeDetailInfoMounted.isCodeUsed
                ? `Used at
                ${new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }).format(
                  new Date(
                    convertTimestampToMilliseconds(
                      codeDetailInfoMounted.codeUsedDate
                    )
                  )
                )}`
                : "Unused"}
            </p>

            <div className="list-item">
              <p
                className="font-accent-large"
                style={
                  codeDetailInfoMounted.isCodeUsed ? { opacity: 0.5 } : null
                }
              >
                {codeDetailInfoMounted.codeId}
              </p>
              {codeDetailInfoMounted.codeGroupExpirationDate ? (
                <p
                  style={
                    codeDetailInfoMounted.isCodeUsed ? { opacity: 0.5 } : null
                  }
                >
                  Until{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }).format(
                    new Date(
                      convertTimestampToMilliseconds(
                        codeDetailInfoMounted.codeGroupExpirationDate
                      )
                    )
                  )}
                </p>
              ) : null}
            </div>

            <div className="list-section">
              <p className="font-xx-large">
                {codeDetailInfoMounted.codeGroupTitle}
              </p>
            </div>

            <p>{codeDetailInfoMounted.codeGroupDetail}</p>

            <div className="spacer-small"></div>

            {/* code detail display group */}
            <div>
              {codeDetailInfoMounted.codeGroupOwnerNote ? (
                <p>{codeDetailInfoMounted.codeGroupOwnerNote}</p>
              ) : null}
              {codeDetailInfoMounted.codeGroupDisclaimer
                ? codeDetailInfoMounted.codeGroupDisclaimer.map(
                    (disclaimer) => <p>{disclaimer}</p>
                  )
                : null}
            </div>
          </div>

          {/* Code group details wrapper */}
          <div className="codeDetail-section-wrapper infoPanelWrapper">
            {/* code info display group */}
            <div>
              <div className="display-inline">
                <p>{codeDetailInfoMounted.businessIsVarified ? "V" : "X"}</p>
                <p className="font-x-large">
                  {codeDetailInfoMounted.businessName}
                </p>
              </div>
              <p>{codeDetailInfoMounted.businessIntroduction}</p>
            </div>
            <div className="spacer-small"></div>
            {/* business info display group */}
            <div>
              <p>{codeDetailInfoMounted.businessAddress}</p>
              <p>{codeDetailInfoMounted.businessContactNumber}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CodeDetailScreen;
