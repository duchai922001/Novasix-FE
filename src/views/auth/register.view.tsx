import { Col, message, Row } from "antd";
import MButton from "@/components/basicUI/m-button";
import MInput from "@/components/basicUI/m-input";
import { useNavigate } from "react-router-dom";
import MCheckbox from "@/components/basicUI/m-checkbox";
import { useState } from "react";
import { IFormDataRegister } from "@/types/auth.interface";
import { handleError } from "@/utils/catch-error";
import { AuthService } from "@/services/auth.service";
import welcomeGif from "@/assets/images/unauth/LoginItem.gif";
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
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-form">
          <h1 className="title-primary">REGISTER</h1>
          <Row gutter={[12, 12]} style={{ marginTop: "24px" }}>
            <Col span={24}>
              <MInput title="Username" placeholder="Enter your username"
                onChange={(e) => setFormDataRegister({ ...formDataRegister, username: e.target.value })} />
            </Col>
            <Col span={12}>
              <MInput title="Password" type="password" placeholder="Enter your password"
                onChange={(e) => setFormDataRegister({ ...formDataRegister, password: e.target.value })} />
            </Col>
            <Col span={12}>
              <MInput title="Confirm password" type="password" placeholder="Confirm your password"
                onChange={(e) => setFormDataRegister({ ...formDataRegister, confirmPassword: e.target.value })} />
            </Col>
            <Col span={12}>
              <MInput title="Name" placeholder="Enter your name"
                onChange={(e) => setFormDataRegister({ ...formDataRegister, name: e.target.value })} />
            </Col>
            <Col span={12}>
              <MInput title="Phone" placeholder="Enter your phone number"
                onChange={(e) => setFormDataRegister({ ...formDataRegister, phone: e.target.value })} />
            </Col>
            <Col span={24}>
              <MInput title="Email" placeholder="Enter your email"
                onChange={(e) => setFormDataRegister({ ...formDataRegister, email: e.target.value })} />
            </Col>
          </Row>

          <Row gutter={[12, 12]} style={{ marginTop: "16px" }}>
            <Col span={24}>
              <MCheckbox title="I agree to the terms and conditions"
                value={formDataRegister.checkCondition}
                onChange={(e) => setFormDataRegister({ ...formDataRegister, checkCondition: e.target.checked })} />
            </Col>
          </Row>

          <Row gutter={[12, 12]} style={{ marginTop: "16px" }}>
            <Col span={24}>
              <MButton title="Register" style={{ width: "100%" }} type="fill" onClick={handleRegister} />
            </Col>
          </Row>

          <Row className="footer-auth" gutter={[12, 12]} style={{ marginTop: "16px" }}>
            <Col span={24}>
              <span>
                You already have an account,{" "}
                <strong className="navigate" onClick={() => navigate("/login")}>
                  login now.
                </strong>
              </span>
            </Col>
          </Row>
        </div>
        <div className="welcome-container">
          <img src={welcomeGif} alt="Welcome Animation" className="welcome-gif" />
          <h2>Chào mừng bạn đã đến với ứng dụng ZenDo!</h2>
          <p>Hãy cùng nhau viết lên hành trình của bạn!</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
