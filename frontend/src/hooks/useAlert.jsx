import { useState } from 'react';

const useAlert = (initialState, alertLog) => {
  const [isAlert, setIsAlert] = useState({
    state: initialState,
    log: alertLog,
    logOut: false
  });

  const showAlert = (log, logoutUser) => {
    setIsAlert({
      state: true,
      log: log,
      logOut: logoutUser
    });
  };

  const closeAlert = () => {
    setIsAlert({
      state: false,
      log: ""
    })
  }

  return [isAlert, showAlert, closeAlert];
};

export default useAlert;