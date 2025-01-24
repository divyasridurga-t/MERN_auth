import React, { useState } from "react";
import { toast } from "react-toastify";
export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  let backenUrl = "http://localhost:3000";
  let [isUserLoggedin, setUserLoggedIn] = useState(false);
  let [userData, setUserData] = useState(null);

  let getUserdata = async () => {
    try {
      let data = await fetch(backenUrl + "/user/data", {
        method: "GET",
        credentials: "include",
      });
      let res = await data.json();

      if (res.success) {

        setUserData(res.userInfo);
        localStorage.setItem("data", JSON.stringify(res.userInfo));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    backenUrl,
    isUserLoggedin,
    setUserLoggedIn,
    userData,
    setUserData,
    getUserdata,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
