import MButton from "@/components/basicUI/m-button";
import MInput from "@/components/basicUI/m-input";
import { Col, Row } from "antd";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

interface IRulesProps {
  rule: string;
  status: boolean;
}
const dataRules: IRulesProps[] = [
  {
    rule: "Minimum characters 12",
    status: true,
  },
  {
    rule: "One uppercase letter",
    status: true,
  },
  {
    rule: "One lowercase letter",
    status: false,
  },
  {
    rule: "One special letter",
    status: false,
  },
  {
    rule: "One number letter",
    status: false,
  },
];
const Password = () => {
  const renderRules = (rule: IRulesProps) => {
    return (
      <li className="password-rule">
        <span
          className={
            rule.status ? "password-rule-success" : "password-rule-error"
          }
        >
          {rule.status ? <FaRegCheckCircle /> : <FaTimesCircle />}
        </span>
        <span
          className={
            rule.status ? "password-rule-success" : "password-rule-error"
          }
        >
          {rule.rule}
        </span>
      </li>
    );
  };
  return (
    <Row className="password-container">
      <Col span={24}>
        <MInput
          type="password"
          title="Old Password"
          placeholder="Enter old password"
        />
      </Col>
      <Col span={24} className="new-password">
        <MInput
          type="password"
          title="New Password"
          placeholder="Enter new password"
        />
        <ul className="password-rules">
          {dataRules.map((rule) => renderRules(rule))}
        </ul>
      </Col>
      <Col span={24}>
        <MInput
          type="password"
          title="Confirm Password"
          placeholder="Enter new password again"
        />
        <a>Forgot Password?</a>
      </Col>

      <Col span={24}>
        <MButton title="Change Password" type="fill" />
      </Col>
    </Row>
  );
};

export default Password;
