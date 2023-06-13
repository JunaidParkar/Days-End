import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseFunctions/cred';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const [user, setUser] = useState({
    loggedIn: false,
    loading: false,
    error: null
  });
  // const [user, setUser] = useState(null)
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currUser => {
      console.log(currUser)
      if (currUser) {
        setUser({
          loggedIn: currUser,
          loading: false,
          error: null
        });
      } else {
        setUser({
          loggedIn: false,
          loading: false,
          error: null
        });
      }
    }, error => {
      setUser({
        loggedIn: false,
        loading: false,
        error: error.message
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const unsubscribe = () => {
  //     let data = useSelector(state => state.myData)
  //     console.log(data)
  //     setUser(data)
  //   }
  //   // return () => {
  //     unsubscribe()
  //   // }
  // }, [])
  

  return [user];
};

export default useAuth;
