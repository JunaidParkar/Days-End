import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAlert from "../../hooks/useAlert";
// import { loginUser, signOutUser } from '../../firebaseFunctions/authentication/auth';
import AlertBox from "../../component/alertBox";
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { auth } from "../../cred/cred";
import { useDispatch } from "react-redux";
// import { getMyData } from "../../redux/actions/myDataAction";
// import { loginUserDataInRedux } from "../../redux/actions/userDataAction";
import Preloader from "../../component/preloader";
import { loginUser } from "../../functions/authentication/authentication";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [disableBtn, setDisableBtn] = useState(true);
  const [preloaderShow, setPreloaderShow] = useState(false);

  useEffect(() => {
    const updateBtn = () => {
      if (loginData.email.trim() != "" && loginData.password.trim() != "") {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    };
    updateBtn();
  }, [loginData]);

  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginUserAccount = async (e) => {
    e.preventDefault();
    setPreloaderShow(true);
    if (loginData.email.trim() == "" || loginData.password.trim() == "") {
      showAlert("E-Mail or passwords cannot be invalid", false);
    } else {
      await loginUser(loginData.email.trim(), loginData.password.trim()).then(
        (response) => {
          if (response.status !== 200) {
            showAlert(response.message, false);
          }
        }
      );
    }
    setPreloaderShow(false);
  };

  return (
    <>
      {preloaderShow || isLoading ? <Preloader /> : ""}
      <div className="flexCenter authContainer">
        <form
          method="post"
          className="flex"
          onSubmit={(e) => loginUserAccount(e)}
        >
          <h3>Login</h3>
          <input
            type="text"
            name="email"
            placeholder="Enter your E-Mail"
            onChange={(e) => handleLoginData(e)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => handleLoginData(e)}
            required
          />
          <div className="flex handlers">
            <input type="submit" value="Login" />
            <Link to="/auth/resetPassword">Forgot password??</Link>
          </div>
        </form>
      </div>
      <Link to="/auth/register" className="redirectAuthPage">
        <p>Create account</p>
      </Link>

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

export default Login;
