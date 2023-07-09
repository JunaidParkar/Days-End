import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getSpecificPost } from "../api/endPoints";
import Preloader from "../component/preloader";
import PageNotFound from "./pageNotFound";
import heart from "../assets/heart.png";
import heartFilled from "../assets/heartFilled.png";
import plane from "../assets/plane.png";
import comment from "../assets/comment.png";
import trash from "../assets/delete.png";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import edit from "../assets/edit.png";
import useAlert from "../hooks/useAlert";
import AlertBox from "../component/alertBox";
import { setLike } from "../functions/common";

const nonEditablePoem = (
  user,
  navigate,
  poemData,
  poemColor,
  isAlert,
  showAlert,
  closeAlert,
  setLoader
) => {
  const editing = () => {
    navigate(`/post/edit/${poemData.postId}`);
  };

  const likePost = async () => {
    setLoader(true);
    await setLike(poemData.uid, poemData.img, poemData.postId);
    setLoader(false);
  };

  const deletePoem = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      showAlert(
        "Do not refresh the page deleting process is going on in background... wait until you were redirected to home page ro your profile..."
      );
      let data = {
        postId: poemData.postId,
        handle: user.displayName,
      };
      await deletePost(data).then((resp) => {
        if (resp.status !== 200) {
          showAlert(resp.message, false);
        } else {
          navigate("/profile");
        }
      });
    }
  };
  return (
    <>
      <div className={`poemDisplayContainer ${poemColor}`}>
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
            <div className="flexCenter postPoemLike" onClick={() => likePost()}>
              <img src={poemData.liked ? heartFilled : heart} alt="Like" />
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
            {user ? (
              user.uid == poemData.uid ? (
                <>
                  <div
                    className="flexCenter postPoemShare"
                    onClick={() => editing()}
                  >
                    <img src={edit} alt="Edit" />
                    <p>edit</p>
                  </div>
                  <div
                    className="flexCenter postPoemShare"
                    onClick={() => deletePoem()}
                  >
                    <img src={trash} alt="Edit" />
                    <p>delete</p>
                  </div>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <p>a project by junaid parkar</p>
        </div>
      </div>
      {isAlert.state ? (
        <AlertBox
          message={isAlert.log}
          closeAlert={closeAlert}
          logout={false}
        />
      ) : (
        ""
      )}
    </>
  );
};

const Poem = () => {
  const { postID } = useParams();
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");

  const { user, isLoggedIn, isLoading } = useAuth();

  const [poemData, setPoemData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [poemColor, setPoemColor] = useState();

  const poemFromRedux = useSelector((state) => state.posts);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPoemByID();
  }, [postID]);

  const fetchPoemByID = async () => {
    setLoader(true);
    if (Object.keys(poemFromRedux).length > 0) {
      let obj = Object.entries(poemFromRedux).find(
        ([key, value]) => value.postId === postID
      );
      generateColor();
      setPoemData(obj[1]);
    } else {
      await getSpecificPost(postID).then((response) => {
        if (response.status === 200) {
          Object.keys(response.post).forEach((key) => {
            setPoemData(response.post[key]);
          });
          generateColor();
        } else {
          setIsValid(false);
        }
      });
    }
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
        nonEditablePoem(
          user,
          navigate,
          poemData,
          poemColor,
          isAlert,
          showAlert,
          closeAlert,
          setLoader
        )
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default Poem;
