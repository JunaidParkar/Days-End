import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/cred';

const useAuth = () => {
  const [user, setUser] = useState({
    loggedIn: false,
    loading: true,
    error: false
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currUser => {
        if (currUser) {
            setUser({
                loggedIn: currUser,
                loading: false,
                error: false
            })
        } else {
            setUser({
                loggedIn: false,
                loading: false,
                error: false
            })
        }},

        error => {
            setUser({
                loggedIn: false,
                loading: false,
                error: error
            })
        }
    )

    return () => {
      unsubscribe();
    };
  }, []);

  return [user];
};

export default useAuth;