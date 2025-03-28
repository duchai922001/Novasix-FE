import { NotificationService } from "@/services/notification.service";
import { useState } from "react";

const SendNotification = () => {
  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    if (!message.trim()) return alert("Nhập nội dung thông báo!");

    await NotificationService.sendNotification({ message });

    alert("Thông báo đã được gửi!");
    setMessage("");
  };

  return (
    <div>
      <h2>Admin Panel - Gửi Thông Báo</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập nội dung thông báo..."
      />
      <button onClick={sendNotification}>Gửi</button>
    </div>
  );
};

export default SendNotification;
