import React, { useState } from "react";
import Preloader from "../component/preloader";
import useAlert from "../hooks/useAlert";
import AlertBox from "../component/alertBox";
import { uploadPost } from "../api/endPoints";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddPoem = () => {
  const { user, isLoggedIn, isLoading } = useAuth();

  const [poemData, setPoemData] = useState({
    heading: "",
    poem: "",
  });
  const [loader, setLoader] = useState(false);

  const [isAlert, showAlert, closeAlert] = useAlert(false, "");

  const navigate = useNavigate();

  const handlePoemData = (e) => {
    setPoemData({ ...poemData, [e.target.name]: e.target.value });
  };

  const submitPost = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (poemData.heading.trim() == "" || poemData.poem.trim() == "") {
      showAlert("fields cannot be empty", false);
    } else {
      let data = {
        uid: user.uid,
        email: user.email,
        handle: user.displayName,
        poem: poemData.poem,
        heading: poemData.heading,
        img: user.photoURL,
      };
      await uploadPost(data).then((resp) => {
        if (resp.status === 200) {
          navigate("/");
        } else {
          showAlert(resp.message);
        }
      });
    }
    setLoader(false);
  };

  return (
    <>
      {loader ? <Preloader /> : ""}
      {isLoading ? <Preloader /> : ""}
      <div className="flexCenter addPoemContainer">
        <form
          method="post"
          onSubmit={(e) => {
            submitPost(e);
          }}
          className="flex"
        >
          <h3>Add Post</h3>
          <input
            type="text"
            name="heading"
            id=""
            placeholder="Enter the heading for your post"
            onChange={(e) => {
              handlePoemData(e);
            }}
            required
          />
          <textarea
            name="poem"
            id=""
            cols="30"
            rows="10"
            placeholder="Enter your poem here..."
            onChange={(e) => {
              handlePoemData(e);
            }}
            defaultValue=""
            required
          ></textarea>
          <input type="submit" value="Add Post" />
        </form>
      </div>
      {isAlert.state ? (
        <AlertBox message={isAlert.log} closeAlert={closeAlert} />
      ) : (
        ""
      )}
    </>
  );
};

export default AddPoem;
