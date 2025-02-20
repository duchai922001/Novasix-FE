import { Col, DatePicker, Empty, message, Modal, Row } from "antd";
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

const Daily = () => {
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
  const [dataTaskProgress, setDataTaskProgress] = useState<IDailyTask[]>([]);
  const [dataTaskDone, setDataTaskDone] = useState<IDailyTask[]>([]);

  const [chooseDate, setChooseDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const asyncTaskProgress = async () => {
    try {
      const response = await DailyService.getTaskDaily(chooseDate);
      setDataTaskProgress(response);
    } catch (error) {
      handleError(error);
    }
  };
  const asyncTaskDone = async () => {
    try {
      const response = await DailyService.getTaskDoneDaily(chooseDate);
      setDataTaskDone(response);
    } catch (error) {
      handleError(error);
    }
  };
  const handleModalTask = async () => {
    const { title, description, numberOfPomodoros, type, status } = formNewTask;
    if (!title || !numberOfPomodoros || !type) {
      return message.warning("Vui lòng nhập task");
    }
    try {
      const payloadTask = {
        title,
        description,
        numberOfPomodoros,
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

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setChooseDate(date.format("YYYY-MM-DD")); // Cập nhật ngày khi chọn
    }
  };
  useEffect(() => {
    asyncTaskProgress();
    asyncTaskDone();
  }, [chooseDate]);
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
  return (
    <div className="daily-container">
      <Row className="daily-header" gutter={[12, 12]}>
        <Col span={20} className="daily-header-left">
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
                      isEdit={true}
                      type={item.type}
                      task={item.title}
                      pomodoro={item.numberOfPomodoros}
                      description={item?.description}
                      status={item.status}
                      handleEdit={() => handleEditTask(item._id as string)}
                      handleDelete={() => handleDeleteTask(item._id as string)}
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
                      handleDelete={() => handleDeleteTask(item._id as string)}
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
  );
};

export default Daily;
