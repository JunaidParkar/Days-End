import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../../component/alertBox";
import useAlert from "../../hooks/useAlert";
// import { resetPassword } from '../../firebaseFunctions/authentication/auth';

const ResetPassword = () => {
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");
  const [passwordResetData, setPasswordResetData] = useState({
    email: "",
  });
  const [disableBtn, setDisableBtn] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const updateBtn = () => {
      if (passwordResetData.email.trim() != "") {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    };
    updateBtn();
  }, [passwordResetData]);

  const resetPasswordmail = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    setLoader(true);
    if (passwordResetData.email.trim() === "") {
      showAlert("E-Mail cannot be empty");
    } else {
      // await resetPassword(passwordResetData.email).then(resp => {
      //     showAlert(resp.message)
      // }).catch(error => {
      //     showAlert(error)
      // })
    }
    setLoader(false);
    setDisableBtn(false);
  };

  return (
    <>
      <div className="flexCenter authContainer">
        <form
          method="post"
          className="flex"
          onSubmit={(e) => resetPasswordmail(e)}
        >
          <h3>Reset your password</h3>
          <input
            type="text"
            name="email"
            placeholder="Enter your E-Mail"
            onChange={(e) =>
              setPasswordResetData({
                ...passwordResetData,
                ["email"]: e.target.value,
              })
            }
            required
          />
          <div className="flex handlers">
            <input type="submit" disabled={disableBtn} value="submit" />
          </div>
        </form>
      </div>
      <Link to="/auth/login" className={loader ? "none" : "redirectAuthPage"}>
        <p>login</p>
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

export default ResetPassword;
