import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/Auth/Login";
import RedirectIfLoggedIn from "../components/RedirectIfLogin";

const landingRoutes = (
  <>
    <Route 
        path="/" 
        element={
            <RedirectIfLoggedIn>
                <LandingPage />
            </RedirectIfLoggedIn>
        } 
    />
    <Route path="/login" element={<LoginPage />} />
  </>
);

export default landingRoutes;
