import React, { useState } from "react";
import { Input, Button, Form, Upload, ColorPicker, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const WebsiteCustomization = () => {
  const [formData, setFormData] = useState({
    websiteUrl: "",
    banner: null,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hotline: "",
  });

  const handleFormChange = (changedValues) => {
    setFormData({ ...formData, ...changedValues });
  };

  return (
    <div className="customization-container">
      <Card title="🎨 Chỉnh sửa giao diện Website" bordered>
        <Form layout="vertical" onValuesChange={handleFormChange}>
          <Form.Item label="Địa chỉ Website">
            <Input
              value={formData.websiteUrl}
              placeholder="Nhập địa chỉ website"
            />
          </Form.Item>

          <Form.Item label="Chỉnh sửa Banner">
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Tải lên Banner</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Màu nền">
            <ColorPicker defaultValue={formData.backgroundColor} />
          </Form.Item>

          <Form.Item label="Màu chữ">
            <ColorPicker defaultValue={formData.textColor} />
          </Form.Item>

          <Form.Item label="Hotline">
            <Input value={formData.hotline} placeholder="Nhập số hotline" />
          </Form.Item>

          <Button type="primary">Lưu Cài Đặt</Button>
        </Form>
      </Card>
    </div>
  );
};

export default WebsiteCustomization;
