import { Navigate, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";

const authRoutes = [
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="register" path="/register" element={<Register />} />,
    <Route key="dashboard" path="/dashboard" element={<AdminDashboard />} />,
    <Route key="star" path="*" element={<Navigate to="/" replace />} />,
];

export default authRoutes;
