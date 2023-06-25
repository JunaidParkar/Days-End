import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import noUser from "../assets/noUser.jpg";
import SearchCard from "../component/searchCard";
import { getAllUsers } from "../api/endPoints";
import useAlert from "../hooks/useAlert";
import AlertBox from "../component/alertBox";

const Search = () => {
  const [searchUsers, setSearchUsers] = useState([]);
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers) {
      setSearchUsers((prev) => [...prev, allUsers]);
    }
    console.log(allUsers);
  }, [allUsers]);

  const fetchAllUsers = async () => {
    await getAllUsers().then((resp) => {
      if (resp.status === 200) {
        let users = [...resp.data];
        let updatedUsers = users.filter(
          (user) => user.uid !== localStorage.getItem("uid")
        );
        setSearchUsers(updatedUsers);
      } else {
        showAlert(resp.message, false);
      }
    });
  };

  console.log(searchUsers);

  return (
    <>
      <div className="searchContainer">
        <Navbar page="search" />
        <div className="flex searchContentContainer">
          {searchUsers.length > 0
            ? searchUsers.map((user) => (
                <SearchCard key={user.uid} data={user} />
              ))
            : ""}
        </div>
      </div>
      {isAlert.state ? (
        <AlertBox message={isAlert.log} closeAlert={closeAlert} />
      ) : (
        ""
      )}
    </>
  );
};

export default Search;
