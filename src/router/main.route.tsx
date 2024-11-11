import UnAuthLayout from "@/layouts/unauth.layout";
import Login from "@/views/auth/login.view";
import Register from "@/views/auth/register.view";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<UnAuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
