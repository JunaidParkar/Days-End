import React from "react";

// import routers

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import screens

import Login from "./screen/authentication/login";
import Register from "./screen/authentication/register";
import ResetPassword from "./screen/authentication/resetPassword";
import Home from "./screen/home";
import Search from "./screen/search";
import Notify from "./screen/notification";
import Profile from "./screen/profile";
import AddPoem from "./screen/addPoem";
import VerifyEmail from "./screen/authentication/verifyEmail";
import PageNotFound from "./screen/pageNotFound";
import UpdateProfile from "./screen/updateProfile";
import Poem from "./screen/poem";
import PoemEditor from "./screen/poemEditor";

// import custom hooks

import useAuth from "./hooks/useAuth";

// import components

import Preloader from "./component/preloader";

// import css

import "./css/authentication.css";
import "./css/navbar.css";
import "./css/home.css";
import "./css/alertBox.css";
import "./css/search.css";
import "./css/profile.css";
import "./css/preloader.css";
import "./css/userPost.css";
import "./css/searchCard.css";
import "./css/addPoem.css";
import "./css/userPostSkeleton.css";
import "./css/updateProfile.css";
import "./css/poem.css";
import "./css/userSkeleton.css";

const App = () => {
  const { user, isLoggedIn, isLoading } = useAuth();

  if (window.innerWidth < 280) {
    return (
      <>
        <div
          className="flexCenter"
          style={{
            height: "100vh",
            flexDirection: "column",
            textTransform: "uppercase",
            fontWeight: 500,
            fontSize: "23px",
          }}
        >
          <p>Use</p>
          <p>other</p>
          <p>device</p>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Preloader />
      </>
    );
  }
  if (isLoggedIn) {
    if (user.displayName == null || user.displayName == "") {
      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UpdateProfile />} />
              <Route path="/auth/login" element={<Navigate to="/" />} />
              <Route path="/auth/register" element={<Navigate to="/" />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    } else {
      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/notification" element={<Notify />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/udateProfile" element={<UpdateProfile />} />
              <Route path="/uploadPost" element={<AddPoem />} />
              <Route path="/post/:postID" element={<Poem />} />
              <Route path="/post/edit/:postId" element={<PoemEditor />} />
              <Route path="/auth/login" element={<Navigate to="/" />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    }
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/resetPassword" element={<ResetPassword />} />
            <Route path="/auth/verifyEmail" element={<VerifyEmail />} />
            <Route path="/post/:postID" element={<Poem />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
};

export default App;
