import React, { useEffect, useState } from "react";

import users from "../sampleDB/users.json";
import businesses from "../sampleDB/businesses.json";
import codeGroups from "../sampleDB/codeGroups.json";
import codes from "../sampleDB/codes.json";

function CodeListScreen({ currentUserInfo, setCodeDetailInfo }) {
  const [userOwnedCodeOrganized, setUserOwnedCodeOrganized] = useState([]);

  useEffect(() => {
    const createBusinessItem = () => {
      const isCodeIdDuplicate = (businessItem, codeId) => {
        return businessItem.some((itemObj) => itemObj.codeId === codeId);
      };

      const organizedByBusiness = currentUserInfo.userOwnedCodes.reduce(
        (acc, code) => {
          const businessId = businesses[codes[code].businessId].businessId;

          // Find the business group in the accumulator
          const businessGroup = acc.find(
            (item) => Object.keys(item)[0] === businessId
          );

          // If the business group is found
          if (businessGroup) {
            if (
              !isCodeIdDuplicate(
                Object.values(businessGroup)[0],
                codes[code].codeId
              )
            ) {
              Object.values(businessGroup)[0].push(codes[code]);
            }
          } else {
            // If the business group is not found, create a new one

            acc.push({
              [businessId]: [codes[code]],
            });
          }

          return acc;
        },
        []
      );

      setUserOwnedCodeOrganized(organizedByBusiness);
    };

    createBusinessItem();
  }, [currentUserInfo.userOwnedCodes]);

  const handleClick = (prop) => {
    setCodeDetailInfo({
      ...prop,
      ...businesses[prop.businessId],
      ...codeGroups[prop.codeGroupId],
    });
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
      {userOwnedCodeOrganized.map((obj) => {
        return (
          <div>
            <div>
              <h2>{businesses[Object.keys(obj)[0]].businessName}</h2>
            </div>
            <div>
              {Object.values(obj)[0].map((codeObj) => (
                <div onClick={(e) => handleClick(codeObj)}>
                  <p>
                    CODE: {codeObj.codeId} (
                    {codeObj.isCodeUsed ? "Used" : "Unused"})
                  </p>
                  <p>
                    {codeGroups[codeObj.codeGroupId].codeGroupExpirationDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CodeListScreen;
