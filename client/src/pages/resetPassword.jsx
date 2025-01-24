import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { AppContext } from "../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  let [resetEmail, setResetEmail] = useState("");
  let { backenUrl } = useContext(AppContext);
  let [isOtpSent, SetIsOtpSent] = useState(false);
  let [newDetails, setNewDetails] = useState({
    otp: "",
    newPassword: "",
  });
  let navigate = useNavigate();
  let handleResetOtpClick = async () => {
    try {
      let api = await fetch(backenUrl + "/auth/send-reset-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: resetEmail }),
      });
      let data = await api.json();

      if (data.success) {
        SetIsOtpSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  function handleNewChange(e) {
    setNewDetails({
      ...newDetails,
      [e.target.name]: e.target.value,
    });
  }

  let verifyResetOtp = async () => {
    try {
      let api = await fetch(backenUrl + "/auth/verify-reset-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: resetEmail,
          otp: newDetails.otp,
          newPassword: newDetails.newPassword,
        }),
      });
      let data = await api.json();

      if (data.status) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar page={true} />
      <div className="bg-slate-400 px-7 py-14 rounded-xl">
        <div className="flex bg-slate-500 p-3 rounded-full mb-2">
          <img src={assets.mail_icon} className="mr-2" />
          <input
            className="bg-transparent focus:outline-none"
            type="email"
            placeholder="enter your email"
            required
            name="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </div>

        {!isOtpSent && (
          <button
            onClick={handleResetOtpClick}
            className="bg-slate-300 px-4 py-2 rounded-full text-center w-full mb-2"
          >
            send otp
          </button>
        )}
        {isOtpSent && (
          <>
            <div className="flex bg-slate-500 p-3 rounded-full mb-4">
              <img src={assets.mail_icon} className="mr-2" />
              <input
                className="bg-transparent focus:outline-none"
                type="text"
                placeholder="enter otp"
                required
                name="otp"
                onChange={handleNewChange}
                value={newDetails.otp}
              />
            </div>
            <div className="flex bg-slate-500 p-3 rounded-full mb-4">
              <img src={assets.lock_icon} className="mr-2" />
              <input
                className="bg-transparent focus:outline-none"
                type="password"
                placeholder="enter new password"
                required
                name="newPassword"
                onChange={handleNewChange}
                value={newDetails.newPassword}
              />
            </div>
            <button
              onClick={verifyResetOtp}
              className="bg-slate-300 px-4 py-2 rounded-full text-center w-full mb-2"
            >
              update password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
