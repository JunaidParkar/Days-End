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
import { useDispatch } from "react-redux";
import { storePoem } from "../redux/actions/poemAction";
import edit from "../assets/edit.png";
import useAlert from "../hooks/useAlert";
import AlertBox from "../component/alertBox";
import { setLike } from "../functions/common";

const nonEditablePoem = (
  user,
  navigate,
  poemData,
  color,
  isAlert,
  showAlert,
  closeAlert,
  dispatch,
  setLoader,
  liked
) => {
  const editing = () => {
    dispatch(storePoem({ ...poemData }));
    navigate("/post/edit");
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
  console.log(liked);
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
            <div className="flexCenter postPoemLike" onClick={() => likePost()}>
              <img src={liked ? heartFilled : heart} alt="Like" />
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
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (Object.keys(likes).length > 0) {
  //     Object.keys(likes).forEach((l) => {
  //       console.log(l);
  //       if (likes[l].postId == postDatas.postId) {
  //         setLiked(true);
  //       }
  //     });
  //   }
  // }, [likes]);

  useEffect(() => {
    fetchPoemByID();
  }, [postID]);

  const fetchPoemByID = async () => {
    setLoader(true);
    await getSpecificPost(postID).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setIsValid(true);
        generateColor();
        setPoemData(response.data);
        setLiked(response.liked);
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
        nonEditablePoem(
          user,
          navigate,
          poemData,
          poemColor,
          isAlert,
          showAlert,
          closeAlert,
          dispatch,
          setLoader,
          liked
        )
      ) : (
        // "hello world"
        <PageNotFound />
      )}
    </>
  );
};

export default Poem;
