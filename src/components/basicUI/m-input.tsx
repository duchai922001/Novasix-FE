import { InputTypes } from "@/constants/inputTypes.constant";
import { Col, Input, Row } from "antd";
import React from "react";
const { TextArea } = Input;
interface MInputProps {
  value?: any;
  title?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  style?: React.CSSProperties;
  type?: string;
  className?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
const MInput: React.FC<MInputProps> = ({
  value,
  title = "Title",
  onChange,
  style,
  type = "text",
  className,
  placeholder = "Enter text here",
  rows = 4,
  maxLength = 6,
  min,
  max,
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
            onChange={onChange}
            value={value}
          />
        ) : (
          <Input
            value={value}
            onChange={onChange}
            style={style}
            type={type}
            placeholder={placeholder}
            className={`m-input-normal ${className}`}
            min={min}
            max={max}
          ></Input>
        )}
      </Col>
    </Row>
  );
};

export default MInput;
