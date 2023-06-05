import { useState } from 'react';

const useAlert = (initialState) => {
  const [isAlert, setIsAlert] = useState(initialState);
  const [alertLog, setAlertLog] = useState('');

  const toggleAlert = (alert) => {
    setIsAlert(alert);
  };

  const addAlertLog = (msg) => {
    setAlertLog(msg);
  };

  return [isAlert, toggleAlert, alertLog, addAlertLog];
};

export default useAlert;