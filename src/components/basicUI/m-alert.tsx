import { Modal, Progress } from "antd";

interface IMAlertProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
}
const MAlert: React.FC<IMAlertProps> = ({
  isOpen,
  title = "Title Alert",
  onClose,
}) => {
  return (
    <Modal open={isOpen} title={title} onClose={onClose}>
      <Progress percent={30} />
    </Modal>
  );
};

export default MAlert;
