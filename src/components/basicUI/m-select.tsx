import React from "react";
import { Select, Row, Col } from "antd";

const { Option } = Select;

interface MSelectProps {
  value?: any;
  title?: string;
  options: { label: string; value: string | number }[];
  onChange?: (value: string | number) => void;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
}

const MSelect: React.FC<MSelectProps> = ({
  value,
  title = "Select an option",
  options,
  onChange,
  style,
  className,
  placeholder = "Choose...",
  defaultValue,
  disabled,
}) => {
  return (
    <Row style={{ width: "100%" }}>
      <Col span={24} className="m-title">
        {title}
      </Col>
      <Col style={{ width: "100%" }}>
        <Select
          onChange={onChange}
          style={{ width: "100%", ...style }}
          className={`m-select ${className}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled ?? false}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};

export default MSelect;
