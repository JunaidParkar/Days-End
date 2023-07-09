import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Preloader from "../component/preloader";
import useAlert from "../hooks/useAlert";
import AlertBox from "../component/alertBox";
import { updatePost } from "../api/endPoints";
import { removePoem } from "../redux/actions/poemAction";

const PoemEditor = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");

  const textareaRef = useRef(null);

  const [poemData, setPoemData] = useState(null);
  const [alertShown, setAlertShown] = useState(false);
  const [loader, setLoader] = useState(true);
  const [poemColor, setPoemColor] = useState();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [newPoem, setNewPoem] = useState({
    heading: "",
    poem: "",
  });

  const dispatch = useDispatch();
  const poem = useSelector((state) => state.poem);

  if (!alertShown) {
    showAlert(
      "Do not try to refresh this page... Else your post may lead to an error...",
      false
    );
    setAlertShown(true);
  }

  const navigate = useNavigate();

  if (poem == {}) {
    navigate("/");
  }

  useEffect(() => {
    setLoader(true);
    if (user) {
      if (poem) {
        if (poem.uid == user.uid) {
          generateColor();
          setPoemData(poem);
          let newData = { heading: poem.heading, poem: poem.poem };
          setNewPoem({ ...newData });
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
    setLoader(false);
  }, [user, poem]);

  useEffect(() => {
    if (newPoem.heading == "" || newPoem.poem == "") {
      setIsBtnDisabled(true);
    } else {
      setIsBtnDisabled(false);
    }
  }, [newPoem]);

  useEffect(() => {
    handleTextareaInput();
  }, [newPoem]);

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
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

  const handleNewPoemData = (e) => {
    setNewPoem({ ...newPoem, [e.target.name]: e.target.value });
  };

  const submitPost = async () => {
    setLoader(true);
    let updatedData = {
      heading: newPoem.heading,
      poem: newPoem.poem,
      postId: poem.postId,
    };
    await updatePost(updatedData).then((respo) => {
      if (respo.status !== 200) {
        showAlert(respo.message, false);
      } else {
        dispatch(removePoem({}));
        navigate("/profile");
      }
    });
    setLoader(false);
  };

  const poemCode = (pp) => {
    return (
      <>
        <div className={`poemDisplayContainer ${poemColor}`}>
          <div className="flex headerSec">
            <input
              type="text"
              name="heading"
              onChange={(e) => handleNewPoemData(e)}
              defaultValue={pp.heading}
              id=""
            />
            <p>{pp.handle}</p>
          </div>
          <div className="poemSecCont">
            <textarea
              name="poem"
              id="tr"
              style={{ width: "100%" }}
              ref={textareaRef}
              defaultValue={pp.poem}
              onChange={(e) => handleNewPoemData(e)}
            ></textarea>
          </div>
          <div className="flex actionCenter">
            <input
              type="button"
              value="Save"
              disabled={isBtnDisabled}
              onClick={() => submitPost()}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {loader || isLoading ? (
        <Preloader />
      ) : poemData ? (
        poemCode(poemData)
      ) : (
        <Preloader />
      )}
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

export default PoemEditor;
