import MCard from "@/components/basicUI/m-card";
import MMess from "@/components/basicUI/m-mess";
import { ActionType } from "@/constants/action.constant";
import { Col, Row } from "antd";
import { FaFacebookF } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { OptionValue } from "@/types/optionValue.interface";

interface UserData {
  email: string;
  name: string;
  address: string;
  company: string;
  education: string;
  phone: string;
}
const dataUser: UserData = {
  email: "nguyenvan@gmail.com",
  name: "Nguyen Van A",
  address: "Austin, TX",
  company: "DataFlow Dynamics",
  education: "Bachelor of Science in Computer Science",
  phone: "123456789",
};
const Profile = () => {
  const [userInfo, setUserInfo] = useState<OptionValue[]>([]);
  useEffect(() => {
    const converDataUser = Object.keys(dataUser).map((item) => {
      return {
        title: item,
        value: dataUser[item as keyof UserData],
      };
    });
    setUserInfo(converDataUser);
  }, []);
  console.log({ userInfo });
  const renderInfoDetail = (user: OptionValue) => {
    return (
      <Col span={24} className="info-child">
        <span className="info-title">{user.title}:</span>{" "}
        <span className="info-content">{user.value}</span>
      </Col>
    );
  };
  return (
    <Row className="full-width">
      <Col span={24} className="profile-user-card">
        <Row>
          <Col span={23} className="left-col">
            <Row gutter={[0, 12]} className="user-info">
              <Col span={5} className="avatar">
                <img
                  src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-facebook-dep-cho-nam-51-28-16-28-03.jpg"
                  className="image"
                />
              </Col>
              <Col span={17} className="info">
                <Row className="name">Nguyen Van A</Row>
                <Row className="info-parent">
                  {userInfo.map((user) => renderInfoDetail(user))}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={1} className="right-col">
            <span className="right-icon">
              <FaFacebookF />
            </span>
            <span className="right-icon">
              <BiLogoGmail />
            </span>
            <span className="right-icon">
              <FaInstagram />
            </span>
            <span className="right-icon">
              <FaLinkedin />
            </span>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <MCard
              title="Personal Information"
              action={ActionType.EDIT}
              renderContent={() => (
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <MMess
                      title="March 2019 - December 2020"
                      listContent={[
                        "Backend Developer",
                        "DataFlow Dynamics",
                        "Frontend Developer",
                      ]}
                    />
                  </Col>
                  <Col span={24}>
                    <MMess
                      title="January 2021 - Present"
                      listContent={[
                        "Austin, TX",
                        "BrightWave Solutions",
                        "San Francisco, CA",
                      ]}
                    />
                  </Col>
                </Row>
              )}
            />
          </Col>
          <Col span={12}>
            <MCard
              title="Personal Information"
              action={ActionType.ADD}
              renderContent={() => (
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <MMess
                      title="Premium Plan"
                      listContent={[
                        "Expiration Date: January 15, 2025",
                        "Next Billing Date: February 15, 2025",
                      ]}
                      isBorder={true}
                    />
                  </Col>
                  <Col span={24}>
                    <MMess
                      title="Premium Plan"
                      listContent={[
                        "Expiration Date: January 15, 2025",
                        "Next Billing Date: February 15, 2025",
                      ]}
                      isBorder={true}
                    />
                  </Col>
                </Row>
              )}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Profile;
