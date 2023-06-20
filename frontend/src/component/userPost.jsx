import React from "react";
import heart from "../assets/heart.png";
import plane from "../assets/plane.png";
import comment from "../assets/comment.png";

const UserPost = ({ postDatas }) => {
  console.log(postDatas);
  return (
    <>
      <div className="postCard lightGreenColor">
        <div className="flex postPoemHeading">
          <h4>{postDatas.heading}</h4>
          <p>{postDatas.handle}</p>
        </div>
        <div className="postPoemSec">
          <p>{postDatas.poem}</p>
          <div className="flex postPoemInteractionSec">
            <div className="flexCenter postPoemLike">
              <img src={heart} alt="Like" />
              <p>{postDatas.like}</p>
            </div>
            <div className="flexCenter postPoemLike">
              <img src={comment} alt="Like" />
              <p>{postDatas.comment}</p>
            </div>
            <div className="flexCenter postPoemShare">
              <img src={plane} alt="Share" />
              <p>Share</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPost;
