import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Preloader from "../component/preloader";

const PoemEditor = () => {
  const { user, isLoggedIn, isLoading } = useAuth();

  const textareaRef = useRef(null);

  const [poemData, setPoemData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [poemColor, setPoemColor] = useState();
  const [newPoem, setNewPoem] = useState({
    heading: "",
    poem: "",
  });

  const poem = useSelector((state) => state.poem);

  const navigate = useNavigate();

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
    handleTextareaInput();
  }, [newPoem]);
  console.log(newPoem);

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to auto to recalculate scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height based on scroll height
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

  const poemCode = (pp) => {
    return (
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
            ref={textareaRef}
            defaultValue={pp.poem}
            onChange={(e) => handleNewPoemData(e)}
          ></textarea>
        </div>
        <div className="flex actionCenter">
          <input type="button" value="Save" disabled />
        </div>
      </div>
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
    </>
  );
};

export default PoemEditor;
