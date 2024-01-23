import React, { useEffect, useState } from "react";

import users from "../sampleDB/users.json";
import businesses from "../sampleDB/businesses.json";
import codeGroups from "../sampleDB/codeGroups.json";
import codes from "../sampleDB/codes.json";

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

  console.log("userOwnedCodeOrganized", userOwnedCodeOrganized);
  useEffect(() => {
    const createBusinessItem = () => {
      const isCodeIdDuplicate = (businessItem, codeId) => {
        return businessItem.some((itemObj) => itemObj.codeId === codeId);
      };

      const organizedByBusiness = currentUserInfo.userOwnedCodes.reduce(
        (acc, code) => {
          const businessId = businessesDB[codesDB[code].businessId].businessId;

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

  return (
    <div>
      {/* Manage my business codes button wrapper */}
      <div>
        <button>Generate codes</button>
        <button>Manage my business codes</button>
      </div>

      {/* Search */}
      <div>
        <p>--- Search ---</p>
      </div>

      {/* Filters wrapper */}
      <div>
        {/* Filter */}
        <div>
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

      {/* Individual business wrapper */}
      {!isLoading ? (
        userOwnedCodeOrganized.map((obj) => {
          const businessId = Object.keys(obj)[0];
          const codesArray = obj[businessId];

          return (
            <div key={businessId}>
              <div>
                <h2>{businessesDB[businessId].businessName}</h2>
              </div>
              <div>
                {codesArray.map((codeObj) => (
                  <div
                    key={codeObj.codeId}
                    onClick={(e) => handleClick(codeObj)}
                  >
                    <p>
                      CODE: {codeObj.codeId} (
                      {codeObj.isCodeUsed ? "Used" : "Unused"})
                    </p>
                    <p>
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
                  </div>
                ))}
              </div>
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
