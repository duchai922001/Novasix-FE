import {
  Button,
  Col,
  DatePicker,
  Empty,
  message,
  Modal,
  Row,
  Spin,
  Typography,
} from "antd";
import { PlayCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ImageSologan from "@/assets/images/auth/image-sologan.png";
import MCard from "@/components/basicUI/m-card";
import MTask from "@/components/basicUI/m-task";
import { ActionType } from "@/constants/action.constant";
import MButton from "@/components/basicUI/m-button";
import MInput from "@/components/basicUI/m-input";
import MModal from "@/components/basicUI/m-modal";
import { handleError } from "@/utils/catch-error";
import { DailyService } from "@/services/daily.service";
import { InputTypes } from "@/constants/inputTypes.constant";
import MSelect from "@/components/basicUI/m-select";
import { IDailyTask } from "@/types/daily.interface";
import { TypeTask } from "@/constants/type-task.constant";
import { StatusTask } from "@/constants/status-task.constant";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { PomodoroService } from "@/services/pomodoro.service";
import { QuoteSerivce } from "@/services/quote.service";
import Loader from "@/components/loading";
import { TaskUsageService } from "@/services/task-usage.service";
import  MImojiListComponent from "@/components/basicUI/m-imoji-list-component";
import LoginItem from "@/assets/images/unauth/LoginItem.gif";

const { Title, Text } = Typography;
const Daily = () => {
  const navigate = useNavigate();
  const MAX_POMODOROS = 5;
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

  const statusTask = [
    {
      value: StatusTask.NOT_YET,
      label: "Not yet",
    },
    {
      value: StatusTask.DOING,
      label: "Doing",
    },
    {
      value: StatusTask.DONE,
      label: "Done",
    },
    {
      value: StatusTask.CANCEL,
      label: "Cancel",
    },
  ];
  const [pomodoroUser, setPomodoroUser] = useState({
    pomodoroTimer: 0,
    breakTimer: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedEdit, setSelectedEdit] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formNewTask, setFormNewTask] = useState<IDailyTask>({
    title: "",
    description: "",
    attachedFile: "",
    numberOfPomodoros: 0,
    type: "",
    status: StatusTask.NOT_YET,
  });
  const [openStartTask, setOpenStartTask] = useState<boolean>(false);
  const [dataTaskProgress, setDataTaskProgress] = useState<IDailyTask[]>([]);
  const [dataTaskDone, setDataTaskDone] = useState<IDailyTask[]>([]);
  const [selectTaskStart, setSelectTaskStart] = useState<IDailyTask>({
    title: "",
    description: "",
    attachedFile: "",
    numberOfPomodoros: 0,
    type: "",
    status: StatusTask.NOT_YET,
  });
  const [dataQuote, setDataQuote] = useState({
    image: "",
    description: "",
    author: "",
  });
  const [chooseDate, setChooseDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const asyncTaskProgress = async () => {
    try {
      setIsLoading(true);
      const response = await DailyService.getTaskDaily(chooseDate);
      setDataTaskProgress(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const asyncTaskDone = async () => {
    try {
      setIsLoading(true);
      const response = await DailyService.getTaskDoneDaily(chooseDate);
      setDataTaskDone(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleModalTask = async () => {
    const { title, description, numberOfPomodoros, type, status } = formNewTask;
    if (!title || !type) {
      return message.warning("Vui lòng nhập task");
    }
    try {
      const payloadTask = {
        title,
        description,
        numberOfPomodoros: numberOfPomodoros ?? 0,
        type,
        status,
      };

      if (!selectedEdit) {
        await DailyService.createNewTask(payloadTask);

        message.success("Tạo task thành công");
      } else {
        await DailyService.updateDailyTask(selectedEdit, payloadTask);
        setSelectedEdit("");
        message.success("Cập nhật thành công");
      }

      setFormNewTask({
        title: "",
        description: "",
        attachedFile: "",
        numberOfPomodoros: 0,
        type: "",
      });

      await asyncTaskProgress();
      await asyncTaskDone();
      setIsOpenModal(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditTask = (taskId: string) => {
    const findTaskEdit: IDailyTask | undefined = dataTaskProgress.find(
      (task) => task._id === taskId
    );
    setSelectedEdit(taskId);
    setFormNewTask({
      title: findTaskEdit?.title,
      description: findTaskEdit?.description,
      attachedFile: findTaskEdit?.attachedFile,
      numberOfPomodoros: findTaskEdit?.numberOfPomodoros,
      type: findTaskEdit?.type,
      status: findTaskEdit?.status,
    });
    setIsOpenModal(true);
  };
  const handleDeleteTask = (taskId: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa task này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await DailyService.deleteDailyTask(taskId);
          message.success("Xóa task thành công");
          asyncTaskProgress();
          asyncTaskDone();
        } catch (error) {
          handleError(error);
        }
      },
      onCancel: () => {
        console.log("Hủy xóa");
      },
    });
  };
  const asyncDataPomodoroUser = async () => {
    try {
      setIsLoading(true);
      const response = await PomodoroService.getPomodoroOfUser();
      setPomodoroUser(response);
    } finally {
      setIsLoading(false);
    }
  };
  const asyncQuotes = async () => {
    try {
      setIsLoading(true);
      const response = await QuoteSerivce.getRandomQuote();
      setDataQuote(response);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setChooseDate(date.format("YYYY-MM-DD")); // Cập nhật ngày khi chọn
    }
  };
  useEffect(() => {
    asyncTaskProgress();
    asyncTaskDone();
  }, [chooseDate]);
  useEffect(() => {
    asyncQuotes();
    asyncDataPomodoroUser();
  }, []);
  const renderAddNewTask = () => {
    return (
      <>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <MInput
              value={formNewTask.title}
              title="New Task"
              placeholder="Your task's name"
              onChange={(e) =>
                setFormNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </Col>
          <Col span={12}>
            <MSelect
              disabled={selectedEdit === "" ? true : false}
              value={formNewTask.status}
              options={statusTask}
              title="Task Staus"
              onChange={(value) =>
                setFormNewTask((prev) => ({ ...prev, status: value as string }))
              }
            />
          </Col>
          <Col span={24}>
            <MInput
              value={formNewTask.description}
              title="Description"
              onChange={(e) =>
                setFormNewTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </Col>
          <Col span={12}>
            <MInput
              value={formNewTask.numberOfPomodoros}
              type={InputTypes.NUMBER}
              title="Pomodoros"
              min={1}
              max={5}
              onChange={(e) =>
                setFormNewTask((prev) => ({
                  ...prev,
                  numberOfPomodoros:
                    Number(e.target.value) >= MAX_POMODOROS
                      ? MAX_POMODOROS
                      : Number(e.target.value),
                }))
              }
            />
          </Col>
          <Col span={12}>
            <MSelect
              value={formNewTask.type}
              options={optionTask}
              title="Task type"
              onChange={(value) =>
                setFormNewTask((prev) => ({ ...prev, type: value as string }))
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
      </>
    );
  };
  const renderSologan = () => {
    return (
      <Row style={{ height: "100%" }}>
        <Col span={18} className="sologan-des">
          <p className="title">{dataQuote.description}</p>
          <p className="author">---{dataQuote.author}---</p>
        </Col>
        <Col span={6}>
          <img src={dataQuote.image} className="image-slg" />
        </Col>
      </Row>
    );
  };

  const handleAddNewTask = () => {
    setFormNewTask({
      title: "",
      description: "",
      attachedFile: "",
      numberOfPomodoros: 0,
      type: "",
      status: StatusTask.NOT_YET,
    });
    setSelectedEdit("");
    setIsOpenModal(true);
  };
  const handleCloseStartTask = () => {
    setOpenStartTask(false);
  };
  const handleSelectTaskStart = async (id: string) => {
    try {
      const response = await DailyService.getTaskDailyById(id);
      setSelectTaskStart(response);
    } catch {
      message.error("Lỗi hệ thống vui lòng thử lại sau");
    }
  };
  const handleCompleTask = async () => {
    try {
      await DailyService.updateDailyTask(selectedEdit, {
        status: StatusTask.DONE,
      });
      setOpenStartTask(false);

      asyncTaskDone();
      asyncTaskProgress();
    } catch {
      message.error("Lỗi hệ thống vui lòng thử lại sau");
    }
  };

  const handleLogTimeTask = async () => {
    try {
      const startTime = new Date();
      const endTime = new Date(
        startTime.getTime() +
          (pomodoroUser.breakTimer + pomodoroUser.pomodoroTimer) *
            (selectTaskStart.numberOfPomodoros ?? 1) *
            60000
      );
      const payload = {
        startTime,
        endTime,
      };
      await TaskUsageService.logTimeTask(payload);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="daily-container">
            <Row className="daily-header" gutter={[12, 12]}>
              <Col span={10} className="daily-header-left">
                <div className="daily-sologan">{renderSologan()}</div>
                <div className="daily-title">
                  Today I am grateful for .............
                </div>
              </Col>
              <Col span={4}>
                {" "}
                <DatePicker
                  className="custom-datepicker"
                  onChange={handleDateChange}
                  defaultValue={dayjs()}
                  format="YYYY-MM-DD"
                />
                <img className="custom-gif" src={LoginItem} alt="gif"/>
              </Col>
              <Col span={10}>
                <MImojiListComponent />
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
                      {dataTaskProgress.length === 0 ? (
                        <>
                          {" "}
                          <Empty
                            style={{ marginTop: "24px" }}
                            description="Hôm nay không có task nào"
                          />
                        </>
                      ) : (
                        dataTaskProgress.map((item) => (
                          <MTask
                            onClick={() => {
                              setOpenStartTask(true);
                              handleSelectTaskStart(item._id as string);
                              setSelectedEdit(item._id as string);
                            }}
                            isEdit={true}
                            type={item.type}
                            task={item.title}
                            pomodoro={item.numberOfPomodoros}
                            description={item?.description}
                            status={item.status}
                            handleEdit={() =>
                              handleEditTask(item._id as string)
                            }
                            handleDelete={() =>
                              handleDeleteTask(item._id as string)
                            }
                          />
                        ))
                      )}
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
                      {dataTaskDone.length === 0 ? (
                        <Empty
                          style={{ marginTop: "24px" }}
                          description="Không có task nào hoàn thành"
                        />
                      ) : (
                        dataTaskDone.map((item) => (
                          <MTask
                            key={item._id}
                            isEdit={false}
                            type={item.type}
                            status={item.status}
                            task={item.title}
                            pomodoro={item.numberOfPomodoros}
                            description={item.description}
                            handleDelete={() =>
                              handleDeleteTask(item._id as string)
                            }
                          />
                        ))
                      )}
                    </>
                  )}
                />
              </Col>
            </Row>
            <MModal
              width={800}
              isOpen={isOpenModal}
              onClose={() => setIsOpenModal(false)}
              title={selectedEdit === "" ? "New Task" : "Edit Task"}
              renderContent={() => <>{renderAddNewTask()}</>}
            />
          </div>
          <Modal
            open={openStartTask}
            title="📝 Task của bạn"
            onCancel={handleCloseStartTask}
            width={600}
            footer={null}
            centered
            style={{ borderRadius: "12px" }}
          >
            <Row
              gutter={[12, 12]}
              justify="center"
              style={{ textAlign: "center" }}
            >
              {/* Tiêu đề Task */}
              <Col span={24}>
                <Title
                  level={4}
                  style={{ color: "#1890ff", fontWeight: "bold" }}
                >
                  {selectTaskStart?.title || "Chưa có tiêu đề"}
                </Title>
              </Col>

              {/* Mô tả Task */}
              <Col span={24}>
                <Text type="danger" style={{ fontSize: "16px" }}>
                  {selectTaskStart?.description || "Không có mô tả"}
                </Text>
              </Col>

              {/* Nút bấm */}
              <Col span={24}>
                <Button
                  type={
                    selectTaskStart?.numberOfPomodoros &&
                    selectTaskStart?.numberOfPomodoros > 0
                      ? "primary"
                      : "default"
                  }
                  size="large"
                  icon={
                    selectTaskStart?.numberOfPomodoros &&
                    selectTaskStart?.numberOfPomodoros > 0 ? (
                      <PlayCircleOutlined />
                    ) : (
                      <CheckCircleOutlined />
                    )
                  }
                  style={{
                    background:
                      selectTaskStart?.numberOfPomodoros &&
                      selectTaskStart?.numberOfPomodoros > 0
                        ? "#52c41a"
                        : "#faad14",
                    borderColor: "transparent",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    width: "200px",
                    height: "45px",
                  }}
                  onClick={() => {
                    if (
                      selectTaskStart?.numberOfPomodoros &&
                      selectTaskStart.numberOfPomodoros > 0
                    ) {
                      handleLogTimeTask();
                      navigate(`/pomodoro/${selectTaskStart._id}`);
                    } else {
                      handleCompleTask();
                    }
                  }}
                >
                  {selectTaskStart?.numberOfPomodoros &&
                  selectTaskStart?.numberOfPomodoros > 0
                    ? "Bắt đầu"
                    : "Hoàn thành"}
                </Button>
              </Col>
            </Row>
          </Modal>
        </>
      )}
    </>
  );
};

export default Daily;
