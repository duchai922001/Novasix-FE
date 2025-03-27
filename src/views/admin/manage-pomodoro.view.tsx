import React, { useState } from "react";
import {
  Table,
  InputNumber,
  Button,
  Space,
  Typography,
  Modal,
  Form,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const PomodoroManagement = () => {
  const [schedules, setSchedules] = useState([
    { key: "1", workTime: 25, breakTime: 5 },
    { key: "2", workTime: 50, breakTime: 10 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const newSchedule = {
      key: (schedules.length + 1).toString(),
      workTime: values.workTime,
      breakTime: values.breakTime,
    };
    setSchedules([...schedules, newSchedule]);
    setIsModalOpen(false);
  };

  const columns = [
    { title: "Thời gian làm (phút)", dataIndex: "workTime", key: "workTime" },
    {
      title: "Thời gian nghỉ (phút)",
      dataIndex: "breakTime",
      key: "breakTime",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />}>Sửa</Button>
          <Button icon={<DeleteOutlined />} danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="pomodoro-container">
      <Title level={2}>🍅 Quản Lý Pomodoro</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Thêm Mới
      </Button>
      <Table
        columns={columns}
        dataSource={schedules}
        rowKey="key"
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Thêm Cấu Hình Pomodoro"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="workTime"
            label="Thời gian làm (phút)"
            rules={[{ required: true, message: "Nhập thời gian làm việc!" }]}
          >
            <InputNumber min={1} max={60} />
          </Form.Item>
          <Form.Item
            name="breakTime"
            label="Thời gian nghỉ (phút)"
            rules={[{ required: true, message: "Nhập thời gian nghỉ!" }]}
          >
            <InputNumber min={1} max={30} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PomodoroManagement;
