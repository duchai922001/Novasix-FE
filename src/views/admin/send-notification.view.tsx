import { NotificationService } from "@/services/notification.service";
import { Button, Card, Input, Typography, message as antdMessage } from "antd";
import { useState } from "react";

const { Title } = Typography;

const SendNotification = () => {
  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    if (!message.trim()) return antdMessage.warning("Nhập nội dung thông báo!");

    await NotificationService.sendNotification({ message });
    antdMessage.success("Thông báo đã được gửi!");
    setMessage("");
  };

  return (
    <div className="notification-container">
      <Card className="notification-card">
        <Title level={3} className="title">
          Admin - Gửi Thông Báo
        </Title>
        <Input.TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập nội dung thông báo..."
          autoSize={{ minRows: 3, maxRows: 6 }}
          className="input"
        />
        <Button
          type="primary"
          onClick={sendNotification}
          className="send-button"
        >
          Gửi
        </Button>
      </Card>
    </div>
  );
};

export default SendNotification;
