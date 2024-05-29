import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import { AuthValidation } from "./validations/AuthValidation";
import DashboardRoutes from "./DashboardRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <AuthValidation>
              <DashboardRoutes />
            </AuthValidation>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
