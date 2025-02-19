import { Col, message, Row } from "antd";
import MButton from "@/components/basicUI/m-button";
import MInput from "@/components/basicUI/m-input";
import { useNavigate } from "react-router-dom";
import MCheckbox from "@/components/basicUI/m-checkbox";
import { useState } from "react";
import { IFormDataRegister } from "@/types/auth.interface";
import { handleError } from "@/utils/catch-error";
import { AuthService } from "@/services/auth.service";
const Register = () => {
  const navigate = useNavigate();
  const [formDataRegister, setFormDataRegister] = useState<IFormDataRegister>({
    username: "",
    password: "",
    email: "",
    phone: "",
    name: "",
    confirmPassword: "",
    checkCondition: false,
  });
  const handleRegister = async () => {
    const {
      username,
      password,
      confirmPassword,
      email,
      phone,
      name,
      checkCondition,
    } = formDataRegister;
    if (password !== confirmPassword) {
      return message.warning("Xác nhận mật khẩu không khớp");
    }
    if (!checkCondition) {
      return message.warning("Vui lòng đồng ý điều khoản và điều kiện");
    }
    try {
      await AuthService.register({
        username,
        password,
        email,
        phone,
        name,
      });
      message.success("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="auth-container">
      <h1 className="title-primary">REGISTER</h1>
      <Row
        className="full-width"
        gutter={[12, 12]}
        style={{ marginTop: "24px" }}
      >
        <Col span={24} className="full-width">
          <MInput
            title="Username"
            placeholder="Enter your username"
            onChange={(e) =>
              setFormDataRegister((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
        </Col>
        <Col span={12} className="full-width">
          <MInput
            title="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setFormDataRegister((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </Col>
        <Col span={12} className="full-width">
          <MInput
            title="Confirm password"
            type="password"
            placeholder="Confirm your password"
            onChange={(e) =>
              setFormDataRegister((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
        </Col>
        <Col span={12} className="full-width">
          <MInput
            title="Name"
            placeholder="Enter your name"
            onChange={(e) =>
              setFormDataRegister((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </Col>
        <Col span={12} className="full-width">
          <MInput
            title="Phone"
            placeholder="Enter your phone number"
            onChange={(e) =>
              setFormDataRegister((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
          />
        </Col>
        <Col span={24} className="full-width">
          <MInput
            title="Email"
            placeholder="Enter your email"
            onChange={(e) =>
              setFormDataRegister((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
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
            title="Register"
            style={{ width: "100%" }}
            type="fill"
            onClick={() => handleRegister()}
          />
        </Col>
      </Row>
      <Row
        className="full-width footer-auth"
        gutter={[12, 12]}
        style={{ marginTop: "24px" }}
      >
        <Col span={24}>
          <MCheckbox
            title="I agree to the terms and conditions"
            value={formDataRegister.checkCondition}
            onChange={(e) =>
              setFormDataRegister((prev) => ({
                ...prev,
                checkCondition: e.target.checked,
              }))
            }
          />
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
