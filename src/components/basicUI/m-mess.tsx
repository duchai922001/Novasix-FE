import { Col, Row } from "antd";
import React from "react";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";

interface IMMessProps {
  listContent?: string[];
  title?: string;
  isBorder?: boolean;
}
const MMess: React.FC<IMMessProps> = ({
  listContent,
  title = "Title Mess",
  isBorder = false,
}) => {
  const styleBorder = {
    border: `1px dashed #058e21`,
    padding: "12px",
    borderRadius: "6px",
  };
  return (
    <div className="m-mess-normal" style={isBorder ? styleBorder : {}}>
      <Row className="m-mess-header">
        <Col span={2}>
          <HiChatBubbleOvalLeft className="m-mess-header-icon" />
        </Col>
        <Col span={22} className="m-mess-header-title">
          {title}
        </Col>
      </Row>
      <Row className="m-mess-content">
        {listContent?.map((item) => (
          <Col className="m-mess-content-text" span={24}>
            {item}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MMess;
