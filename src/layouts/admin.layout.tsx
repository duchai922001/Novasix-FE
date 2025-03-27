import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  theme,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "@/assets/images/auth/logo-zendo.png";
import { GiTomato } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { SiVorondesign } from "react-icons/si";
import { FaStore, FaUserCog } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { MdSell } from "react-icons/md";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const username = user?.name || "Admin";

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<SettingOutlined />}>
        Hồ sơ
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "6px" }}
        >
          <img src={logo} alt="NovaSix Logo" style={{ width: "80%" }} />
        </div>
        <Menu
          style={{ height: "100vh" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AiFillDashboard />,
              label: "Dashboard",
              onClick: () => navigate("/admin"),
            },
            {
              key: "2",
              icon: <FaUserCog />,
              label: "Quản lý người dùng",
              onClick: () => navigate("/manage-user"),
            },

            {
              key: "3",
              icon: <FaStore />,
              label: "Quản lý cửa hàng",
              onClick: () => navigate("/manage-store"),
            },
            {
              key: "4",
              icon: <GiTomato />,
              label: "Quản lý pomodoro",
              onClick: () => navigate("/manage-pomodoro"),
            },
            {
              key: "5",
              icon: <FaMoneyBillTransfer />,
              label: "Quản lý giao dịch",
              onClick: () => navigate("/manage-transaction"),
            },
            {
              key: "6",
              icon: <MdSell />,
              label: "Chương trình khuyến mãi",
              onClick: () => navigate("/manage-promotion"),
            },
            {
              key: "7",
              icon: <SiVorondesign />,
              label: "Thiết kế website",
              onClick: () => navigate("/design-website"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown overlay={menu} trigger={["click"]}>
            <Space style={{ cursor: "pointer" }}>
              <Avatar size="large" icon={<UserOutlined />} />
              <Text>{username}</Text>
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
