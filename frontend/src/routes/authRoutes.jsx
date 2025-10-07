import { Navigate, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import LandingPage from "../pages/LandingPage";

const authRoutes = [
    <Route key="public" path="/" element={<LandingPage />} />,
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="register" path="/register" element={<Register />} />,
    <Route key="star" path="*" element={<Navigate to="/" replace />} />,
];

export default authRoutes;
