import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificPost } from "../api/endPoints";
import Preloader from "../component/preloader";
import PageNotFound from "./pageNotFound";
import heart from "../assets/heart.png";
import plane from "../assets/plane.png";
import comment from "../assets/comment.png";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { storePoem } from "../redux/actions/poemAction";
import edit from "../assets/edit.png";

const nonEditablePoem = (user, navigate, poemData, color) => {
  return (
    <>
      <div className={`poemDisplayContainer ${color}`}>
        <div className="flex headerSec">
          <h4>{poemData.heading}</h4>
          <p>{poemData.handle}</p>
        </div>
        <div className="poemSecCont">
          <p
            dangerouslySetInnerHTML={{
              __html: poemData.poem.replace(/\n/g, "<br>"),
            }}
          />
        </div>
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
            {user.uid == poemData.uid ? (
              <div
                className="flexCenter postPoemShare"
                onClick={() => navigate("/post/edit")}
              >
                <img src={edit} alt="Edit" />
                <p>edit</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <p>a project by junaid parkar</p>
        </div>
      </div>
    </>
  );
};

const Poem = () => {
  const { postID } = useParams();

  const { user, isLoggedIn, isLoading } = useAuth();

  const [poemData, setPoemData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [poemColor, setPoemColor] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    fetchPoemByID();
  }, [postID]);

  const fetchPoemByID = async () => {
    setLoader(true);
    await getSpecificPost(postID).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        dispatch(storePoem({ ...response.data }));
        setIsValid(true);
        generateColor();
        setPoemData(response.data);
      } else {
        setIsValid(false);
      }
    });
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
    setPoemColor(colors[randomIndex]);
  };

  return (
    <>
      {loader || isLoading ? (
        <Preloader />
      ) : isValid ? (
        nonEditablePoem(user, navigate, poemData, poemColor)
      ) : (
        // "hello world"
        <PageNotFound />
      )}
    </>
  );
};

export default Poem;
