import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Userpage from "../pages/Userpage";
import Survey from "../pages/Survey";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/userpage" element={<Userpage />} />
      <Route path="/survey" element={<Survey />} />
    </Routes>
  );
}

export default RouterConfig;
