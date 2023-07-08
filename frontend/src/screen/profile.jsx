import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import noUser from "../assets/noUser.jpg";
import UserPost from "../component/userPost";
import { useNavigate } from "react-router-dom";
import { getAllOfMyDatas } from "../api/endPoints";
import useAlert from "../hooks/useAlert";
import AlertBox from "../component/alertBox";
import { getBlob, ref } from "firebase/storage";
import { storage } from "../cred/cred";
import Preloader from "../component/preloader";
import useAuth from "../hooks/useAuth";
import { sendEmailVerification } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { reduxStoreAllPostAction } from "../redux/actions/allPostAction";
import { reduxStoreMyProfileAction } from "../redux/actions/myProfileAction";

const Profile = () => {
  const [loader, setLoader] = useState(true);
  const [myPost, setMyPost] = useState({});

  const { user, isLoggedIn, isLoading } = useAuth();
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");

  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.myProfile);
  const allPosts = useSelector((state) => state.posts);

  // useEffect(() => {
  //   fetchAllmyProfiles();
  // }, [user]);

  useEffect(() => {
    let myPostFiltered = {};
    Object.keys(allPosts).forEach((key) => {
      if (allPosts[key]["uid"] == user.uid) {
        myPostFiltered[key] = allPosts[key];
      }
    });
    if (Object.keys(myPostFiltered).length != myProfile["posts"]) {
      fetchAllmyProfiles();
    } else {
      setMyPost({ ...myPostFiltered });
    }
    let myPostsAvailable = allPosts;
  }, [allPosts]);

  const imageSetter = async (data) => {
    let picRef = ref(storage, data.pic);
    let blob = await getBlob(picRef);
    return URL.createObjectURL(blob);
  };

  const fetchAllmyProfiles = async () => {
    setLoader(true);
    await getAllOfMyDatas().then(async (response) => {
      if (response.status === 200) {
        let datas = response.data;
        let myPosts = response.post;
        let dataPic = await imageSetter(datas);
        let updatedData = { ...datas, ["pic"]: dataPic };
        dispatch(reduxStoreMyProfileAction(updatedData));
        dispatch(reduxStoreAllPostAction({ ...allPosts, ...myPosts }));
      } else {
        showAlert(response.message, false);
      }
      // };
    });
    setLoader(false);
  };

  const sendVerification = async () => {
    await sendEmailVerification(user)
      .then(() => {
        showAlert(
          "Verify your E-Mail first... Link has been sent to your inbox... If already verified then just refresh the page..."
        );
      })
      .catch((err) => {
        showAlert(err, false);
      });
  };
  console.log(user);

  const navigate = useNavigate();
  return (
    <>
      {loader ? <Preloader /> : ""}

      <div className="profileContainer">
        <Navbar page="profile" />
        <div className="profileContentContainer">
          <div className="myProfileHeader">
            <div className="flex myProfileHeaderInteractionCenter">
              <img
                src={myProfile ? myProfile["pic"] : noUser}
                alt="Profile Picture"
              />
              <div className="flex interaction">
                <h4>{myProfile ? myProfile["handle"] : ""}</h4>
                <div className="flex stats">
                  <div className="statCont">
                    <p className="statValue">
                      {myProfile ? myProfile["posts"] : ""}
                    </p>
                    <p className="statName">Posts</p>
                  </div>
                  <div className="statCont">
                    <p className="statValue">
                      {myProfile ? myProfile["followers"] : ""}
                    </p>
                    <p className="statName">Followers</p>
                  </div>
                  <div className="statCont">
                    <p className="statValue">
                      {myProfile ? myProfile["following"] : ""}
                    </p>
                    <p className="statName">Following</p>
                  </div>
                </div>
                <div className="flex interactionBtns">
                  <div
                    className="editProfile"
                    onClick={() => navigate("/udateProfile")}
                  >
                    <p>Edit profile</p>
                  </div>
                  <div
                    className="addPoem editProfile"
                    onClick={() =>
                      user.emailVerified
                        ? navigate("/uploadPost")
                        : sendVerification().then()
                    }
                  >
                    <p>Add Poem</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="myBio">
              <p>{myProfile ? myProfile["bio"] : ""}</p>
            </div>
          </div>

          <div className="flex postsContainer">
            {/* <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
          <UserPost /> */}
            {myProfile &&
              Object.keys(myPost).map((postId) => (
                <UserPost key={postId} postDatas={myPost[postId]} />
              ))}
          </div>
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

export default Profile;
