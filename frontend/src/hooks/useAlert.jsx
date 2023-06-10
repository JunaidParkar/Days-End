import { useState } from 'react';

const useAlert = (initialState, alertLog) => {
  const [isAlert, setIsAlert] = useState({
    state: initialState,
    log: alertLog
  });

  const showAlert = (log) => {
    setIsAlert({
      state: true,
      log: log
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