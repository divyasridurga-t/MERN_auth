import React, { useState } from "react";
export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
    let backenUrl='http://localhost:3000/';
    let [isUserLoggedin, setUserLoggedIn]= useState(false)
    const value = {
        backenUrl
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

