import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const LandingPageComp = () => {
  let navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem("data"));
  let userLoggedIn = JSON.parse(localStorage.getItem("isUserLoggedIn"));
  function handleUserClick() {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src={assets.header_img}
          className="w-[300px] h-[350px] mb-6 rounded-full"
        />
        <h1 className="flex text-2xl font-bold">
          Hey {`${data ? data.name : "Developer"} `} !!!{" "}
          <img width={35} src={assets.hand_wave} />{" "}
        </h1>
        <h2 className="font-xl font-semibold">Welcome to MERN auth</h2>
        <button
          onClick={handleUserClick}
          className="px-4 py-2 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-blue-100 hover:to-blue-200 shadow-lg rounded-md mt-3"
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default LandingPageComp;
