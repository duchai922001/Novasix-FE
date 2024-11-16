import MButton from "@/components/basicUI/m-button";
import MInput from "@/components/basicUI/m-input";
import { Col, Row, Switch } from "antd";
import { AiOutlineMessage } from "react-icons/ai";
import { TbDeviceMobileMessage } from "react-icons/tb";
import { TbMessageCircleUser } from "react-icons/tb";
const Authentication = () => {
  return (
    <Row className="authentication-container">
      <Col span={24}>
        <MInput title="Workspace Name" placeholder="Enter workspace name" />
      </Col>
      <Col span={24}>
        <MInput type="email" title="Email" placeholder="Enter email" />
      </Col>
      <Col span={24}>
        <MInput title="Username" placeholder="Enter username" />
      </Col>
      <Col span={24}>
        <MButton title="Save" icon="FaCheck" type="fill" />
      </Col>
      <Col span={24} className="authentication-footer">
        <div className="authentication-item">
          <span className="authentication-icon-container">
            <AiOutlineMessage className="authentication-icon" />
          </span>
          <div className="authentication-text">
            <h1>Two-factor authentication (2FA)</h1>
            <p>
              Keep your account secure by enabling 2FA via SMS or using OTP form
              authentication app
            </p>
          </div>
        </div>
        <div className="authentication-item">
          <Row className="authentication-switch-container">
            <Col span={20} className="left-switch">
              <span className="authentication-icon-container">
                {" "}
                <TbDeviceMobileMessage className="authentication-icon" />
              </span>
              <div>
                <h2>Text message SMS</h2>
                <p>Receive a one-time passcode via SMS each time you log in</p>
              </div>
            </Col>
            <Col span={4}>
              <Switch defaultChecked />
            </Col>
          </Row>
          <Row className="authentication-switch-container">
            <Col span={20} className="left-switch">
              <span className="authentication-icon-container">
                {" "}
                <TbMessageCircleUser className="authentication-icon" />
              </span>
              <div>
                <h2>Authenticator app (TOTP)</h2>
                <p>
                  Use an app to receive a temporary one time passcode each time
                  you log in
                </p>
              </div>
            </Col>
            <Col span={4}>
              <Switch defaultChecked />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Authentication;
