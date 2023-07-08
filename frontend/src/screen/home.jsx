import React, { useEffect, useRef, useState } from "react";
import Navbar from "../component/navbar";
import UserPost from "../component/userPost";
import useAuth from "../hooks/useAuth";
import UserPostSkeleton from "../component/userPostSkeleton";
import Preloader from "../component/preloader";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../api/endPoints";
import AlertBox from "../component/alertBox";
import useAlert from "../hooks/useAlert";
import { reduxStoreHomeAction } from "../redux/actions/homePageAction";
import { reduxStoreAllPostAction } from "../redux/actions/allPostAction";

const Home = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");
  const [loadingNext, setLoadingNext] = useState(false);
  const [postLoading, setPostLoading] = useState(true);

  const dispatch = useDispatch();
  const homeDivRef = useRef();

  const homeData = useSelector((state) => state.home);
  const allPosts = useSelector((state) => state.posts);

  useEffect(() => {
    if (isLoggedIn && user) {
      getPosts().then();
    }
  }, [isLoggedIn, user]);

  const getPosts = async () => {
    if (!isLoading) {
      if (homeData.hasMore) {
        setPostLoading(true);
        await getAllPost(homeData.lastId).then((respo) => {
          if (respo.status === 200) {
            if (respo.message === "finished") {
              dispatch(reduxStoreHomeAction({ hasMore: false }));
            } else {
              dispatch(reduxStoreHomeAction({ lastId: respo.lastPost }));
              dispatch(reduxStoreAllPostAction(respo.posts));
            }
          } else {
            console.log(`home ${respo.message}`);
            showAlert(respo.message, false);
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
    if (allPosts.hasMore) {
      // if (
      //   window.innerHeight <
      //   document.documentElement.scrollTop +
      //     document.documentElement.clientHeight
      // ) {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1
      ) {
        console.log(loadingNext);
        if (!loadingNext) {
          setLoadingNext(true);
        }
        // }
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
            {Object.keys(allPosts).length > 0
              ? Object.keys(allPosts).map((key) => (
                  <UserPost key={key} postDatas={allPosts[key]} />
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

export default Home;
