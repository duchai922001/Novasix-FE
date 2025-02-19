import React from "react";
import { DatePicker, Row, Col } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface MDatePickerProps {
  title?: string;
  onChange?: (date: Dayjs | null, dateString: string) => void;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  defaultValue?: Dayjs;
  format?: string;
}

const MDatePickerAnt: React.FC<MDatePickerProps> = ({
  title = "Chọn ngày",
  onChange,
  style,
  className,
  placeholder = "Chọn ngày",
  defaultValue,
  format = "YYYY-MM-DD",
}) => {
  return (
    <Row style={{ width: "100%" }}>
      <Col span={24} className="m-title">
        {title}
      </Col>
      <Col style={{ width: "100%" }}>
        <DatePicker
          onChange={onChange}
          style={{ width: "100%", ...style }}
          className={`m-datepicker ${className}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          format={format}
        />
      </Col>
    </Row>
  );
};

export default MDatePickerAnt;
