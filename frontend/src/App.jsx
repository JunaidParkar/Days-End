import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageNotFound from './screen/pageNotFound'
import Login from './screen/authentication/login';
import Register from './screen/authentication/register';
import ResetPassword from './screen/authentication/forgotPassword';
import Home from './screen/home';
import Search from './screen/search';
import Notify from './screen/notification';
import Profile from './screen/profile';
import AddPoem from './screen/addPoem';
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

const App = () => {


  if (window.innerWidth < 300) {
    alert("Not supported with device of this size")
    return (
      <>
        <div className='flexCenter' style={{width: '100vw', height: '100vh', flexDirection: 'column'}}>
          <h1>Use</h1>
          <h1>other</h1>
          <h1>device</h1>
        </div>
      </>
    )
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
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addPoem" element={<AddPoem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    );
  // }
}
  
export default App
