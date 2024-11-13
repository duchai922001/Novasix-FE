import { InputTypes } from "@/constants/inputTypes.constant";
import { Col, Input, Row } from "antd";
import React from "react";
const { TextArea } = Input;
interface MInputProps {
  title?: string;
  onChange?: () => void;
  style?: React.CSSProperties;
  type?: string;
  className?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}
const MInput: React.FC<MInputProps> = ({
  title = "Title",
  onChange,
  style,
  type = "text",
  className,
  placeholder = "Enter text here",
  rows = 4,
  maxLength = 6,
}) => {
  return (
    <Row style={{ width: "100%" }}>
      <Col span={24} className="m-title">
        {title}
      </Col>
      <Col style={{ width: "100%" }}>
        {InputTypes.TEXTAREA === type ? (
          <TextArea
            rows={rows}
            placeholder={placeholder}
            maxLength={maxLength}
            className="m-textarea"
          />
        ) : (
          <Input
            onChange={onChange}
            style={style}
            type={type}
            placeholder={placeholder}
            className={`m-input-normal ${className}`}
          ></Input>
        )}
      </Col>
    </Row>
  );
};

export default MInput;
