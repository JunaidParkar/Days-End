import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import UserPost from "../component/userPost";
import useAuth from "../hooks/useAuth";
import UserPostSkeleton from "../component/userPostSkeleton";
import Preloader from "../component/preloader";
// import useAlert from "../hooks/useAlert";
// import { getAllPostsData } from '../api/request'
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
  // const [hasMore, setHasMore] = useState();
  // const [posts, setPosts] = useState({});
  const [postLoading, setPostLoading] = useState(true);
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.authData);
  const allPostsData = useSelector((state) => state.allPost);

  useEffect(() => {
    if (isLoggedIn) {
      getPosts().then();
    }
  }, [isLoggedIn]);

  console.log(Object.keys(allPostsData.posts).length);

  const getPosts = async () => {
    if (!isLoading) {
      if (allPostsData.hasMore) {
        setPostLoading(true);
        await getAllPost(lastPostId).then((respo) => {
          if (respo.status === 200) {
            if (respo.posts === "no more data") {
              dispatch(storeAllPosts({ hasMore: false }));
            } else {
              let data = {
                posts: { ...allPostsData.posts, ...respo.posts },
                hasMore: true,
                lastId: respo.lastPost,
              };
              dispatch(storeAllPosts(data));
              setlastPostId(respo.lastPost);
            }
          } else {
            showAlert(respo.message, respo.status === 700 ? true : false);
          }
        });
        console.log(`${postLoading} load`);
        setPostLoading(false);
      }
    }
  };

  const scroller = async () => {
    if (allPostsData.hasMore) {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        alert("scrolling");
        await getPosts();
      }
    }
  };

  window.onscroll = scroller;

  return (
    <>
      <div className="homeContainer">
        <Navbar page="house" />
        <div className="flex homeContentContainer">
          {Object.keys(allPostsData.posts).length > 0
            ? Object.keys(allPostsData.posts).map((key) => (
                <UserPost key={key} postDatas={allPostsData.posts[key]} />
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
    </>
  );
  // }
  // }
};

export default Home;
