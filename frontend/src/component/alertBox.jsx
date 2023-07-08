import React from "react";

const AlertBox = ({ message, closeAlert, logout }) => {
  const handleLogout = async () => {
    if (logout == true) {
      closeAlert();
      await logout(message);
    } else {
      closeAlert();
    }
  };
  return (
    <>
      <div className="flexCenter alertBoxContainer">
        <div className="mainContainer">
          <h3>alert</h3>
          <p>{message}</p>
          <div className="flex backContainer">
            <p onClick={() => handleLogout()}>close</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertBox;
