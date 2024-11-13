import { ActionType } from "@/constants/action.constant";
import { Col, Row } from "antd";
import React, { ReactNode } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
interface MCardProps {
  title?: string;
  action?: ActionType;
  renderContent?: () => ReactNode;
  renderAction?: () => ReactNode;
  styleContent?: React.CSSProperties;
  styleAction?: React.CSSProperties;
}
const MCard: React.FC<MCardProps> = ({
  title = "Title Header",
  action,
  renderContent,
  renderAction,
  styleContent,
  styleAction,
}) => {
  return (
    <Row className="m-card-normal">
      <Col span={24} className="header-card">
        <span className="header-card-title">{title}</span>
      </Col>
      <Col span={24} className="content-card" style={styleContent}>
        {renderContent && renderContent()}
      </Col>
      <Col span={24} className="content-card" style={styleAction}>
        {renderAction && renderAction()}
      </Col>
      <Col span={24} className="action-card">
        {action === ActionType.EDIT && <CiEdit className="action-card-icon" />}
        {action === ActionType.DELETE && (
          <MdDeleteOutline className="action-card-icon" />
        )}
        {action === ActionType.ADD && <IoMdAdd className="action-card-icon" />}
      </Col>
    </Row>
  );
};

export default MCard;
