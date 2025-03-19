import { Button, Card, Modal, Spin } from "antd";
import { SettingOutlined, BarChartOutlined } from "@ant-design/icons";
import "../../styles/pages/pomodoroPage.scss";
import { useEffect, useState } from "react";
import { IDailyTask } from "@/types/daily.interface";
import { StatusTask } from "@/constants/status-task.constant";
import { useNavigate, useParams } from "react-router-dom";
import { DailyService } from "@/services/daily.service";
import { PomodoroService } from "@/services/pomodoro.service";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";
import { FaSadTear } from "react-icons/fa";
const Pomodoro = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const NUMBER_TIMER = 1;
  const { taskId } = useParams();
  const [secondsRemaining, setSecondsRemaining] = useState(25 * NUMBER_TIMER);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [pomodoroUser, setPomodoroUser] = useState({
    pomodoroTimer: 0,
    breakTimer: 0,
  });
  const [tastStart, setTaskStart] = useState<IDailyTask>({
    title: "",
    description: "",
    attachedFile: "",
    numberOfPomodoros: 1,
    type: "",
    status: StatusTask.NOT_YET,
  });
  const asyncDataTask = async () => {
    try {
      setIsLoading(true);
      const response = await DailyService.getTaskDailyById(taskId ?? "");
      setTaskStart(response);
    } finally {
      setIsLoading(false);
    }
  };
  const asyncDataPomodoroUser = async () => {
    try {
      setIsLoading(true);
      const response = await PomodoroService.getPomodoroOfUser();
      if (response) {
        setPomodoroUser(response);
        setSecondsRemaining(response.pomodoroTimer * NUMBER_TIMER);
        setIsRunning(true);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    asyncDataTask();
    asyncDataPomodoroUser();
  }, []);

  const completeTask = async () => {
    try {
      await DailyService.updateDailyTask(taskId ?? "", {
        status: StatusTask.DONE,
      });
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
        navigate("/daily");
      }, 8000);
    } catch (error) {
      console.error("Lỗi cập nhật task:", error);
    }
  };
  useEffect(() => {
    let timer;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      if (cycleCount < (tastStart.numberOfPomodoros ?? 1)) {
        if (!isBreak) {
          setIsBreak(true);
          setSecondsRemaining(pomodoroUser.breakTimer * NUMBER_TIMER);
        } else {
          setIsBreak(false);
          setSecondsRemaining(pomodoroUser.pomodoroTimer * NUMBER_TIMER);
          setCycleCount((prev) => prev + 1);
        }
        setIsRunning(true);
      } else {
        setIsRunning(false);
        completeTask();
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  // Hiện nút "Hoàn thành" sau 15 phút
  useEffect(() => {
    if (secondsRemaining <= 15 * NUMBER_TIMER) {
      setShowCompleteButton(true);
    }
  }, [secondsRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleCancel = () => {
    setIsRunning(false);
    Modal.confirm({
      title: "Xác nhận hủy",
      content:
        "Oh No, Bạn đã cố gắng đến đây rồi cố thêm chút nữa đừng bỏ cuộc...",
      okText: "Xác nhận",
      cancelText: "Hủy",
      icon: (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSadTear size={40} color="gray" />
        </motion.div>
      ),
      onOk: () => {
        navigate("/daily");
      },
      onCancel: () => {
        setIsRunning(true);
      },
    });
  };
  const handleCompleted = () => {
    setIsRunning(false);
    Modal.confirm({
      title: "Xác nhận hoàn thành",
      content:
        "Bạn có chắc đã hoàn thành công việc hiện tại không, thời gian vẫn còn cố làm tiếp nhé",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: completeTask,
      onCancel: () => {
        setIsRunning(true);
      },
    });
  };

  useEffect(() => {
    if (showConfetti) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showConfetti]);
  return (
    <Spin spinning={isLoading}>
      {showConfetti && <Confetti width={width} height={height} />}

      <div
        className="container"
        style={{ backgroundColor: isBreak ? "#38858a" : "#c04b46" }}
      >
        <header className="header">
          <div className="header-buttons">
            <Button icon={<BarChartOutlined />} className="header-btn">
              Report
            </Button>
            <Button icon={<SettingOutlined />} className="header-btn">
              Setting
            </Button>
          </div>
        </header>

        <Card className="timer-card">
          <div className="task-section">
            <h3>{tastStart.title}</h3>
          </div>
          {isBreak && (
            <div style={{ fontSize: "24px" }}>Nghỉ ngơi thôi nào !!!</div>
          )}

          <div style={{ textAlign: "center", color: "white" }}>
            <h1 className="timer">{formatTime(secondsRemaining)}</h1>

            {showCompleteButton ? (
              <Button type="primary" onClick={handleCompleted}>
                Hoàn thành
              </Button>
            ) : (
              <Button type="primary" disabled>
                Hoàn thành sớm (chờ 15')
              </Button>
            )}

            <Button danger style={{ marginLeft: 10 }} onClick={handleCancel}>
              Hủy
            </Button>
          </div>
        </Card>
      </div>
    </Spin>
  );
};

export default Pomodoro;
