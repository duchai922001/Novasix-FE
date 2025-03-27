import React, { useState } from "react";
import { Table, Input, Button, Space, Tag, Select, Modal, Form } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const StoreManagement = () => {
  const [packages, setPackages] = useState([
    { key: "1", name: "Gói Premium", price: "500.000 VNĐ", status: "active" },
    {
      key: "2",
      name: "Gói Standard",
      price: "300.000 VNĐ",
      status: "inactive",
    },
  ]);

  const [templates, setTemplates] = useState([
    { key: "1", name: "Template Blog", price: "200.000 VNĐ", status: "active" },
    {
      key: "2",
      name: "Template Shop",
      price: "250.000 VNĐ",
      status: "inactive",
    },
  ]);

  const [colors, setColors] = useState([
    { key: "1", name: "Đỏ #FF0000", status: "active" },
    { key: "2", name: "Xanh #00FF00", status: "active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Giá", dataIndex: "price", key: "price" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => setIsModalOpen(true)}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="store-management">
      <h2>Quản Lý Store</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Thêm Mới
      </Button>

      <h3>Quản lý Gói Package</h3>
      <Table columns={columns} dataSource={packages} rowKey="key" />

      <h3>Quản lý Template</h3>
      <Table columns={columns} dataSource={templates} rowKey="key" />

      <h3>Quản lý Màu sắc</h3>
      <Table
        columns={[columns[0], columns[2], columns[3]]}
        dataSource={colors}
        rowKey="key"
      />

      <Modal
        title="Thêm Mới"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" initialValue="active">
            <Select>
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Không hoạt động</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StoreManagement;
