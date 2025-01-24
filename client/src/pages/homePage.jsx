import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { AppContext } from "../context/userContext";

const Home = () => {
  let { isUserLoggedin, userData } = useContext(AppContext);
  let data = JSON.parse(localStorage.getItem("data"));
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-300 to-slate-100">
      <Navbar page={true} />
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
        <button className="px-4 py-2 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-blue-100 hover:to-blue-200 shadow-lg rounded-md mt-3">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
