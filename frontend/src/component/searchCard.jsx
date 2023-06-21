import React, { useEffect, useState } from "react";
import { getBlob, ref } from "firebase/storage";
import { storage } from "../cred/cred";
import Preloader from "./preloader";

const SearchCard = (data) => {
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/days-end1.appspot.com/o/account.png?alt=media&token=5ae448ba-f0e2-4a6a-b180-c15f6ca5a96c"
  );
  const [loader, setLoader] = useState(true);
  const [color, setColor] = useState();

  useEffect(() => {
    generateColor();
    getImage();
  }, []);

  const getImage = async () => {
    setLoader(true);
    let imageRef = ref(storage, data.data.pic);
    let blob = await getBlob(imageRef);
    setImage(URL.createObjectURL(blob));
    setLoader(false);
  };

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
      {loader ? <Preloader /> : ""}
      <div className={`searchCard ${color}`}>
        <div className="flex searchCardHeader">
          <div className="searchCardDP">
            <img src={image} alt="User Profile Picture" />
          </div>
          <div className="flex searchCardInteraction">
            <h4>{data.data.handle}</h4>
            <div className="flex interact">
              <h5>
                Posts: <span>{data.data.posts}</span>
              </h5>
              <div className="followBtn">
                <h5>Follow</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="flex searchProfileBio">
          <p>{data.data.bio}</p>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
