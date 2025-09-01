import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Survey from "../pages/Survey";
import PrivateRoute from "./PrivateRoute";
import Userpage from "../pages/Userpage";
import MoodPage from "../pages/MoodPage";
import DailyTipsPage from "../pages/DailyTipsPage";
import CalmingMusic from "../pages/CalmingMusic";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/survey" element={<Survey />} />

      {/* PrivateRoute and nested routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/userpage" element={<Userpage />}>
          <Route index element={<div></div>} />
          <Route path="mood" element={<MoodPage />} />
          <Route path="dailytips" element={<DailyTipsPage />} />
          <Route path="calmingmusic" element={<CalmingMusic />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default RouterConfig;
