import React from "react";

const SearchCardSkeleton = () => {
  return (
    <>
      <div className={`skeleton searchCard`}>
        <div className="flex searchCardHeader">
          <div className="searchCardDP">
            <div className="img"></div>
          </div>
          <div className="flex searchCardInteraction"></div>
        </div>
        <div className="flex searchProfileBio">
          <p></p>
        </div>
      </div>
    </>
  );
};

export default SearchCardSkeleton;
