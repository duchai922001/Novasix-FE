import { Navigate, Outlet } from "react-router-dom";

const PrivateAdminRoute = () => {
  const token = localStorage.getItem("accessToken");
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateAdminRoute;
