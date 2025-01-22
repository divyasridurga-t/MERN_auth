import { assets } from "../assets/assets";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ page }) => {
  let navigate = useNavigate();
  return (
    <div className="w-full h-20 bg-slate-100 flex justify-between items-center px-3 absolute top-0">
      <Link to={'/'}>
        <img src={assets.logo} className="w-32" />
      </Link>
      {page == "login" ? (
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
    </div>
  );
};

export default Navbar;
