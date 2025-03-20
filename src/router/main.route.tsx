import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/layouts/auth.layout";
import UnAuthLayout from "@/layouts/unauth.layout";
import Login from "@/views/auth/login.view";
import Register from "@/views/auth/register.view";
import Daily from "@/views/daily/daily.view";
import Dashboard from "@/views/dashboard/dashboard.view";
import Monthly from "@/views/monthly/monthly.view";
import Profile from "@/views/profile/profile.view";
import Setting from "@/views/settings/setting.view";
import Store from "@/views/store/store.view";
import Upgrade from "@/views/upgrade/upgrade.view";
import Weekly from "@/views/weekly/weekly.view";
import HomePage from "@/layouts/home.layout";
import Body from "@/views/home/body.view";
import PrivateRoute from "./private.route";
import AboutUs from "@/views/aboutUs/aboutUs.view";
import FAQS from "@/views/FAQS/FAQS.view";
import PoliciesAterms from "@/views/policiesAterms/policiesAterms.view";
import Pomodoro from "../views/pomodoroPage/pomodoroPage.view";
import Wallet from "@/views/wallet/wallet.view";
const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<UnAuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<HomePage />}>
          <Route path="/" element={<Body />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/FAQS" element={<FAQS />} />
          <Route path="/policies" element={<PoliciesAterms />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/weekly" element={<Weekly />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/store" element={<Store />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/wallet" element={<Wallet />} />
          </Route>
        </Route>
        <Route path="/pomodoro/:taskId" element={<Pomodoro />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
