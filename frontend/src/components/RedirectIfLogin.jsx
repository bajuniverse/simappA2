import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectIfLoggedIn = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            switch (storedUser.role) {
                case "Admin":
                case "Mentor":
                default:
                    navigate("/dashboard", { replace: true });
                    break;
            }
        }
    }, [navigate]);

    return children;
};

export default RedirectIfLoggedIn;
