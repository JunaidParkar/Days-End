import React, { useEffect, useState } from "react";
import heart from "../assets/heart.png";
import plane from "../assets/plane.png";
import comment from "../assets/comment.png";
import { useNavigate } from "react-router-dom";

const UserPost = ({ postDatas }) => {
  const [poem, setPoem] = useState("");
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    generateColor();
    setPoem(postDatas.poem.replace(/\n/g, "<br>"));
  }, []);

  const renderPoem = () => {
    if (postDatas.poem.includes("\n")) {
      return <p dangerouslySetInnerHTML={{ __html: poem }}></p>;
    }
    return <p>{postDatas.poem}</p>;
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

  const showPost = () => {
    navigate(`/post/${postDatas.postId}`);
  };

  return (
    <>
      <div className={`postCard ${color}`}>
        <div
          className="flex postPoemHeading"
          onClick={() => {
            showPost();
          }}
        >
          <h4>{postDatas.heading}</h4>
          <p>{postDatas.handle}</p>
        </div>
        <div className="postPoemSec">
          {renderPoem()}
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
