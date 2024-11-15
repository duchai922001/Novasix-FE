import { Modal, Progress } from "antd";

interface IMProgressProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  percentProgress: number;
}
const MProgress: React.FC<IMProgressProps> = ({
  isOpen,
  title = "Title Alert",
  onClose,
  percentProgress = 0,
}) => {
  return (
    <Modal
      className="m-progress-normal"
      open={isOpen}
      title={title}
      onCancel={onClose}
      footer={null}
      width={500}
      closeIcon={<></>}
    >
      <Progress percent={percentProgress} />
    </Modal>
  );
};

export default MProgress;
