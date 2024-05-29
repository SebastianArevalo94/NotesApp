import { Navigate } from "react-router-dom";

export const AuthValidation = ({ children }) => {
  let hasToken = localStorage.getItem("token") ? true : false;
  return hasToken ? children : <Navigate to="/login" />;
};
