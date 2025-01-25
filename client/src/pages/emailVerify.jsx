import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/userContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  let { backenUrl , userData, getUserdata} = useContext(AppContext);
  let [otp, setOtp] = useState("");
  let navigate= useNavigate()


  useEffect(() => {
    (async function () {
      try {
        let api = await fetch(backenUrl + "/auth/send-verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        let data = await api.json();
        if (data.status) {
          toast.success(data.message);
          getUserdata()
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);
  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let api = await fetch(backenUrl + "/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          otp: otp,
        }),
      });
      let data = await api.json();
      if (data.status) {
        toast.success(data.message);
        navigate("/")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message, "???");

      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <div className="bg-slate-400 px-7 py-14 rounded-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex bg-slate-500 p-3 rounded-full mb-4">
            <img src={assets.mail_icon} className="mr-2" />
            <input
              className="bg-transparent focus:outline-none"
              type="text"
              placeholder="enter otp"
              required
              name="otp"
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              value={otp}
            />
          </div>
          <button className="bg-slate-300 px-4 py-2 rounded-full text-center w-full mb-2">
            verify otp
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
