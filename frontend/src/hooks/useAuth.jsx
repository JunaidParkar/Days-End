import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../cred/cred";
import { logOut } from "../functions/authentication/authentication";
import { getAuthToken, registerUserStructure } from "../api/endPoints";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      if (currUser) {
        if (localStorage.getItem("authToken")) {
          setUser(currUser);
          setIsLoggedIn(true);
        } else {
          await getAuthToken({ email: currUser.email, uid: currUser.uid })
            .then(async (response) => {
              if (response.status !== 200) {
                setUser(null);
                setIsLoggedIn(false);
                setAuthError(response.message);
                await logOut("useAuth line 26");
              } else {
                localStorage.setItem("uid", currUser.uid);
                let data = {
                  uid: currUser.uid,
                  email: currUser.email,
                };
                currUser.photoURL ? (data.pic = currUser.photoURL) : "";
                await registerUserStructure(data);
                setUser(currUser);
                setIsLoggedIn(true);
              }
              console.warn(response);
            })
            .catch(async (err) => {
              setUser(null);
              setIsLoggedIn(false);
              console.log(err);
              await logOut("useAuth line 35");
            });
        }
      } else {
        localStorage.clear();
        setUser(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, isLoggedIn, isLoading, authError };
};

export default useAuth;
