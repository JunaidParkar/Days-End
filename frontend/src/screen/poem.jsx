// eslint-disable-next-line react/no-danger-with-children

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificPost } from "../api/endPoints";
import Preloader from "../component/preloader";
import PageNotFound from "./pageNotFound";
import heart from "../assets/heart.png";
import plane from "../assets/plane.png";
import comment from "../assets/comment.png";
import useAuth from "../hooks/useAuth";

const Poem = (editable) => {
  const { postID } = useParams();

  const { user, isLoggedIn, isLoading } = useAuth();

  const [poemData, setPoemData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [poemColor, setPoemColor] = useState();
  const [realPoem, setRealPoem] = useState("");
  const [poem, setPoem] = useState();

  useEffect(() => {
    fetchPoemByID();
  }, [postID]);
  console.log(poemData);

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
    return editable ? (
      <p
        // dangerouslySetInnerHTML={{ __html: realPoem }}
        contentEditable={user ? (user.uid == poemData.uid ? true : false) : ""}
        onChange={(e) => {}}
        defaultValue={realPoem}
      ></p>
    ) : (
      ""
    );
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

  const optIfNotEditable = () => {
    return (
      <>
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
      </>
    );
  };

  const optionIfEditable = () => {
    return (
      <>
        <input type="button" value="Save" disabled />
      </>
    );
  };
  console.log(realPoem);
  const poemUI = () => {
    useEffect(() => {
      handleTextareaInput();
    }, []);

    // document.getElementById("tr").style.height = `${
    //   document.getElementById("tr").scrollHeight
    // }px`;
    const handleTextareaInput = (event) => {
      const textarea = document.getElementById("tr");
      textarea.style.height = "auto"; // Reset the height to auto to recalculate scroll height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height based on scroll height
      // setPoem(textarea.value);
    };
    return (
      <>
        <div className={`poemDisplayContainer ${poemColor}`}>
          <div className="flex headerSec">
            {editable ? (
              <input type="text" defaultValue={poemData.heading} />
            ) : (
              <h4>{poemData.heading}</h4>
            )}

            <p>{poemData.handle}</p>
          </div>
          <div className="poemSecCont">
            {/* {renderPoem()} */}
            {editable ? (
              <textarea
                name=""
                id="tr"
                // rows="100"
                defaultValue={poemData.poem}
                onChange={(e) => handleTextareaInput(e)}
              ></textarea>
            ) : (
              <p defaultValue={realPoem}></p>
            )}
          </div>
          <div className="flex actionCenter">
            {editable ? optionIfEditable() : optIfNotEditable()}
          </div>
        </div>
      </>
    );
  };

  return <>{loader ? <Preloader /> : isValid ? poemUI() : <PageNotFound />}</>;
};

export default Poem;
