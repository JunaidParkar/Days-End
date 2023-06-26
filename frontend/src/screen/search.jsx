import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import noUser from "../assets/noUser.jpg";
import SearchCard from "../component/searchCard";
import { getAllUsers } from "../api/endPoints";
import useAlert from "../hooks/useAlert";
import AlertBox from "../component/alertBox";
import { useDispatch, useSelector } from "react-redux";
import { storeAllUser } from "../redux/actions/allUsersAction";
import useAuth from "../hooks/useAuth";
import { getBlob, ref } from "firebase/storage";
import { storage } from "../cred/cred";
import SearchCardSkeleton from "../component/searchCardSkeleton";

const Search = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const [isAlert, showAlert, closeAlert] = useAlert(false, "");

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [searchUsers, setSearchUsers] = useState({});

  const dispatch = useDispatch();
  const allSearchUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    fetchAllUsers();
  }, [isLoggedIn]);

  useEffect(() => {
    if (allSearchUsers) {
      setSearchUsers(allSearchUsers);
    }
  }, [allSearchUsers]);

  const fetchAllUsers = async () => {
    setIsLoadingUser(true);
    await getAllUsers().then(async (resp) => {
      if (resp.status === 200) {
        let data = resp.data;
        await Promise.all(
          Object.keys(resp.data).map(async (doc) => {
            // console.log(newData[doc].pic);
            // console.log(doc);
            let oldUrl = resp.data[doc].pic;
            let blob = await getBlob(ref(storage, oldUrl));
            data[doc].pic = URL.createObjectURL(blob);
          })
        );
        dispatch(storeAllUser(data));
      } else {
        showAlert(resp.message, false);
      }
    });
    setIsLoadingUser(false);
  };

  return (
    <>
      <div className="searchContainer">
        <Navbar page="search" />
        <div className="flex searchContentContainer">
          {/* {searchUsers.length > 0
            ? searchUsers.map((user) => (
                <SearchCard key={user.uid} data={user} />
              ))
            : ""} */}
          {Object.keys(searchUsers).length > 0
            ? Object.keys(searchUsers).map((key) => (
                <SearchCard key={key} data={searchUsers[key]} />
              ))
            : ""}
          {isLoadingUser ? <SearchCardSkeleton /> : ""}
          {isLoadingUser ? <SearchCardSkeleton /> : ""}
          {isLoadingUser ? <SearchCardSkeleton /> : ""}
          {isLoadingUser ? <SearchCardSkeleton /> : ""}
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
