import { StatusTask } from "@/constants/status-task.constant";
import { TypeTask } from "@/constants/type-task.constant";
import { Col, Row } from "antd";
import { CiEdit } from "react-icons/ci";
import { GiTomato } from "react-icons/gi";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

interface IMTaskProps {
  type?: string;
  task?: string;
  status?: string;
  pomodoro?: number;
  description?: string;
  handleEdit?: () => void;
  handleDelete: () => void;
  isEdit: boolean;
}
const MTask: React.FC<IMTaskProps> = ({
  type,
  status,
  task = "Task",
  description,
  pomodoro = 0,
  handleEdit,
  handleDelete,
  isEdit,
}) => {
  const classTypeType = (() => {
    switch (type) {
      case TypeTask.IMPORTANCE:
        return "m-task-importance";
      case TypeTask.URGENCY:
        return "m-task-urgency";
      case TypeTask.NOT_IMPORTANCE:
        return "m-task-not-importance";
      case TypeTask.NOT_URGENCY:
        return "m-task-not-urgency";
      default:
        return "";
    }
  })();
  const classTypeStatus = (() => {
    switch (status) {
      case StatusTask.CANCEL:
        return "m-status-cancel";
      case StatusTask.DOING:
        return "m-status-doing";
      case StatusTask.DONE:
        return "m-status-done";
      case StatusTask.NOT_YET:
        return "m-status-not-yet";
      default:
        return "";
    }
  })();
  return (
    <Row className="m-task-normal">
      <Col span={22} className="m-task-col-left">
        <div className="m-header-task">
          <div className={`m-task-type ${classTypeType}`}>{type}</div>
          <div className={`m-task-status ${classTypeStatus}`}>{status}</div>
        </div>

        <div className="m-task-title">{task}</div>
        <div className="m-task-description">{description}</div>
        <div className="m-task-pomodoro">
          {Array.from({ length: pomodoro }, (_, index) => (
            <span key={index}>
              <GiTomato />
            </span>
          ))}

          {/* <span>
            <IoMdAddCircle className="m-task-add-icon" />{" "}
          </span> */}
        </div>
      </Col>
      <Col span={2} className="m-task-col-right">
        {isEdit ? (
          <>
            <CiEdit style={{ cursor: "pointer" }} onClick={handleEdit} />
          </>
        ) : null}

        <MdDeleteOutline style={{ cursor: "pointer" }} onClick={handleDelete} />
      </Col>
    </Row>
  );
};

export default MTask;
