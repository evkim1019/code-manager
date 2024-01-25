import React, { useEffect, useState } from "react";

import users from "../sampleDB/users.json";
import businesses from "../sampleDB/businesses.json";
import codeGroups from "../sampleDB/codeGroups.json";
import codes from "../sampleDB/codes.json";
import { Link } from "react-router-dom";

import "./CodeListScreen.css";

function CodeListScreen({
  usersDB,
  codesDB,
  codeGroupsDB,
  businessesDB,
  currentUserInfo,
  setCodeDetailInfo,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userOwnedCodeOrganized, setUserOwnedCodeOrganized] = useState([]);

  useEffect(() => {
    const createBusinessItem = () => {
      const isCodeIdDuplicate = (businessItem, codeId) => {
        return businessItem.some((itemObj) => itemObj.codeId === codeId);
      };
      if (
        currentUserInfo.userOwnedCodes &&
        currentUserInfo.userOwnedCodes.length > 1
      ) {
        const organizedByBusiness = currentUserInfo.userOwnedCodes.reduce(
          (acc, code) => {
            const businessId =
              businessesDB[codesDB[code].businessId].businessId;

            if (acc[businessId]) {
              // If the business key already exists, append the code object
              if (!isCodeIdDuplicate(acc[businessId], codesDB[code].codeId)) {
                acc[businessId].push(codesDB[code]);
              }
            } else {
              // If the business key does not exist, create a new key-value pair
              acc[businessId] = [codesDB[code]];
            }

            return acc;
          },
          {}
        );
        const resultArray = Object.keys(organizedByBusiness).map((key) => ({
          [key]: organizedByBusiness[key],
        }));

        setUserOwnedCodeOrganized(resultArray);
      } else {
        setUserOwnedCodeOrganized([]);
      }

      setIsLoading(false);
    };

    createBusinessItem();
  }, [currentUserInfo.userOwnedCodes]);

  const handleClick = (prop) => {
    setCodeDetailInfo({
      ...prop,
      ...businessesDB[prop.businessId],
      ...codeGroupsDB[prop.codeGroupId],
    });
  };

  // Timestamp conversion
  const convertTimestampToMilliseconds = (timestamp) => {
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    return milliseconds;
  };

  console.log("userOwnedCodeOrganized", userOwnedCodeOrganized);

  return (
    <div className="screen">
      {/* Manage my business codes button wrapper */}
      <div className="buttonWrapper">
        <Link to="/generator" className="button-primary">
          Generate codes
        </Link>
        <button className="button-primary">Manage my business codes</button>
      </div>

      {/* Sort functions wrapper */}
      <div className="listSortFunctionWrapper">
        {/* Filters wrapper */}
        <div className="listFilterWrapper">
          {/* Filter */}
          <div className="selected">
            <p>All</p>
          </div>
          {/* Filter */}
          <div>
            <p>Unused</p>
          </div>
          {/* Filter */}
          <div>
            <p>Used</p>
          </div>
          {/* Filter */}
          <div>
            <p>Expired</p>
          </div>
        </div>

        {/* Search */}
        <div className="listSearchWrapper">
          <p>/icon/</p>
          <p>Search</p>
        </div>
      </div>

      {/* Individual business wrapper */}
      {!isLoading ? (
        userOwnedCodeOrganized.map((obj) => {
          const businessId = Object.keys(obj)[0];
          const codesArray = obj[businessId];

          return (
            <div key={businessId} className="list-section">
              <div>
                <p className="font-accent-large">
                  {businessesDB[businessId].businessName}
                </p>
              </div>
              {userOwnedCodeOrganized.length > 0 ? (
                <div>
                  {codesArray.map((codeObj) => (
                    <Link to={codeObj.codeId} className="hover-pointer">
                      <div
                        className="list-item"
                        key={codeObj.codeId}
                        onClick={(e) => handleClick(codeObj)}
                      >
                        <div>
                          <p className="font-small">
                            Until{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            }).format(
                              new Date(
                                convertTimestampToMilliseconds(
                                  codeGroupsDB[codeObj.codeGroupId]
                                    .codeGroupExpirationDate
                                )
                              )
                            )}
                          </p>
                          <div>
                            <p
                              className="font-xx-large"
                              style={
                                codeObj.isCodeUsed
                                  ? {
                                      opacity: 0.5,
                                    }
                                  : null
                              }
                            >
                              {codeGroupsDB[codeObj.codeGroupId].codeGroupTitle}
                            </p>
                            <p>{codeObj.codeGroupsTitle}</p>
                          </div>
                        </div>

                        {/* <p className="font-small">Expires</p> */}
                        {codeObj.isCodeUsed ? (
                          <div>
                            <p className="" style={{ opacity: 0.5 }}>
                              USED
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="button-primary">View details</p>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div>
                  <p>There is no code</p>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
  return <div>asdf</div>;
}

export default CodeListScreen;
