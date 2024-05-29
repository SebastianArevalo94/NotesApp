import Main from "../components/Main";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const DashboardRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
};

export default DashboardRoutes;