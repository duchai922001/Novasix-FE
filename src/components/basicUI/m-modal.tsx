import { Modal } from "antd";
import React, { ReactNode } from "react";

interface IMModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  renderContent?: () => ReactNode;
  width?: number;
}
type CustomModalHeaderProps = {
  title: string;
};
const MModal: React.FC<IMModalProps> = ({
  isOpen,
  onClose,
  title,
  renderContent,
  width = 500,
}) => {
  const CustomModalHeader: React.FC<CustomModalHeaderProps> = ({ title }) => (
    <div className="m-modal-header">
      <div className="title">{title}</div>
    </div>
  );
  return (
    <Modal
      className="m-modal-normal"
      open={isOpen}
      onCancel={onClose}
      closeIcon={<></>}
      title={<CustomModalHeader title={title} />}
      footer={null}
      width={width}
    >
      {renderContent && renderContent()}
    </Modal>
  );
};

export default MModal;
