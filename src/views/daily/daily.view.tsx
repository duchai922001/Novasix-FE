import { Col, Row } from "antd";
import React from "react";
import ImageSologan from "@/assets/images/auth/image-sologan.png";
import MCard from "@/components/basicUI/m-card";
import MTask from "@/components/basicUI/m-task";
import { ActionType } from "@/constants/action.constant";
import { TaskStatus } from "@/constants/taskStatus.constant";

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
const Daily = () => {
  const onChangeTask = () => {};
  const renderSologan = () => {
    return (
      <Row>
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
  return (
    <div className="daily-container">
      <Row className="daily-header">
        <Col span={14} className="daily-header-left">
          <div className="daily-sologan">{renderSologan()}</div>
          <div className="daily-title">
            Today I am grateful for .............
          </div>
        </Col>
        <Col span={10}></Col>
      </Row>
      <Row className="card-container" gutter={[12, 12]}>
        <Col span={12}>
          <MCard
            title="Task"
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
    </div>
  );
};

export default Daily;
