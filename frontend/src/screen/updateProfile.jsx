import React, { useEffect, useState } from "react";
import noUser from "../assets/noUser.jpg";
import useAuth from "../hooks/useAuth";
import { updateProfileData } from "../functions/updateProfile/updateUserProfile";
import imageCompressor from "../functions/updateProfile/imageCompresser";
import { getBlob, ref } from "firebase/storage";
import { storage } from "../cred/cred";
import EmptyNavbar from "../component/emptyNavBar";
import Preloader from "../component/preloader";
import AlertBox from "../component/alertBox";
import useAlert from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");
  const [userData, setUserData] = useState({
    displayName: "",
    bio: "",
    profilePic: "",
  });
  const [disableBtn, setDisableBtn] = useState(true);
  const { user, isLoggedIn, isEmailVerified, isLoading } = useAuth();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const setUserDataFromUser = async () => {
      if (!isLoading) {
        setLoader(true);

        if (user.photoURL) {
          let picRef = ref(storage, user.photoURL);
          let blobImage = await getBlob(picRef);
          setUserData({ ...userData, profilePic: blobImage });
        } else {
          let picRef = ref(storage, "account.png");
          let blobImage = await getBlob(picRef);
          setUserData({ ...userData, profilePic: blobImage });
        }

        setUserData((prevUserData) => ({
          ...prevUserData,
          displayName: user.displayName || "",
          bio: "",
        }));

        setLoader(false);
      }
    };
    setUserDataFromUser();
  }, [user]);

  useEffect(() => {
    const updateBtn = () => {
      if (userData.displayName.trim() !== "" && userData.bio.trim() !== "") {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    };
    updateBtn();
  }, [userData]);

  const handleImage = async (e) => {
    setLoader(true);
    await imageCompressor(e.target.files[0], 800).then((compressedFile) => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePic: compressedFile,
      }));
    });
    setLoader(false);
  };

  const handleUserdata = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadProfile = async (e) => {
    e.preventDefault();
    setLoader(true);

    await updateProfileData(user, userData)
      .then((resp) => {
        showAlert(resp.message, false);
        if (resp.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {});

    setLoader(false);
  };

  return (
    <>
      {loader ? <Preloader /> : ""}
      <EmptyNavbar page="house" />
      <div className="updateProfileContainer">
        <div className="flexCenter profilePicContainer">
          <img
            src={
              !isLoading
                ? userData.profilePic
                  ? URL.createObjectURL(userData.profilePic)
                  : noUser
                : ""
            }
            onClick={() => document.getElementById("profilePicInput").click()}
            id="imagePic"
            alt="Profile picture"
          />
        </div>
        <form className="flex" method="post" onSubmit={(e) => uploadProfile(e)}>
          <input type="text" disabled value={!isLoading ? user.email : ""} />
          <input
            type="text"
            name="displayName"
            defaultValue={
              !isLoading
                ? user.displayName === null || user.displayName == ""
                  ? ""
                  : user.displayName
                : ""
            }
            placeholder="Enter username you want..."
            onChange={(e) => handleUserdata(e)}
            required
          />
          <textarea
            rows="3"
            name="bio"
            placeholder="Write about your self..."
            onChange={(e) => handleUserdata(e)}
            required
          />
          <input type="submit" disabled={disableBtn} value="Submit" />
        </form>
      </div>
      <input
        type="file"
        name="profilePic"
        hidden
        id="profilePicInput"
        multiple={false}
        accept="image/*"
        onChange={(e) => handleImage(e)}
      />
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

export default UpdateProfile;
