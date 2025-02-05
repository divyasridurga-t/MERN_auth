import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { AppContext } from "../context/userContext";
import { toast } from "react-toastify";

const Navbar = ({ page }) => {
  let navigate = useNavigate();
  let { pathname = "" } = useLocation();

  let userLoggedIn = JSON.parse(localStorage.getItem("isUserLoggedIn"));
  let [menuOpen, setMenuOpen] = useState(false);
  let { backenUrl, isUserLoggedin, setUserLoggedIn, userData } =
    useContext(AppContext);
  let data = JSON.parse(localStorage.getItem("data"));

  function handleBtnClick() {
    setMenuOpen(!menuOpen);
  }
  let handleLogoutClick = async () => {
    let api = await fetch(backenUrl + "/auth/logout", {
      method: "POST",
    });
    let data = await api.json();

    if (data.success) {
      setUserLoggedIn(false);
      toast.success("Logout successfull !!");
      localStorage.removeItem("data");
      localStorage.setItem("isUserLoggedIn", false);
      window.location.href = "/";
    }
  };

  return (
    <div className="w-full h-20 bg-slate-100 flex justify-between items-center px-3 absolute top-0">
      <Link to={"/"}>
        <img src={assets.logo} className="w-32" />
      </Link>
      {userLoggedIn ? (
        <div>
          <button onClick={handleBtnClick}>
            <div className="w-10 h-10 bg-slate-600 rounded-full flex justify-center items-center text-xl text-white">
              {data ? data.name[0] : ""}
            </div>
          </button>
          {menuOpen ? (
            <div className="absolute right-0 shadow-lg top-20">
              <div
                onClick={handleLogoutClick}
                className="bg-slate-400 px-4 py-2 cursor-pointer"
              >
                Logout
              </div>

              {data.isAccountVerified ? (
                ""
              ) : (
                <div
                  onClick={() => navigate("/email-verify")}
                  className="bg-slate-400 px-4 py-2 cursor-pointer"
                >
                  Verify email
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <>
          {pathname == "/login" ? (
            ""
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="px-4 py-1 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-blue-100 hover:to-blue-200 rounded-lg shadow-lg h-10 flex items-center"
            >
              Login
              <img className="pl-2" src={assets.arrow_icon} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
