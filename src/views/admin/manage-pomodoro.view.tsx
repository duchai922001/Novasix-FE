import React, { useEffect, useState } from "react";
import {
  Table,
  InputNumber,
  Button,
  Space,
  Typography,
  Modal,
  Form,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { handleError } from "@/utils/catch-error";
import { PomodoroSettingService } from "@/services/pomodoro-setting.service";
import { IPomodoroSetting } from "@/types/pomodoro-setting.interface";
import Loader from "@/components/loading";

const { Title } = Typography;

const PomodoroManagement = () => {
  const [schedules, setSchedules] = useState<IPomodoroSetting[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IPomodoroSetting | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const asyncDataSchedules = async () => {
    try {
      setIsLoading(true);
      const response = await PomodoroSettingService.getAll();
      setSchedules(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    asyncDataSchedules();
  }, []);

  const handleAdd = async (values) => {
    const newSchedule = {
      pomodoroTimer: values.workTime,
      breakTimer: values.breakTime,
    };

    try {
      if (isEditMode && currentRecord) {
        await PomodoroSettingService.update(currentRecord.id, newSchedule);
        message.success("Cập nhật thành công!");
      } else {
        await PomodoroSettingService.create(newSchedule);
        message.success("Tạo mới thành công!");
      }

      asyncDataSchedules();
      setIsModalOpen(false);
      form.resetFields();
      setIsEditMode(false);
      setCurrentRecord(null);
    } catch (error) {
      handleError(error);
    }
  };

  const handleEdit = (record) => {
    setIsEditMode(true);
    setIsModalOpen(true);
    setCurrentRecord(record);
    form.setFieldsValue({
      workTime: record.pomodoroTimer,
      breakTime: record.breakTimer,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await PomodoroSettingService.delete(id);
      message.success("Xóa thành công!");
      asyncDataSchedules();
    } catch (error) {
      handleError(error);
    }
  };

  const columns = [
    {
      title: "Thời gian làm (phút)",
      dataIndex: "pomodoroTimer",
      key: "pomodoroTimer",
    },
    {
      title: "Thời gian nghỉ (phút)",
      dataIndex: "breakTimer",
      key: "breakTimer",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pomodoro-container">
          <Title level={2}>🍅 Quản Lý Pomodoro</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsEditMode(false);
              setIsModalOpen(true);
              form.resetFields();
            }}
          >
            Thêm Mới
          </Button>
          <Table
            columns={columns}
            dataSource={schedules}
            rowKey="id"
            style={{ marginTop: 20 }}
          />

          <Modal
            title={isEditMode ? "Cập Nhật Cấu Hình" : "Thêm Cấu Hình Pomodoro"}
            visible={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
              setIsEditMode(false);
              form.resetFields();
            }}
            onOk={() => form.submit()}
          >
            <Form form={form} layout="vertical" onFinish={handleAdd}>
              <Form.Item
                name="workTime"
                label="Thời gian làm (phút)"
                rules={[
                  { required: true, message: "Nhập thời gian làm việc!" },
                ]}
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
      )}
    </>
  );
};

export default PomodoroManagement;
