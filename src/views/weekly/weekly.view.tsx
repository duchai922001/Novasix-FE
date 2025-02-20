import { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Button,
  DatePicker,
  Row,
  Col,
  Tooltip,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  FaExclamationCircle,
  FaFire,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import dayjs from "dayjs";
import MCard from "@/components/basicUI/m-card";
import MButton from "@/components/basicUI/m-button";
import MCheckbox from "@/components/basicUI/m-checkbox";
import { InputTypes } from "@/constants/inputTypes.constant";
import MInput from "@/components/basicUI/m-input";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import MModal from "@/components/basicUI/m-modal";
import { TypeTask } from "@/constants/type-task.constant";
import MSelect from "@/components/basicUI/m-select";
import { IFormTaskWeek } from "@/types/weekly.interface";
import { handleError } from "@/utils/catch-error";
import { WeeklyService } from "@/services/week.service";

const { Header, Content } = Layout;
interface IFormWeekly {
  title: string;
  type: InputTypes;
  placeholder?: string;
}
const categories = [
  {
    title: "Important - Not Urgent",
    key: TypeTask.IMPORTANCE_NOT_URGENCY,
    index: "important_not_urgent",
    color: "#FFA500",
    icon: <FaClock />,
  },
  {
    title: "Important - Urgent",
    key: TypeTask.IMPORTANCE_URGENCY,
    index: "important_urgent",
    color: "#FF4500",
    icon: <FaFire />,
  },
  {
    title: "Not Important - Urgent",
    key: TypeTask.NOT_IMPORTANCE_URGENCY,
    index: "not_important_urgent",
    color: "#FF69B4",
    icon: <FaExclamationCircle />,
  },
  {
    title: "Not Important - Not Urgent",
    key: TypeTask.NOT_IMPORTANCE_NOT_URGENCY,
    index: "not_important_not_urgent",
    color: "#32CD32",
    icon: <FaCheckCircle />,
  },
];

const Weekly = () => {
  const [formTaskWeek, setFormTaskWeek] = useState<IFormTaskWeek>({
    name: "",
    type: "",
  });
  const [tasksWeek, setTasksWeek] = useState({
    important_not_urgent: [],
    important_urgent: [],
    not_important_urgent: [],
    not_important_not_urgent: [],
  });
  const [selectedWeek, setSelectedWeek] = useState(dayjs());
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const formWeekly: IFormWeekly[] = [
    {
      title: "Checkin",
      type: InputTypes.TEXT,
      placeholder: "How did  I feel this week?",
    },
    {
      title: "Success",
      type: InputTypes.TEXT,
      placeholder: "What am I proud of?",
    },
    {
      title: "Lesson",
      type: InputTypes.TEXT,
      placeholder: "What did I learn?",
    },
    {
      title: "Future",
      type: InputTypes.TEXT,
      placeholder: "How can I improve next week?",
    },
    {
      title: "Space for more reflection",
      type: InputTypes.TEXTAREA,
      placeholder: "Highlight of the week...",
    },
    {
      title: "Make sure to check this week's Weekly Planning!",
      type: InputTypes.CHECKBOX,
    },
  ];
  const optionTask = [
    {
      value: TypeTask.IMPORTANCE_NOT_URGENCY,
      label: "Important Not Urgency",
    },
    {
      value: TypeTask.IMPORTANCE_URGENCY,
      label: "Important Urgency",
    },
    {
      value: TypeTask.NOT_IMPORTANCE_NOT_URGENCY,
      label: "Not Important Not Urgency",
    },
    {
      value: TypeTask.NOT_IMPORTANCE_URGENCY,
      label: "Not Important Urgency",
    },
  ];
  const handleAddTaskWeek = (type: string) => {
    setFormTaskWeek((prev) => ({
      ...prev,
      type,
    }));
    setIsOpenModal(true);
  };
  const onChangeCondition = (e: CheckboxChangeEvent, value: string) => {
    setSelectedCondition((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const renderFormWeekly = (item: IFormWeekly) => {
    switch (item.type) {
      case InputTypes.TEXT:
        return (
          <MInput
            title={item.title}
            type={InputTypes.TEXT}
            placeholder={item.placeholder}
          />
        );

      case InputTypes.TEXTAREA:
        return (
          <MInput
            title={item.title}
            type={InputTypes.TEXTAREA}
            placeholder={item.placeholder}
          />
        );
      case InputTypes.CHECKBOX:
        return (
          <MCheckbox
            title={item.title}
            value={selectedCondition.includes(item.title)}
            onChange={onChangeCondition}
          />
        );
    }
  };
  const handleModalTask = async () => {
    const { name, type } = formTaskWeek;
    if (!name || !type) {
      return message.warning("Vui lòng điền đầy đủ thông tin");
    }
    try {
      const payload = {
        name,
        type,
      };
      await WeeklyService.createTaskWeek(payload);
      setFormTaskWeek({
        name: "",
        type: "",
      });
      setIsOpenModal(false);
      asyncDataTasksWeek();
      message.success("Tạo task thành công");
    } catch (error) {
      handleError(error);
    }
  };
  const renderModalTaskWeek = () => {
    return (
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <MInput
            title="Name Task"
            value={formTaskWeek.name}
            onChange={(e) =>
              setFormTaskWeek((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Col>

        <Col span={24}>
          <MSelect
            value={formTaskWeek.type}
            options={optionTask}
            title="Task type"
            disabled={true}
            onChange={(value) =>
              setFormTaskWeek((prev) => ({ ...prev, type: value as string }))
            }
          />
        </Col>
        <Col span={24}>
          <Row gutter={[12, 12]} justify={"start"} style={{ width: "50%" }}>
            <Col>
              <MButton title="Cancel" onClick={() => setIsOpenModal(false)} />
            </Col>
            <Col>
              <MButton
                title="Confirm"
                type="fill"
                onClick={() => handleModalTask()}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  const asyncDataTasksWeek = async () => {
    try {
      const dateWeek = selectedWeek.startOf("week").format("YYYY-MM-DD");
      const response = await WeeklyService.getTasksWeek(dateWeek);
      const categorizedTasks = {
        important_not_urgent: [],
        important_urgent: [],
        not_important_urgent: [],
        not_important_not_urgent: [],
      };

      response.forEach((task) => {
        switch (task.type) {
          case "Importance_Not_Urgency":
            categorizedTasks.important_not_urgent.push(task);
            break;
          case "Importance_Urgency":
            categorizedTasks.important_urgent.push(task);
            break;
          case "Not_Importance_Urgency":
            categorizedTasks.not_important_urgent.push(task);
            break;
          case "Not_Importance_Not_Urgency":
            categorizedTasks.not_important_not_urgent.push(task);
            break;
          default:
            break;
        }
      });

      setTasksWeek(categorizedTasks);
    } catch (error) {
      handleError(error);
    }
  };
  const handleCheckTask = async (categoryKey: string, taskId: string) => {
    try {
      setTasksWeek((prevTasks) => ({
        ...prevTasks,
        [categoryKey]: prevTasks[categoryKey].map((task: any) =>
          task._id === taskId ? { ...task, isChecked: !task.isChecked } : task
        ),
      }));

      // Lấy giá trị mới của isChecked
      const updatedTask = tasksWeek[categoryKey].find(
        (task) => task._id === taskId
      );
      const newCheckedValue = !updatedTask.isChecked;

      await WeeklyService.updateDailyTask(taskId, {
        name: updatedTask.name,
        type: updatedTask.type,
        isChecked: newCheckedValue,
      });
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    asyncDataTasksWeek();
  }, [selectedWeek]);
  return (
    <Layout style={{ padding: "20px", background: "#f0f2f5" }}>
      <Header
        style={{
          background: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Task Weekly - WELCOME!</h2>
        <DatePicker
          picker="week"
          value={selectedWeek}
          onChange={(date) => setSelectedWeek(date)}
        />
      </Header>

      <Content style={{ marginTop: 20 }}>
        <Row gutter={[16, 16]} style={{ marginBottom: 12 }}>
          {categories.map((category) => (
            <Col xs={24} sm={12} md={6} key={category.key}>
              <Card
                title={
                  <Tooltip title={category.title}>
                    <span
                      style={{
                        color: category.color,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                      }}
                    >
                      {category.icon}{" "}
                      {category.title.length > 18
                        ? `${category.title.slice(0, 15)}...`
                        : category.title}
                    </span>
                  </Tooltip>
                }
                extra={
                  <Button
                    type="dashed"
                    onClick={() => handleAddTaskWeek(category.key)}
                    icon={<PlusOutlined />}
                  />
                }
              >
                {tasksWeek[category.index]?.map((task: any, index: any) => (
                  <p>
                    <span>
                      <MCheckbox
                        title={task.name}
                        value={task.isChecked}
                        onChange={() =>
                          handleCheckTask(category.index, task._id)
                        }
                      />
                    </span>
                  </p>
                ))}
              </Card>
            </Col>
          ))}
        </Row>

        <MCard
          title="Weekly reflection"
          renderContent={() => (
            <>{formWeekly.map((item) => renderFormWeekly(item))}</>
          )}
          styleContent={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
          renderAction={() => (
            <div style={{ display: "flex", gap: 12 }}>
              <MButton title="Edit" />

              <MButton title="Save" type="fill" />
            </div>
          )}
        />
      </Content>
      <MModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="New task weekly"
        width={800}
        renderContent={() => renderModalTaskWeek()}
      />
    </Layout>
  );
};

export default Weekly;
