import { TaskStatus } from "@/constants/taskStatus.constant";
import { Checkbox, Col, Row } from "antd";
import { GiTomato } from "react-icons/gi";
import { IoMdAddCircle } from "react-icons/io";

interface IMTaskProps {
  status?: string;
  task?: string;
  pomodoro?: number;
  onChange: () => void;
}
const MTask: React.FC<IMTaskProps> = ({
  status = "Importance",
  task = "Task",
  pomodoro = 0,
  onChange,
}) => {
  const classTypeStatus = (() => {
    switch (status) {
      case TaskStatus.IMPORTANCE:
        return "m-task-importance";
      case TaskStatus.URGENCY:
        return "m-task-urgency";
      case TaskStatus.NOT_IMPORTANCE:
        return "m-task-not-importance";
      case TaskStatus.NOT_URGENCY:
        return "m-task-not-urgency";
      default:
        return "";
    }
  })();

  return (
    <Row className="m-task-normal">
      <Col span={22} className="m-task-col-left">
        <div className={`m-task-status ${classTypeStatus}`}>{status}</div>
        <div className="m-task-title">{task}</div>
        <div className="m-task-pomodoro">
          {Array.from({ length: pomodoro }, (_, index) => (
            <span key={index}>
              <GiTomato />
            </span>
          ))}

          <span>
            <IoMdAddCircle className="m-task-add-icon" />{" "}
          </span>
        </div>
      </Col>
      <Col span={2} className="m-task-col-right">
        <Checkbox onChange={onChange}></Checkbox>
      </Col>
    </Row>
  );
};

export default MTask;
