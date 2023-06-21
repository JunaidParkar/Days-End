import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificPost } from "../api/endPoints";
import Preloader from "../component/preloader";
import PageNotFound from "./pageNotFound";
import heart from "../assets/heart.png";
import plane from "../assets/plane.png";
import comment from "../assets/comment.png";

const Poem = () => {
  const { postID } = useParams();

  const [poemData, setPoemData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [poemColor, setPoemColor] = useState();
  const [realPoem, setRealPoem] = useState("");

  useEffect(() => {
    fetchPoemByID();
  }, [postID]);

  const fetchPoemByID = async () => {
    setLoader(true);
    await getSpecificPost(postID).then((response) => {
      if (response.status === 200) {
        setIsValid(true);
        generateColor();
        setRealPoem(response.data.poem.replace(/\n/g, "<br>"));
        setPoemData(response.data);
      } else {
        setIsValid(false);
      }
    });
    setLoader(false);
  };

  const renderPoem = () => {
    return <p dangerouslySetInnerHTML={{ __html: realPoem }}></p>;
  };

  const generateColor = () => {
    let colors = [
      "lightGreenColor",
      "skinColor",
      "purpleColor",
      "paleGreenColor",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    setPoemColor(colors[randomIndex]);
  };

  const poemUI = () => {
    return (
      <>
        <div className={`poemDisplayContainer ${poemColor}`}>
          <div className="flex headerSec">
            <h4>{poemData.heading}</h4>
            <p>{poemData.handle}</p>
          </div>
          <div className="poemSecCont">{renderPoem()}</div>
          <div className="flex actionCenter">
            <div className=" flex opts">
              <div className="flexCenter postPoemLike">
                <img src={heart} alt="Like" />
                <p>{poemData.like}</p>
              </div>
              <div className="flexCenter postPoemLike">
                <img src={comment} alt="Like" />
                <p>{poemData.comment}</p>
              </div>
              <div className="flexCenter postPoemShare">
                <img src={plane} alt="Share" />
                <p>Share</p>
              </div>
            </div>
            <p>a project by junaid parkar</p>
          </div>
        </div>
      </>
    );
  };

  return <>{loader ? <Preloader /> : isValid ? poemUI() : <PageNotFound />}</>;
};

export default Poem;
