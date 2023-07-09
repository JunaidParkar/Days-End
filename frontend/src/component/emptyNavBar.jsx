import React, { useEffect, useState } from "react";
import house from "../assets/house.png";
import houseFilled from "../assets/houseFilled.png";
import logoutIcon from "../assets/logout.png";
import { useNavigate } from "react-router-dom";
import { logOut } from "../functions/authentication/authentication";

const EmptyNavbar = (props) => {
  const [status, setStatus] = useState({
    house: false,
    search: false,
    notification: false,
    profile: false,
  });

  useEffect(() => {
    const use = () => {
      setStatus({ [props.page]: true });
    };
    use();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex navContainer">
        <div className="flex navList" style={{ width: "100%" }}>
          <img
            src={house}
            onClick={() => navigate("/")}
            className={status.house ? "displayNone" : ""}
            alt="Home"
          />
          <img
            src={houseFilled}
            className={status.house ? "" : "displayNone"}
            alt="Home"
          />
          <div className="flex logout" onClick={() => logOut()}>
            <img src={logoutIcon} alt="" />
            <p>logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyNavbar;
