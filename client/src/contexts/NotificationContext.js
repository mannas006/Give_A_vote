import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify"; // Correctly import ToastContainer
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notify = (message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer /> 
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
