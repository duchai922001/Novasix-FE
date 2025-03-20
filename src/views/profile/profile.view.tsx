import React from "react";
import { useState } from "react";
import { Card, Avatar, Button, List, Row, Col } from "antd";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  InstagramOutlined,
  FacebookOutlined,
  MailOutlined,
  YoutubeOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
interface Task {
  id: number;
  name: string;
  description: string;
  rewards: string;
}

interface TaskGroup {
  id: number;
  title: string;
  tasks: Task[];
}
const taskGroups: TaskGroup[] = [
  {
    id: 1,
    title: "Tài khoản mới",
    tasks: [
      {
        id: 101,
        name: "Cập nhật đầy đủ thông tin cá nhân",
        description: "Điền đầy đủ thông tin cá nhân của bạn để cá nhân hóa trải nghiệm trong ứng dụng.",
        rewards: "Điểm kinh nghiệm +100, Huy hiệu 'Người mới'",
      },
      {
        id: 102,
        name: "Tạo một task đầu tiên",
        description: "Thêm một task mới vào danh sách công việc của bạn.",
        rewards: "Điểm kinh nghiệm +50",
      },
      {
        id: 103,
        name: "Tạo một Weekly đầu tiên",
        description: "Thiết lập một mục tiêu hoặc kế hoạch cho tuần này.",
        rewards: "Điểm kinh nghiệm +100",
      },
      {
        id: 104,
        name: "Tạo một Monthly đầu tiên",
        description: "Đặt một mục tiêu lớn hơn mà bạn muốn đạt được trong tháng này.",
        rewards: "Điểm kinh nghiệm +200",
      },
    ],
  },
  {
    id: 2,
    title: "Nhiệm vụ hằng ngày",
    tasks: [
      {
        id: 201,
        name: "Thực thi 5 task",
        description: "Hoàn thành ít nhất 5 task trong ngày để duy trì năng suất.",
        rewards: "Điểm kinh nghiệm +150",
      },
      {
        id: 202,
        name: "Sử dụng 3 Pomodoro",
        description: "Dùng phương pháp Pomodoro 3 lần để tập trung làm việc hiệu quả.",
        rewards: "Điểm kinh nghiệm +100",
      },
      {
        id: 203,
        name: "Viết một lời biết ơn",
        description: "Ghi lại một điều bạn biết ơn trong ngày hôm nay.",
        rewards: "Điểm kinh nghiệm +100, Cải thiện tâm trạng",
      },
    ],
  },
  {
    id: 3,
    title: "Nhiệm vụ hằng tuần",
    tasks: [
      {
        id: 301,
        name: "Viết Weekly Reflection",
        description: "Tóm tắt lại tuần vừa qua, những điều bạn đã làm tốt và những gì cần cải thiện.",
        rewards: "Điểm kinh nghiệm +300, Cải thiện khả năng tự nhận thức",
      },
      {
        id: 302,
        name: "Sử dụng 14 Pomodoro",
        description: "Dùng phương pháp Pomodoro ít nhất 14 lần trong tuần này.",
        rewards: "Điểm kinh nghiệm +400, Cải thiện hiệu suất làm việc",
      },
    ],
  },
  {
    id: 4,
    title: "Nhiệm vụ hằng tháng",
    tasks: [
      {
        id: 401,
        name: "Sử dụng 60 Pomodoro",
        description: "Dùng Pomodoro ít nhất 60 lần trong tháng này để duy trì thói quen làm việc tập trung.",
        rewards: "Điểm kinh nghiệm +1000, Huy hiệu 'Người chinh phục thời gian'",
      },
    ],
  },
];

const Profile: React.FC = () => {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const episodes = [
    {
      title: "Kỷ luật 100 ngày thử thách",
      guest: "+100 point",
      img: "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-hai-huoc-cam-dep-duoi-ai-do.jpg?1704789789335",
      bgColor: "linear-gradient(to right,rgb(17, 150, 203),rgb(0, 219, 37))",
    },
    {
      title: "Điểm danh 30 ngày liên tục",
      guest: "+100 point",
      img: "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223",
      bgColor: "linear-gradient(to right,rgb(0, 182, 24),rgb(3, 205, 255))",
    },
    {
      title: "Điểm danh 30 ngày liên tục",
      guest: "+100 point",
      img: "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223",
      bgColor: "linear-gradient(to right, #6a11cb, #2575fc)",
    },
    {
      title: "Điểm danh 30 ngày liên tục",
      guest: "+100 point",
      img: "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223",
      bgColor: "linear-gradient(to right, #ff7eb3, #ff758c)",
    },
  ];

  const platforms = [
    { name: "Instagram", icon: <InstagramOutlined />, color: "#E1306C" },
    { name: "Facebook", icon: <FacebookOutlined />, color: "#1877F2" },
    { name: "Email", icon: <MailOutlined />, color: "#FF5733" },
    { name: "YouTube", icon: <YoutubeOutlined />, color: "#FF0000" },
  ];

  return (
    <div className="podcast-container">
      <Row gutter={20}>
        {/* Cột Trái - Thông tin Podcast */}
        <Col xs={24} md={12}>
          <Card className="podcast-card">
            <div className="podcast-header">
              <Avatar
                size={80}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXqMv4lHXdeeMiha1KWS5a_4D8FNvG82pKXw&s"
              />
              <div className="podcast-info">
                <span className="category">Nguyễn Văn A</span>
                <p className="podcast-desc">Thích màu hồng ghét sự giả dối</p>
                <div className="contact-info">
                  <p>
                    <MailOutlined /> nguyenvana@gmail.com
                  </p>
                  <p>
                    <HomeOutlined /> 123 đường không biết, phường chưa ghi, quận
                    đoán xem
                  </p>
                  <p>
                    <PhoneOutlined /> +1 234 567 890
                  </p>
                </div>
              </div>
            </div>
            </Card>
      <Card className="quest-container">
        <div className="task-container">
          {/* Task Groups */}
          <div className="task-group">
            {taskGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="task-group-item">
                <button
                  className="task-group-button"
                  onClick={() =>
                    setExpandedGroup(expandedGroup === groupIndex ? null : groupIndex)
                  }
                >
                  {group.title}
                  {expandedGroup === groupIndex ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedGroup === groupIndex && (
                  <ul className="task-list">
                    {group.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="task-item">
                        <button
                          className="task-button"
                          onClick={() => setSelectedTask(task)}
                        >
                          {task.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Task Details */}
          <div className="task-details">
            {selectedTask ? (
              <div>
                <h2 className="task-title">{selectedTask.name}</h2>
                <p className="task-description">{selectedTask.description}</p>
                <p className="task-reward">🎁 Phần thưởng: {selectedTask.rewards}</p>
                <button className="reward-button">Nhận Thưởng</button>
              </div>
            ) : (
              <p className="task-placeholder">Chọn một nhiệm vụ để xem chi tiết</p>
            )}
          </div>
          </div>
    </Card>
          {/* Subscribe Section */}
          <Card className="subscribe-card">
            <h2>Thông tin liên hệ</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
            <div className="platforms">
              {platforms.map((platform) => (
                <Button
                  key={platform.name}
                  icon={platform.icon}
                  style={{ background: platform.color }}
                >
                  {platform.name}
                </Button>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="guests-card">
            <h2>Thành tựu</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
            <List
              itemLayout="horizontal"
              dataSource={episodes}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    className="guest-card"
                    style={{ background: item.bgColor }}
                  >
                    <Avatar src={item.img} size={50} />
                    <div className="guest-info">
                      <span className="guest-name">{item.guest}</span>
                      <h4>{item.title}</h4>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
