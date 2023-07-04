import React, { useEffect, useRef, useState } from "react";
import Navbar from "../component/navbar";
import UserPost from "../component/userPost";
import useAuth from "../hooks/useAuth";
import UserPostSkeleton from "../component/userPostSkeleton";
import Preloader from "../component/preloader";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../api/endPoints";
import { storeAllPosts } from "../redux/actions/homePageAction";
import AlertBox from "../component/alertBox";
import useAlert from "../hooks/useAlert";

const Home = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");
  const [lastPostId, setlastPostId] = useState("no");
  const [loadingNext, setLoadingNext] = useState(false);
  const [postLoading, setPostLoading] = useState(true);
  const dispatch = useDispatch();
  const homeDivRef = useRef();
  const allPostsData = useSelector((state) => state.allPost);

  useEffect(() => {
    if (isLoggedIn && user) {
      getPosts().then();
    }
  }, [isLoggedIn, user]);

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
                likes: { ...allPostsData.likes, ...respo.likes },
              };
              dispatch(storeAllPosts(data));
              setlastPostId(respo.lastPost);
            }
          } else {
            showAlert(respo.message, respo.status === 700 ? true : false);
          }
        });
        setPostLoading(false);
      }
    }
  };

  useEffect(() => {
    const next = async () => {
      if (loadingNext) {
        await getPosts();
      }
    };
    next();
    return () => {
      next();
    };
  }, [loadingNext]);

  const scroller = async () => {
    if (allPostsData.hasMore) {
      if (
        window.innerHeight <
        document.documentElement.scrollTop +
          document.documentElement.clientHeight
      ) {
        if (
          document.documentElement.scrollTop +
            document.documentElement.clientHeight >=
          document.documentElement.scrollHeight - 1
        ) {
          console.log(loadingNext);
          if (!loadingNext) {
            setLoadingNext(true);
          }
        }
      }
    }
  };

  const handleScroll = () => {
    requestAnimationFrame(() => {
      scroller();
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="homeContainer">
          <Navbar page="house" />
          <div className="flex homeContentContainer">
            {Object.keys(allPostsData.posts).length > 0
              ? Object.keys(allPostsData.posts).map((key) => (
                  <UserPost
                    key={key}
                    postDatas={allPostsData.posts[key]}
                    likes={allPostsData.likes}
                  />
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
      )}

      {isAlert.state ? (
        <AlertBox message={isAlert.log} closeAlert={closeAlert} />
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
