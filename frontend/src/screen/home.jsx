import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import UserPost from "../component/userPost";
import useAuth from "../hooks/useAuth";
import UserPostSkeleton from "../component/userPostSkeleton";
import Preloader from "../component/preloader";
// import useAlert from "../hooks/useAlert";
// import { getAllPosts } from '../api/request'
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../api/endPoints";
import { storeAllPosts } from "../redux/actions/homePageAction";
import AlertBox from "../component/alertBox";
import useAlert from "../hooks/useAlert";
// import { signOutUser } from '../firebaseFunctions/authentication/auth'

const Home = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");
  const [lastPostId, setlastPostId] = useState("no");
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState({});
  const [postLoading, setPostLoading] = useState(true);
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.authData);
  const allPosts = useSelector((state) => state.allPost);

  useEffect(() => {
    if (isLoggedIn) {
      getPosts().then();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);

  console.log(allPosts);

  // console.log(sele)
  // console.log(posts);
  const getPosts = async () => {
    if (!isLoading) {
      if (hasMore) {
        setPostLoading(true);
        console.log(postLoading, "load");
        console.log(hasMore);
        await getAllPost(lastPostId).then((respo) => {
          console.log(respo, "p");
          if (respo.status === 200) {
            if (respo.posts === "no more data") {
              setHasMore(false);
            } else {
              setPosts((prevPosts) => {
                return { ...prevPosts, ...respo.posts };
              });
              dispatch(storeAllPosts(respo.posts));
              setlastPostId(respo.lastPost);
              setHasMore(true);
            }
          } else {
            showAlert(respo.message, respo.status === 700 ? true : false);
          }
        });
        console.log(`${posts} posts`);
        console.log(`${hasMore} more`);
        console.log(`${postLoading} load`);
        setPostLoading(false);
      }
    }
  };

  const scroller = async () => {
    if (hasMore) {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        await getPosts();
      }
    }
  };

  // if (isLoggedIn) {
  // if (!(document.body.scrollHeight <= window.innerHeight)) {
  window.onscroll = scroller;
  // }
  // }
  // console.log(posts)

  // if (user.loading) {
  //     return <Preloader />
  // }

  // console.log(lastPostId)

  // if (!user.loading) {
  // if (user.error) {
  //     showAlert("Encountering some error please login again")
  //     return (
  //         <>
  //             {isAlert.state ? <AlertBox message={isAlert.log} closeAlert={closeAlert} /> : ""}
  //         </>
  //     )
  // } else {
  // console.log(posts);
  return (
    <>
      <div className="homeContainer">
        <Navbar page="house" />
        <div className="flex homeContentContainer">
          {Object.keys(posts).length > 0
            ? Object.keys(posts).map((key) => (
                <UserPost key={key} postDatas={posts[key]} />
              ))
            : ""}
          {postLoading ? <UserPostSkeleton /> : ""}
          {postLoading ? <UserPostSkeleton /> : ""}
          {postLoading ? <UserPostSkeleton /> : ""}
          {postLoading ? <UserPostSkeleton /> : ""}
          {postLoading ? <UserPostSkeleton /> : ""}
          {postLoading ? <UserPostSkeleton /> : ""}
        </div>
      </div>
      {/* {isAlert.state ? (
        <AlertBox message={isAlert.log} closeAlert={closeAlert} />
      ) : (
        ""
      )} */}
    </>
  );
  // }
  // }
};

export default Home;
