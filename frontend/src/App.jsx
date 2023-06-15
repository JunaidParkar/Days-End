import React, { useEffect } from 'react';

// import routers 

import { BrowserRouter , Navigate, Route, Routes } from 'react-router-dom';

// import redux 

import { useDispatch, useSelector } from 'react-redux';

// import screens

import Login from './screen/authentication/login';
import Register from './screen/authentication/register';
import ResetPassword from './screen/authentication/resetPassword';
import Home from './screen/home';
import Search from './screen/search';
import Notify from './screen/notification';
import Profile from './screen/profile';
import AddPoem from './screen/addPoem';
import VerifyEmail from './screen/authentication/verifyEmail';
import PageNotFound from './screen/pageNotFound';
import UpdateProfile from './screen/updateProfile';

// import custom hooks 

import useAuth from './hooks/useAuth';
import useAlert from './hooks/useAlert';

// import components 

import Preloader from './component/preloader';
import AlertBox from './component/alertBox';

// import css 

import "./css/authentication.css"
import "./css/navbar.css"
import "./css/home.css"
import "./css/alertBox.css"
import "./css/search.css"
import "./css/profile.css"
import "./css/preloader.css"
import "./css/userPost.css"
import "./css/searchCard.css"
import "./css/addPoem.css"
import "./css/userPostSkeleton.css"
import "./css/updateProfile.css"

const App = () => {

  const { user, isLoggedIn, isEmailVerified, isLoading } = useAuth();

  console.log(user)

  // if (user === null) {
  //   return (
  //     <>
  //       <BrowserRouter>
  //         <Routes>
            
  //         </Routes>
  //       </BrowserRouter>
  //     </>
  //   )
  // }

  if (isLoading) {
    return (
      <>
        <Preloader />
      </>
    )
  } else {
    if (user === null) {
      return (
        <>
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/resetPassword" element={<ResetPassword />} />
            <Route path="/auth/verifyEmail" element={<VerifyEmail />} />
            <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </>
      )
    } else {
      if (user) {
        if (user.displayName == null || user.displayName == "") {
          return (
            <>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<UpdateProfile />} />
                  <Route path="/*" element={<PageNotFound />} />
                </Routes>
              </BrowserRouter>
            </>
          )
        } else {
          return (
            <>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/notification' element={<Notify />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/udateProfile' element={<UpdateProfile />} />
                  <Route path="/*" element={<PageNotFound />} />
                </Routes>
              </BrowserRouter>
            </>
          )
        }
      }
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/notification' element={<Notify />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    }
  }

  // document.addEventListener('contextmenu', (e) => {
  //   e.preventDefault();
  // });
  
  // document.addEventListener('keydown', (e) => {
  //   if (e.keyCode === 123) {
  //     e.preventDefault();
  //   }
  // });
  
  // if (!isLoading) {
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={isLoading ? <Loader /> : isEmailVerified ? <UserDashboard /> : <Login />} />
  //         <Route path='/resetPassword' element={isLoading ? <Loader /> : <ResetPassword />} />
  //         {/* <Route path='/url/:urlID' element={<UrlRedirect />} /> */}
  //         <Route path='/*' element={<PageNotFound />} />
  //       </Routes>
  //     </BrowserRouter>
  //   );
  // }
}

export default App;