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

const Profile = () => {
  const [myData, setMyData] = useState();
  const [loader, setLoader] = useState(true);

  const { user, isLoggedIn, isLoading } = useAuth();
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");

  useEffect(() => {
    fetchAllMyDatas();
  }, []);

  const imageSetter = async (data) => {
    let picRef = ref(storage, data.pic);
    let blob = await getBlob(picRef);
    return URL.createObjectURL(blob);
  };

  const fetchAllMyDatas = async () => {
    setLoader(true);
    await getAllOfMyDatas().then(async (response) => {
      if (response.status === 200) {
        let datas = response.data;
        let pic = await imageSetter(datas);
        setMyData({ ...datas, ["pic"]: pic });
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
              <img src={myData ? myData.pic : noUser} alt="Profile Picture" />
              <div className="flex interaction">
                <h4>{myData ? myData.handle : ""}</h4>
                <div className="flex stats">
                  <div className="statCont">
                    <p className="statValue">{myData ? myData.posts : ""}</p>
                    <p className="statName">Posts</p>
                  </div>
                  <div className="statCont">
                    <p className="statValue">
                      {myData ? myData.followers : ""}
                    </p>
                    <p className="statName">Followers</p>
                  </div>
                  <div className="statCont">
                    <p className="statValue">
                      {myData ? myData.following : ""}
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
              <p>{myData ? myData.bio : ""}</p>
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
            {myData &&
              Object.keys(myData.myPosts).map((postId) => (
                <UserPost key={postId} postDatas={myData.myPosts[postId]} />
              ))}
          </div>
        </div>
      </div>
      {isAlert.state && (
        <AlertBox message={isAlert.log.toString()} closeAlert={closeAlert} />
      )}
    </>
  );
};

export default Profile;
