import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([
    {
      key: "1",
      name: "Giảm giá 50%",
      startDate: "2024-04-01",
      endDate: "2024-04-10",
    },
    {
      key: "2",
      name: "Mua 1 tặng 1",
      startDate: "2024-05-01",
      endDate: "2024-05-05",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const newPromotion = {
      key: (promotions.length + 1).toString(),
      name: values.name,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };
    setPromotions([...promotions, newPromotion]);
    setIsModalOpen(false);
  };

  const columns = [
    { title: "Tên chương trình", dataIndex: "name", key: "name" },
    { title: "Ngày bắt đầu", dataIndex: "startDate", key: "startDate" },
    { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="promotion-container">
      <h2>🎉 Quản Lý Chương Trình Khuyến Mãi</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Thêm Mới
      </Button>
      <Table
        columns={columns}
        dataSource={promotions}
        rowKey="key"
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Thêm Chương Trình Khuyến Mãi"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="name"
            label="Tên chương trình"
            rules={[{ required: true, message: "Nhập tên chương trình!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Chọn ngày bắt đầu!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="Ngày kết thúc"
            rules={[{ required: true, message: "Chọn ngày kết thúc!" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PromotionManagement;
