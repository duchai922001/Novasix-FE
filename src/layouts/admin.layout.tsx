import { Col, Row } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/images/auth/logo-zendo.png";
import { RiDashboardFill } from "react-icons/ri";
import { GiTomato } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { HiMiniBellAlert } from "react-icons/hi2";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/localstorage";
import { IUserData } from "@/types/user.interface";
import { PomodoroService } from "@/services/pomodoro.service";
import { MdOutlineManageAccounts } from "react-icons/md";

interface MenuItem {
  key: string;
  title: string;
  icon: React.ReactNode;
  url?: string;
}
const AdminLayout = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<string | null>("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    name: "username",
  });
  const [pomodoroUser, setPomodoroUser] = useState({
    pomodoroTimer: 0,
    breakTimer: 0,
  });
  const asyncDataPomodoroUser = async () => {
    try {
      const response = await PomodoroService.getPomodoroOfUser();
      setPomodoroUser(response);
    } catch {
      console.log("");
    }
  };
  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setActiveIndex(currentPath || "dashboard");
  }, [location.pathname]);
  useEffect(() => {
    asyncDataPomodoroUser();
    const user = getLocalStorage("user");
    setUserData(user);
  }, []);
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };
  const listMenu: MenuItem[] = [
    {
      key: "dashboard",
      title: "Dashboard",
      icon: <RiDashboardFill />,
      url: "/dashboard",
    },
    {
      key: "pomodoro",
      title: "Pomodoro",
      icon: <GiTomato />,
      url: "/manage_pomodoro",
    },
    {
      key: "account",
      title: "Account",
      icon: <MdOutlineManageAccounts />,
      url: "/manage_pomodoro",
    },
    {
      key: "profile",
      title: "Profile",
      icon: <CgProfile />,
      url: "/profile",
    },
    {
      key: "settings",
      title: "Settings",
      icon: <IoSettings />,
      url: "/settings",
    },
    {
      key: "logout",
      title: "Logout",
      icon: <TbLogout />,
      url: "/login",
    },
  ];
  const renderItemChildMenu = (item: MenuItem) => {
    const isActive = activeIndex === item.key;

    return (
      <Col span={24} key={item.key}>
        <Row
          className={"menu-child-item"}
          style={{
            background: isActive ? "white" : "none",
            boxShadow: isActive ? "0px 0px 10px #888888" : "none",
          }}
          onClick={() => {
            if (item.key === "logout") {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("user");
            }

            setActiveIndex(item.key);
            navigate(`${item.url}`);
          }}
        >
          <Col span={5}>
            {React.cloneElement(item.icon as React.ReactElement, {
              className: `menu-child-item-icon ${
                isActive ? "active-icon" : ""
              }`,
            })}
          </Col>
          <Col
            span={19}
            className={`menu-child-item-text ${isActive ? "active-text" : ""}`}
          >
            {item.title}
          </Col>
        </Row>
      </Col>
    );
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "b") {
        event.preventDefault();
        setIsCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const renderIconMenu = (item: MenuItem) => {
    const isActive = activeIndex === item.key;
    return (
      <Col
        span={24}
        style={{
          background: isActive ? "white" : "none",
          boxShadow: isActive ? "0px 0px 10px #888888" : "none",
        }}
        onClick={() => {
          setActiveIndex(item.key);
          navigate(`${item.url}`);
        }}
        className="icon-menu"
      >
        {React.cloneElement(item.icon as React.ReactElement, {
          className: `icon-collapsed ${isActive ? "active-icon" : ""}`,
        })}
      </Col>
    );
  };
  return (
    <Row className="container-auth">
      <Col
        span={isCollapsed ? 1 : 4}
        className={`col-left-auth ${isCollapsed ? "collapsed" : ""}`}
      >
        {/* Logo */}
        <Row className="header" onClick={toggleSidebar}>
          <img
            src={logo}
            alt="NovaSix Logo"
            className={`logo-auth ${isCollapsed ? "collapsed-logo" : ""}`}
          />
        </Row>

        {/* Menu Items */}
        {!isCollapsed ? (
          <>
            <Row style={{ marginTop: "20px" }}>
              {listMenu.map((item) => renderItemChildMenu(item))}
            </Row>
          </>
        ) : (
          <>
            {" "}
            <Row style={{ marginTop: "20px" }}>
              {listMenu.map((item) => renderIconMenu(item))}
            </Row>
          </>
        )}
      </Col>
      <Col span={isCollapsed ? 23 : 20} className="col-right-auth">
        <Row className="header-auth" gutter={[12, 12]}>
          {activeIndex === "daily" && (
            <div className="header-auth-pomodoro">
              <span className="pomodoro">
                <GiTomato />
              </span>
              <span className="time">
                {pomodoroUser.pomodoroTimer} - {pomodoroUser.breakTimer} minutes
              </span>
            </div>
          )}

          <div className="header-auth-info">
            <Col className="col-left-header-auth">
              <MdAccountCircle className="icon-header-auth" />
              <span>{userData.name}</span>
            </Col>
            <Col className="col-right-header-auth">
              <AiOutlineGlobal className="icon-header-auth" />
              <HiMiniBellAlert className="icon-header-auth" />
            </Col>
          </div>
        </Row>
        <Row className="content-auth">
          <Outlet />
        </Row>
      </Col>
    </Row>
  );
};

export default AdminLayout;
