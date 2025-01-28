import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/userContext";
import LandingPageComp from "../components/LandingPage";
import ComponentPage from "../components/componentPage";

const Home = () => {
  let userLoggedIn = JSON.parse(localStorage.getItem("isUserLoggedIn"));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-300 to-slate-100">
      <Navbar page={true} />

      {userLoggedIn ? (
        <>
          <ComponentPage />
        </>
      ) : (
        <LandingPageComp />
      )}
    </div>
  );
};

export default Home;
