import MInput from "@/components/basicUI/m-input";
import { Col, Row } from "antd";
import { SiPrivateinternetaccess } from "react-icons/si";
import { FaCheckDouble } from "react-icons/fa6";
import { IoMdMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { useState } from "react";
import MButton from "@/components/basicUI/m-button";
const MyAccount = () => {
  const [selectedGender, setSelectedGender] = useState("Male");
  return (
    <div className="my-account-container">
      <Row className="account-header">
        <Col span={4} className="account-icon">
          <SiPrivateinternetaccess className="icon" />
        </Col>
        <Col span={18} className="account-header-info">
          <h1>Personal Infomation</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
            provident obcaecati perferendis quos assumenda nam explicabo
            distinctio ?
          </p>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <MInput title="First Name" placeholder="Enter your first name" />
        </Col>
        <Col span={12}>
          <MInput title="Last Name" placeholder="Enter your last name" />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <MInput title="Phone Number" placeholder="Enter your phone number" />
        </Col>
        <Col span={12}>
          <MInput title="Address" placeholder="Enter your address" />
        </Col>
      </Row>
      <Row className="gender-contain">
        <Col
          span={4}
          className={
            selectedGender === "Male"
              ? "gender-common gender-selected"
              : "gender-common"
          }
          onClick={() => setSelectedGender("Male")}
        >
          {selectedGender === "Male" && (
            <div className="selected">
              <FaCheckDouble />
            </div>
          )}
          <IoMdMale className="icon" />
          <p className="text">Male</p>
        </Col>
        <Col
          span={4}
          className={
            selectedGender === "Female"
              ? "gender-common gender-selected"
              : "gender-common"
          }
          onClick={() => setSelectedGender("Female")}
        >
          {selectedGender === "Female" && (
            <div className="selected">
              <FaCheckDouble />
            </div>
          )}

          <IoFemale className="icon" />
          <p className="text">Female</p>
        </Col>
      </Row>
      <Row className="save-btn">
        <Col span={24}>
          <MButton type="fill" title="Save" />
        </Col>
      </Row>
    </div>
  );
};

export default MyAccount;
