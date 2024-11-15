import { Col, Row } from "antd";
import { useState } from "react";
import ImageSologan from "@/assets/images/auth/image-sologan.png";
import MCard from "@/components/basicUI/m-card";
import MTask from "@/components/basicUI/m-task";
import { ActionType } from "@/constants/action.constant";
import { TaskStatus } from "@/constants/taskStatus.constant";
import MButton from "@/components/basicUI/m-button";
import { GiTomato } from "react-icons/gi";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import MInput from "@/components/basicUI/m-input";
import MModal from "@/components/basicUI/m-modal";
import DatePicker from "react-datepicker";

const dataTask = [
  {
    status: TaskStatus.IMPORTANCE,
    task: "Finish the project",
    pomodoro: 5,
  },
  {
    status: TaskStatus.IMPORTANCE,
    task: "Buy groceries",
    pomodoro: 3,
  },
  {
    status: TaskStatus.URGENCY,
    task: "Call mom",
    pomodoro: 4,
  },
  {
    status: TaskStatus.URGENCY,
    task: "Buy clothes",
    pomodoro: 1,
  },
];

const dataDone = [
  {
    status: TaskStatus.NOT_IMPORTANCE,
    task: "Finish the project",
    pomodoro: 5,
  },
  {
    status: TaskStatus.NOT_IMPORTANCE,
    task: "Buy groceries",
    pomodoro: 3,
  },
  {
    status: TaskStatus.NOT_IMPORTANCE,
    task: "Call mom",
    pomodoro: 4,
  },
];

interface IOptions {
  time: string;
  pomodoro: number;
}
const options: IOptions[] = [
  { time: "50 - 10", pomodoro: 2 },
  { time: "25 - 5", pomodoro: 1 },
];
const Daily = () => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selected, setSelected] = useState<IOptions>({
    time: "",
    pomodoro: 0,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleDropdown = () => setIsOpenSelect(!isOpenSelect);

  const handleSelect = (value: IOptions) => {
    setSelected({
      time: value.time,
      pomodoro: value.pomodoro,
    });
    setIsOpenSelect(false);
  };
  const renderItemOption = (op: IOptions) => {
    return (
      <div className="item-option">
        {Array.from({ length: op.pomodoro }, (_, index) => (
          <span key={index}>
            <GiTomato className="icon-pomodoro" />
          </span>
        ))}
        {op.time}
      </div>
    );
  };
  const renderSelectPomodoro = () => {
    return (
      <div className="select-pomodoro-container">
        <p className="select-pomodoro">Set Time of Pomodoro</p>

        <div className="custom-dropdown">
          <div className="dropdown-header" onClick={toggleDropdown}>
            <span>{selected.time ? selected.time : "Selected an options"}</span>

            <IoMdArrowDroprightCircle
              className={`primary-color m-todo-icon-arrow ${
                isOpenSelect ? "rotated" : ""
              }`}
            />
          </div>
          {isOpenSelect && (
            <ul className="dropdown-list">
              {options.map((option: IOptions) => (
                <li
                  className="dropdown-option"
                  onClick={() => handleSelect(option)}
                >
                  {renderItemOption(option)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
  const renderAddNewTask = () => {
    return (
      <>
        <MInput title="New Task" placeholder="Your task's name" />
        <Row className="pomodoro-row">
          <Col span={10} className="pomodoro-col">
            {Array.from({ length: selected.pomodoro }, (_, index) => (
              <span key={index}>
                <GiTomato className="icon-pomodoro" />
              </span>
            ))}
          </Col>
          <Col span={14}>{renderSelectPomodoro()}</Col>
        </Row>
        <Row gutter={[12, 12]} justify={"start"} style={{ width: "50%" }}>
          <Col>
            <MButton title="Cancel" onClick={() => setIsOpenModal(false)} />
          </Col>
          <Col>
            <MButton
              title="Confirm"
              type="fill"
              onClick={() => setIsOpenModal(false)}
            />
          </Col>
        </Row>
      </>
    );
  };
  const onChangeTask = () => {};
  const renderSologan = () => {
    return (
      <Row style={{ height: "100%" }}>
        <Col span={18} className="sologan-des">
          <p className="title">
            Your Personal Philophy is the greatest determing factor in how your
            life works out
          </p>
          <p className="author">---Jim Rohn---</p>
        </Col>
        <Col span={6}>
          <img src={ImageSologan} className="image-slg" />
        </Col>
      </Row>
    );
  };

  const handleAddNewTask = () => {
    setIsOpenModal(true);
  };
  return (
    <div className="daily-container">
      <Row className="daily-header" gutter={[12, 12]}>
        <Col span={14} className="daily-header-left">
          <div className="daily-sologan">{renderSologan()}</div>
          <div className="daily-title">
            Today I am grateful for .............
          </div>
        </Col>
        <Col span={10}>
          {" "}
          <DatePicker
            inline
            className="custom-datepicker"
            calendarClassName="custom-calendar"
          />
        </Col>
      </Row>
      <Row className="card-container" gutter={[12, 12]}>
        <Col span={12}>
          <MCard
            title="Task"
            onClickAction={handleAddNewTask}
            styleContent={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            renderContent={() => (
              <>
                {dataTask.map((item) => (
                  <MTask
                    onChange={onChangeTask}
                    status={item.status}
                    task={item.task}
                    pomodoro={item.pomodoro}
                  />
                ))}
              </>
            )}
            action={ActionType.ADD}
          />
        </Col>
        <Col span={12}>
          <MCard
            title="Done"
            styleContent={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            renderContent={() => (
              <>
                {dataDone.map((item) => (
                  <MTask
                    onChange={onChangeTask}
                    status={item.status}
                    task={item.task}
                    pomodoro={item.pomodoro}
                  />
                ))}
              </>
            )}
            action={ActionType.ADD}
          />
        </Col>
      </Row>
      <MModal
        width={800}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="New Task"
        renderContent={() => <>{renderAddNewTask()}</>}
      />
    </div>
  );
};

export default Daily;
