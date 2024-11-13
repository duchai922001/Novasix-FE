import { TodoStatusTypes } from "@/constants/todo.constant";
import { Col, Row } from "antd";
import { useState } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import MCheckbox from "./m-checkbox";
import { CheckboxChangeEvent } from "antd/es/checkbox";
interface IMTodoProps {
  title?: string;
  action?: TodoStatusTypes;
  todoList?: string[];
}
const MTodo: React.FC<IMTodoProps> = ({
  title = "Title Todo",
  action = TodoStatusTypes.IMPORTANT_NOT_URGENT,
  todoList = ["To do 1", "To do 2"],
}) => {
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [listChecked, setListChecked] = useState<string[]>([]);
  const toggleDesc = () => {
    setIsDescVisible((prev) => !prev);
  };
  const onChangeTodo = (e: CheckboxChangeEvent, todo: string) => {
    setListChecked((prev) => {
      const checked = e.target.checked;
      if (checked) {
        return [...prev, todo];
      } else {
        return prev.filter((item) => item !== todo);
      }
    });
  };
  const renderTodoList = (todo: string) => {
    return (
      <Col span={24} className={`m-todo-desc ${classTodoDes}`}>
        <MCheckbox
          title={todo}
          type="todo"
          onChange={(e, todo) => onChangeTodo(e, todo)}
          value={listChecked.includes(todo)}
        />
      </Col>
    );
  };
  const classTodoType =
    action === TodoStatusTypes.IMPORTANT_NOT_URGENT
      ? "m-todo-danger"
      : action === TodoStatusTypes.IMPORTANT_URGENT
      ? "m-todo-warning"
      : action === TodoStatusTypes.NOT_IMPORTANT_URGENT
      ? "m-todo-success"
      : "m-todo-success-bold";
  const classTodoDes =
    action === TodoStatusTypes.IMPORTANT_NOT_URGENT
      ? "m-todo-desc-danger"
      : action === TodoStatusTypes.IMPORTANT_URGENT
      ? "m-todo-desc-warning"
      : action === TodoStatusTypes.NOT_IMPORTANT_URGENT
      ? "m-todo-desc-success"
      : "m-todo-desc-success-bold";
  return (
    <div className="m-todo-normal">
      <Row className={`m-todo-contain ${classTodoType}`} onClick={toggleDesc}>
        <Col span={22} className="m-todo-title">
          {title}
        </Col>
        <Col span={2} className="m-todo-icon">
          <IoMdArrowDroprightCircle
            className={`m-todo-icon-arrow ${isDescVisible ? "rotated" : ""}`}
          />
        </Col>
      </Row>
      {isDescVisible && (
        <Row className={`m-todo-desc-row ${isDescVisible ? "open" : ""}`}>
          {todoList && todoList.map((todo) => renderTodoList(todo))}
        </Row>
      )}
    </div>
  );
};

export default MTodo;
