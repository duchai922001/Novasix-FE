import logo from "@/assets/images/unauth/Logo.png";
import { Col, message, Row, Spin } from "antd";
import MButton from "@/components/basicUI/m-button";
import MInput from "@/components/basicUI/m-input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IFormDataLogin } from "@/types/auth.interface";
import { AuthService } from "@/services/auth.service";
import { handleError } from "@/utils/catch-error";
import { setLocalStorage } from "@/utils/localstorage";
import Loader from "@/components/loading";
import welcomeGif from "@/assets/images/unauth/LoginItem.gif";
const Login = () => {
  const navigate = useNavigate();
  const [formDataLogin, setFormDataLogin] = useState<IFormDataLogin>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleLogin = async () => {
    const { username, password } = formDataLogin;
    if (!username || !password) {
      return message.warning("Điền tên đăng nhập và mật khẩu");
    }
    try {
      setIsLoading(true);
      const response = await AuthService.login(formDataLogin);
      setLocalStorage("accessToken", response.access_token);
      setLocalStorage("user", response);
      if (response.role === "customer") {
        message.success("Đăng nhập thành công");
        navigate("/dashboard");
      }
      if (response.role === "admin") {
        message.success("Đăng nhập quyền admin");
        navigate("/admin");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="auth-wrapper">
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <div className="auth-container">
          <div className="auth-form-login">
            <div className="img-logo-content">
              <img src={logo} className="img-logo"/>
              <h1 className="title-primary">LOG IN</h1>
            </div>
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
                <MInput
                  title="Username"
                  placeholder="Enter your username"
                  onChange={(e) =>
                    setFormDataLogin((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
              </Col>
              <Col span={24} className="full-width">
                <MInput
                  title="Password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setFormDataLogin((prev) => ({
                      ...prev,
                      password: e.target.value,
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
                  title="Login"
                  style={{ width: "100%" }}
                  type="fill"
                  onClick={() => handleLogin()}
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
                  <strong
                    className="navigate"
                    onClick={() => navigate("/register")}
                  >
                    {" "}
                    register now.
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
        </>
      )}
    </div>

  );
};

export default Login;
