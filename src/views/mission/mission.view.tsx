import React, { useEffect, useState } from "react";
import { Button, Card, Collapse, message } from "antd";
import { UserService } from "@/services/user.service";
import { handleError } from "@/utils/catch-error";
import { WalletService } from "@/services/wallet.service";
import { MISSIONTYPE } from "@/constants/mission.constant";
import { MissionService } from "@/services/mission.service";

const { Panel } = Collapse;

const Mission = () => {
  const [selectedMission, setSelectedMission] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const missionCategories = [
    {
      title: "Tài khoản mới",
      missions: [
        {
          subTitle: "Cập nhật đầy đủ thông tin cá nhân",
          target: "Điền tất cả thông tin cá nhân",
          description: "Bạn cần nhập thông tin cá nhân để hoàn thành nhiệm vụ.",
          reward: 20,
          isReward: false,
          onlyOneReward: true,
        },
        {
          subTitle: "Tạo 1 task daily đầu tiên",
          target: "Tạo nhiệm vụ đầu tiên trong danh sách hằng ngày",
          description: "Bắt đầu bằng cách tạo một nhiệm vụ nhỏ.",
          reward: 20,
          isReward: userInfo?.onBoardDaily === 1,
        },
        {
          subTitle: "Tạo 1 task weekly đầu tiên",
          target: "Tạo nhiệm vụ đầu tiên trong danh sách hằng tuần",
          description: "Bắt đầu bằng cách tạo một nhiệm vụ nhỏ.",
          reward: 20,
          isReward: false,
        },
        {
          subTitle: "Tạo 1 task monthly đầu tiên",
          target: "Tạo cuộc hẹn đầu tiên trong tháng",
          description: "Bắt đầu vào tap monthly và tạo.",
          reward: 20,
          isReward: false,
        },
      ],
    },
    {
      title: "Nhiệm vụ hằng ngày",
      missions: [
        "Thực hiện 5 task",
        "Sử dụng 3 pomodoro",
        "Viết 1 lời biết ơn",
      ],
    },
    {
      title: "Nhiệm vụ hàng tuần",
      missions: ["Viết weekly reflection", "Sử dụng 14 pomodoro"],
    },
    {
      title: "Nhiệm vụ hằng tháng",
      missions: ["Sử dụng 60 pomodoro"],
    },
  ];

  const asyncUserCurrent = async () => {
    try {
      const response = await UserService.getUserCurrent();
      setUserInfo(response);
    } catch (error) {
      handleError(error);
    }
  };
  const handleReward = async (reward: number) => {
    try {
      const payload = {
        reward,
        type: MISSIONTYPE.ONBOARD_DAILY,
      };

      await MissionService.rewardToken(payload);
      setUserInfo((prev) => ({
        ...prev,
        onBoardDaily: 2,
      }));

      message.success("Nhận thưởng thành công");
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    asyncUserCurrent();
  }, []);

  return (
    <div className="mission-container" style={{ display: "flex", gap: "20px" }}>
      {/* Sidebar nhiệm vụ */}
      <div className="mission-sidebar" style={{ width: "30%" }}>
        <Collapse accordion className="mission-collapse">
          {missionCategories.map((category, index) => (
            <Panel
              header={
                <p style={{ fontWeight: "bold", color: "white" }}>
                  {category.title}
                </p>
              }
              key={index}
              className="mission-panel"
            >
              {category.missions.map((mission, idx) => (
                <p
                  key={idx}
                  className={`mission-item ${
                    selectedMission === mission ? "active" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    padding: "5px",
                    borderBottom: "1px solid #ddd",
                  }}
                  onClick={() =>
                    setSelectedMission(
                      typeof mission === "string"
                        ? { subTitle: mission } // Nếu chỉ là string, chuyển thành object
                        : mission
                    )
                  }
                >
                  {typeof mission === "string" ? mission : mission.subTitle}
                </p>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>

      {/* Nội dung nhiệm vụ */}
      <Card
        className="mission-content"
        style={{ width: "70%", padding: "20px" }}
      >
        <h2 className="mission-title">
          {selectedMission?.subTitle || "Chọn một nhiệm vụ"}
        </h2>

        {selectedMission && (
          <>
            <div className="mission-info">
              <strong>Mục tiêu:</strong>
              <span>
                {" "}
                {selectedMission.target || "Hoàn thành nhiệm vụ này"}{" "}
              </span>
            </div>

            <div className="mission-description">
              <strong>Miêu tả:</strong>
              <span>
                {" "}
                {selectedMission.description ||
                  "Hãy hoàn thành nhiệm vụ này để nhận thưởng!"}{" "}
              </span>
            </div>

            {/* Phần thưởng */}
            {selectedMission.reward && (
              <div className="mission-rewards">
                <strong>Thưởng:</strong>
                <p>🏅 {selectedMission.reward} token</p>
              </div>
            )}

            {/* Nút Nhận Thưởng */}
            <Button
              type="primary"
              className="mission-button"
              disabled={!selectedMission.isReward}
              onClick={() => handleReward(selectedMission.reward)}
            >
              Nhận thưởng
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default Mission;
