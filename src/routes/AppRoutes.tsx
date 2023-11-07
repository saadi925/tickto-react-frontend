import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/app" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/app" />} />
    </Routes>
  );
};
