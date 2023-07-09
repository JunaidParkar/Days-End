import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../cred/cred";
import { logOut } from "../functions/authentication/authentication";
import { getAuthToken } from "../api/endPoints";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
                await logOut("useAuth line 26");
              } else {
                localStorage.setItem("uid", currUser.uid);
                setUser(currUser);
                setIsLoggedIn(true);
              }
            })
            .catch(async (err) => {
              setUser(null);
              setIsLoggedIn(false);
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

  return { user, isLoggedIn, isLoading };
};

export default useAuth;
