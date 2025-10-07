import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";

const landingRoutes = (
  <>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
  </>
);

export default landingRoutes;
