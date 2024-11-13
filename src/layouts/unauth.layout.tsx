import { Outlet } from "react-router-dom";
import bg from "@/assets/images/unauth/bg-novasix.png";
const UnAuthLayout = () => {
  return (
    <div className="unauth-layout" style={{ backgroundImage: `url(${bg})` }}>
      <Outlet />
    </div>
  );
};

export default UnAuthLayout;
