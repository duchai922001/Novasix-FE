import React from "react";
import { Card, Avatar, Button, List, Row, Col } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  MailOutlined,
  YoutubeOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const Profile = () => {
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
