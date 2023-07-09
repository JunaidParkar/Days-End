import React, { useEffect, useState } from "react";

const SearchCard = (props) => {
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/days-end1.appspot.com/o/account.png?alt=media&token=5ae448ba-f0e2-4a6a-b180-c15f6ca5a96c"
  );
  const [color, setColor] = useState();

  useEffect(() => {
    generateColor();
    setImage(props.data.pic);
  }, []);

  const generateColor = () => {
    let colors = [
      "lightGreenColor",
      "skinColor",
      "purpleColor",
      "paleGreenColor",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[randomIndex]);
  };

  return (
    <>
      <div className={`searchCard ${color}`}>
        <div className="flex searchCardHeader">
          <div className="searchCardDP">
            <img src={image} alt="User Profile Picture" />
          </div>
          <div className="flex searchCardInteraction">
            <h4>{props.data.handle}</h4>
            <div className="flex interact">
              <h5>
                Posts: <span>{props.data.posts}</span>
              </h5>
              <div className="followBtn">
                <h5>Follow</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="flex searchProfileBio">
          <p>{props.data.bio}</p>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
