import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  let [state, setState] = useState("Sign Up");
  let [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Navbar page={"login"} />
      <div className="flex flex-col items-center bg-slate-400 px-7 py-14 rounded-xl">
        <h1 className="text-2xl font-semibold mb-2">{state}</h1>
        <div className="mb-3">{`${
          state === "Sign Up" ? "Create your account" : "Login to your account"
        }`}</div>
        <form>
          <div>
            {state == "Sign Up" && (
              <div className="flex bg-slate-500 p-3 rounded-full mb-4">
                <img src={assets.person_icon} className="mr-2" />
                <input
                  className="bg-transparent focus:outline-none"
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="flex bg-slate-500 p-3 rounded-full mb-4">
              <img src={assets.mail_icon} className="mr-2" />
              <input
                className="bg-transparent focus:outline-none"
                type="email"
                placeholder="Email"
                required
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex bg-slate-500 p-3 rounded-full mb-4">
              <img src={assets.lock_icon} className="mr-2" />
              <input
                className="bg-transparent focus:outline-none"
                type="password"
                placeholder="Password"
                required
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {state != "Sign Up" && (
            <p onClick={()=>navigate('/reset-password')} className="mb-3 text-xs text-indigo-900 cursor-pointer">
              Forgot your password ?
            </p>
          )}
          <button className="bg-slate-300 px-4 py-2 rounded-full text-center w-full mb-2">
            {state}
          </button>
          {state == "Sign Up" ? (
            <p className="text-sm text-center">
              already have an account ?{" "}
              <span
                className="cursor-pointer text-indigo-900"
                onClick={() => {
                  setState("Login");
                }}
              >
                login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-center">
              don't have an account ?{" "}
              <span
                className="cursor-pointer text-indigo-900"
                onClick={() => {
                  setState("Sign Up");
                }}
              >
                sign up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
