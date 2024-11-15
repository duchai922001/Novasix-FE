import { Col, Row } from "antd";
import MButton from "@/components/basicUI/m-button";
import MInput from "@/components/basicUI/m-input";
import { useNavigate } from "react-router-dom";
import MCheckbox from "@/components/basicUI/m-checkbox";
const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <h1 className="title-primary">REGISTER</h1>
      <Row
        className="full-width"
        gutter={[12, 12]}
        style={{ marginTop: "24px" }}
      >
        <Col span={24} className="full-width">
          <MInput title="Username" placeholder="Enter your username" />
        </Col>
        <Col span={12} className="full-width">
          <MInput
            title="Password"
            type="password"
            placeholder="Enter your password"
          />
        </Col>
        <Col span={12} className="full-width">
          <MInput
            title="Confirm password"
            type="password"
            placeholder="Confirm your password"
          />
        </Col>
        <Col span={12} className="full-width">
          <MInput title="Name" placeholder="Enter your name" />
        </Col>
        <Col span={12} className="full-width">
          <MInput title="Phone" placeholder="Enter your phone number" />
        </Col>
        <Col span={24} className="full-width">
          <MInput title="Email" placeholder="Enter your email" />
        </Col>
      </Row>
      <Row
        className="full-width"
        gutter={[12, 12]}
        style={{ marginTop: "24px" }}
      >
        <Col span={24}>
          <MButton
            title="Register"
            style={{ width: "100%" }}
            type="fill"
            onClick={() => navigate("/")}
          />
        </Col>
      </Row>
      <Row
        className="full-width footer-auth"
        gutter={[12, 12]}
        style={{ marginTop: "24px" }}
      >
        <Col span={24}>
          <MCheckbox title="I agree to the terms and conditions" />
        </Col>
        <Col span={24}>
          <span>
            You already have an account,
            <strong className="navigate" onClick={() => navigate("/login")}>
              {" "}
              login now.
            </strong>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
