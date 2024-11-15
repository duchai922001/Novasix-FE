import logo from "@/assets/images/unauth/Logo.png";
import { Col, Row } from "antd";
import MButton from "@/components/basicUI/m-button";
import MInput from "@/components/basicUI/m-input";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <img src={logo} />
      <h1 className="title-primary">LOG IN</h1>
      <Row className="full-width" gutter={[12, 12]}>
        <Col span={24}>
          <MButton
            title="Login Google"
            icon="FaGoogle"
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={24}>
          <MButton
            title="Login Facebook"
            icon="FaFacebook"
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Row
        className="full-width"
        gutter={[12, 12]}
        style={{ marginTop: "24px" }}
      >
        <Col span={24} className="full-width">
          <MInput title="Username" placeholder="Enter your username" />
        </Col>
        <Col span={24} className="full-width">
          <MInput
            title="Password"
            type="password"
            placeholder="Enter your password"
          />
        </Col>
      </Row>
      <Row
        className="full-width"
        gutter={[12, 12]}
        style={{ marginTop: "24px" }}
      >
        <Col span={24}>
          <MButton
            title="Login"
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
          <span className="forgot-password">Forgot Password?</span>
        </Col>
        <Col span={24}>
          <span>
            You don't have an account yet,{" "}
            <strong className="navigate" onClick={() => navigate("/register")}>
              {" "}
              register now.
            </strong>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
