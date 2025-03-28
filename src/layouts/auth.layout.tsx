import { Avatar, Badge, Col, Dropdown, Menu, Row } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/images/auth/logo-zendo.png";
import { RiDashboardFill } from "react-icons/ri";
import { CiCloudSun } from "react-icons/ci";
import { FaRegCalendarCheck, FaTasks, FaWallet } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaStore } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { AiOutlineGlobal } from "react-icons/ai";
import { HiMiniBellAlert } from "react-icons/hi2";
import { GiTomato } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import { IUserData } from "@/types/user.interface";
import { PomodoroService } from "@/services/pomodoro.service";
import { UserPackageService } from "@/services/user-package.service";
import { handleError } from "@/utils/catch-error";
import { UserService } from "@/services/user.service";
import { AuthService } from "@/services/auth.service";
import { io } from "socket.io-client";
import { NotificationService } from "@/services/notification.service";
import dayjs from "dayjs";

const socket = io("https://novasix-be.onrender.com");
interface MenuItem {
  key: string;
  title: string;
  icon: React.ReactNode;
  url?: string;
}
const AuthLayout = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState<string | null>("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    name: "username",
  });
  const [userPacakge, setUserPackage] = useState([]);
  const [filterMenu, setFilterMenu] = useState([]);
  const listMenu: MenuItem[] = [
    {
      key: "dashboard",
      title: "Dashboard",
      icon: <RiDashboardFill />,
      url: "/dashboard",
    },
    {
      key: "daily",
      title: "Daily",
      icon: <CiCloudSun />,
      url: "/daily",
    },
    {
      key: "weekly",
      title: "Weekly",
      icon: <FaRegCalendarCheck />,
      url: "/weekly",
    },
    {
      key: "monthly",
      title: "Monthly",
      icon: <IoCalendarNumber />,
      url: "/monthly",
    },
    {
      key: "profile",
      title: "Profile",
      icon: <CgProfile />,
      url: "/profile",
    },
    {
      key: "store",
      title: "Store",
      icon: <FaStore />,
      url: "/store",
    },
    {
      key: "settings",
      title: "Settings",
      icon: <IoSettings />,
      url: "/settings",
    },
    {
      key: "wallet",
      title: "Wallet",
      icon: <FaWallet />,
      url: "/wallet",
    },
    {
      key: "mission",
      title: "Missions",
      icon: <FaTasks />,
      url: "/mission",
    },
    {
      key: "logout",
      title: "Logout",
      icon: <TbLogout />,
      url: "/login",
    },
  ];
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
  const asyncUserPackage = async () => {
    try {
      const response = await UserPackageService.getPackagesUser();
      // const mappedUserPackage = response.map(
      //   (item) => item.packageId.typePackage
      // );
      response.push(
        "daily",
        "profile",
        "store",
        "settings",
        "wallet",
        "mission",
        "logout"
      );
      setUserPackage(response);
      const filterMenuData = listMenu.filter((item) =>
        response.includes(item.key)
      );
      setFilterMenu(filterMenuData);
    } catch (error) {
      handleError(error);
    }
  };
  const asyncUserCurrent = async () => {
    try {
      const response = await UserService.getUserCurrent();
      setUserData(response);
    } catch (error) {
      handleError(error);
    }
  };
  const fetchNotifications = async () => {
    try {
      const response = await NotificationService.getNotification();
      setNotifications(response.notifications);
      setUnreadCount(response.unreadCount);
    } catch (error) {
      handleError(error);
    }
  };
  const markAllAsRead = async () => {
    try {
      await NotificationService.markNotification();
      setUnreadCount(0);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchNotifications();
    socket.on("newNotification", (data) => {
      setNotifications((prev) => [{ message: data.message }, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setActiveIndex(currentPath || "dashboard");
  }, [location.pathname]);
  useEffect(() => {
    asyncDataPomodoroUser();
    asyncUserCurrent();
    asyncUserPackage();
  }, []);
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

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
          onClick={async () => {
            if (item.key === "logout") {
              await AuthService.logout();
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
  const menu = (
    <Menu>
      {notifications.length === 0 ? (
        <Menu.Item key="empty">Không có thông báo</Menu.Item>
      ) : (
        notifications.map((notif, index) => (
          <Menu.Item key={index}>
            <div>
              <strong>{notif.message}</strong>
              <br />
              <small style={{ color: "gray" }}>
                {dayjs(notif.createdAt).format("DD/MM/YY HH:mm")}
              </small>
            </div>
          </Menu.Item>
        ))
      )}
    </Menu>
  );
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
              {filterMenu.slice(0, 4).map((item) => renderItemChildMenu(item))}
            </Row>
            <Row className="divider-auth"></Row>
            <Row style={{ marginTop: "20px" }}>
              {filterMenu.slice(4, 10).map((item) => renderItemChildMenu(item))}
            </Row>
          </>
        ) : (
          <>
            {" "}
            <Row style={{ marginTop: "20px" }}>
              {filterMenu.slice(0, 4).map((item) => renderIconMenu(item))}
            </Row>
            <Row className="divider-auth"></Row>
            <Row style={{ marginTop: "20px" }}>
              {filterMenu.slice(4, 10).map((item) => renderIconMenu(item))}
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
            <div className="col-left-header-auth">
              <Avatar src={userData.avatar} size={40} alt={userData.name} />
              <span className="user-name">{userData.name}</span>
            </div>
            <div className="col-right-header-auth">
              <AiOutlineGlobal className="icon-header-auth" />
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                onOpenChange={markAllAsRead}
              >
                <Badge count={unreadCount}>
                  <HiMiniBellAlert
                    className="icon-header-auth"
                    style={{ cursor: "pointer" }}
                  />
                </Badge>
              </Dropdown>
            </div>
          </div>
        </Row>
        <Row className="content-auth">
          <Outlet />
        </Row>
      </Col>
    </Row>
    // <Row className="container-auth">
    //   <Col
    //     span={4}
    //     className={`col-left-auth ${isCollapsed ? "collapsed" : ""}`}
    //   ></Col>

    //   <Col span={20} className="col-right-auth">
    //     right
    //   </Col>
    // </Row>
  );
};

export default AuthLayout;
