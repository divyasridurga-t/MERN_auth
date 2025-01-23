import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/homePage";
import Login from "./pages/login";
import EmailVerify from "./pages/emailVerify";
import ResetPassword from "./pages/resetPassword";
import { ToastContainer} from 'react-toastify'

function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/email-verify" element={<EmailVerify />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
