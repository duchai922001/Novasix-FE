import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Tag, Popconfirm, message } from "antd";
import {
  SearchOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { handleError } from "@/utils/catch-error";
import { UserService } from "@/services/user.service";
import Loader from "@/components/loading";
import { useDebounce } from "@/hooks/useDebounce";

interface User {
  _id: string;
  key: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState();
  const [usersFilter, setUsersFilter] = useState();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 1000);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const asyncDataUser = async () => {
    try {
      setIsLoading(true);
      const response = await UserService.getAllUser();
      setUsers(response ?? []);
      setUsersFilter(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    asyncDataUser();
  }, []);

  const handleActionActiveUser = async (userId: string) => {
    try {
      const response = await UserService.actionIsActiveUser(userId);
      message.success(response.message);
      asyncDataUser();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (debouncedSearchText) {
      const filterUser = users.filter(
        (user) =>
          user.name.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
          user.email.toLowerCase().includes(debouncedSearchText.toLowerCase())
      );
      setUsersFilter(filterUser);
    } else {
      setUsersFilter(users);
    }
  }, [debouncedSearchText]);

  const columns: ColumnsType<User> = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Hoạt động" : "Bị chặn"}
        </Tag>
      ),
    },
    {
      title: "Thực hiện",
      key: "action",
      render: (_, record) => (
        <Space>
          {record.isActive ? (
            <Popconfirm
              title="Bạn có chắc chắn muốn chặn?"
              onConfirm={() => handleActionActiveUser(record._id)}
            >
              <Button type="primary" danger icon={<StopOutlined />}>
                Chặn
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Bạn có muốn mở khóa?"
              onConfirm={() => handleActionActiveUser(record._id)}
            >
              <Button type="default" icon={<CheckCircleOutlined />}>
                Mở khóa
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="user-management">
          <h2>Quản lý người dùng</h2>
          <Space style={{ marginBottom: 16, marginTop: 16 }}>
            <Input
              placeholder="Tìm kiếm theo tên hoặc email..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
          <Table columns={columns} dataSource={usersFilter} rowKey="key" />
        </div>
      )}
    </>
  );
};

export default UserManagement;
