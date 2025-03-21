import React, { useEffect, useState } from "react";
import PomodoroCharts from "@/views/dashboard/PomodoroBarChart";
import { handleError } from "@/utils/catch-error";
import { DashboardService } from "@/services/dashboard.service";
import Loader from "@/components/loading";
import { TaskUsageService } from "@/services/task-usage.service";

interface Task {
  number: number;
  TypeTask: string;
  percentYesterday?: string;
  percentLastWeek?: string;
  percentLastMonth?: string;
  percentLastYear?: string;
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("Day");
  const [dataDaily, setDataDaily] = useState();
  const [dataWeekly, setDataWeekly] = useState();
  const [dataMonthly, setDataMonthly] = useState();
  const [dataYearly, setDataYearly] = useState();
  const [timeMost, setTimeMost] = useState({
    timeFrame: "",
    totalDuration: 0,
  });
  // Dữ liệu động theo bộ lọc
  const getTaskData = (): Task[] => {
    switch (selectedFilter) {
      case "Day":
        return [
          {
            number: dataDaily?.tasksSuccess.total,
            TypeTask: "Task hoàn thành",
            percentYesterday: `${dataDaily?.tasksSuccess.percent}% ngày hôm qua`,
          },
          {
            number: dataDaily?.tasksProgress.total,
            TypeTask: "Task chưa hoàn thành",
            percentYesterday: `${dataDaily?.tasksProgress.percent}% ngày hôm qua`,
          },
          {
            number: dataDaily?.totalPomodoros.total,
            TypeTask: "Thời lần dùng Pomodoro",
            percentYesterday: `${dataDaily?.totalPomodoros.percent}% ngày hôm qua`,
          },
        ];
      case "Week":
        return [
          {
            number: dataWeekly?.tasksSuccess.total,
            TypeTask: "Task hoàn thành",
            percentLastWeek: `${dataWeekly?.tasksSuccess.percent}% tuần trước`,
          },
          {
            number: dataWeekly?.tasksProgress.total,
            TypeTask: "Task chưa hoàn thành",
            percentLastWeek: `${dataWeekly?.tasksProgress.percent}% tuần trước`,
          },
          {
            number: dataWeekly?.totalPomodoros.total,
            TypeTask: "Thời lần dùng Pomodoro",
            percentLastWeek: `${dataWeekly?.totalPomodoros.percent}% tuần trước`,
          },
        ];
      case "Month":
        return [
          {
            number: dataMonthly?.tasksSuccess.total,
            TypeTask: "Task hoàn thành",
            percentLastMonth: `${dataMonthly?.tasksSuccess.percent}% tháng trước`,
          },
          {
            number: dataMonthly?.tasksProgress.total,
            TypeTask: "Task chưa hoàn thành",
            percentLastMonth: `${dataMonthly?.tasksProgress.percent}% tháng trước`,
          },
          {
            number: dataMonthly?.totalPomodoros.total,
            TypeTask: "Thời lần dùng Pomodoro",
            percentLastMonth: `${dataMonthly?.totalPomodoros.percent}% tháng trước`,
          },
        ];

      case "Year":
        return [
          {
            number: dataYearly?.tasksSuccess.total,
            TypeTask: "Task hoàn thành",
            percentLastYear: `${dataYearly?.tasksSuccess.percent}% năm trước`,
          },
          {
            number: dataYearly?.tasksProgress.total,
            TypeTask: "Task chưa hoàn thành",
            percentLastYear: `${dataYearly?.tasksProgress.percent}% năm trước`,
          },
          {
            number: dataYearly?.totalPomodoros.total,
            TypeTask: "Thời lần dùng Pomodoro",
            percentLastYear: `${dataYearly?.totalPomodoros.percent}% năm trước`,
          },
        ];

      default:
        return [];
    }
  };
  const asyncDataWeekly = async () => {
    try {
      setIsLoading(true);
      const response = await DashboardService.getDashboardWeekly();
      setDataWeekly(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const asyncDataMonthly = async () => {
    try {
      setIsLoading(true);
      const response = await DashboardService.getDashboardMonthly();
      setDataMonthly(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const asyncDataYearly = async () => {
    try {
      setIsLoading(true);
      const response = await DashboardService.getDashboardYearly();
      setDataYearly(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const asyncDataDaily = async () => {
    try {
      setIsLoading(true);
      const response = await DashboardService.getDashboardDaily();
      setDataDaily(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const asyncDataMostTime = async () => {
    try {
      setIsLoading(true);
      const response = await TaskUsageService.getTimeMostUser();
      setTimeMost(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    asyncDataDaily();
    asyncDataMostTime();
    asyncDataWeekly();
    asyncDataMonthly();
    asyncDataYearly();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard-container">
          {/* Filter Buttons */}
          <div className="filter-buttons">
            {["Day", "Week", "Month", "Year"].map((filter) => (
              <button
                key={filter}
                className={selectedFilter === filter ? "active" : ""}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Most Focused & Distracting Time */}
          <div className="stats-row">
            <div className="stat-box focus">
              <p>Khung giờ tập trung</p>
              <h2>{timeMost.timeFrame}</h2>
            </div>
            <div className="stat-box distract">
              <p>Tổng số phút bạn làm</p>
              <h2>{timeMost.totalDuration} phút</h2>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards">
            {getTaskData().map((item) => (
              <div key={item.TypeTask} className="card tasks">
                <h2>{item.number}</h2>
                <p>{item.TypeTask}</p>
                <span className="change">
                  {selectedFilter === "Day" && item.percentYesterday}
                  {selectedFilter === "Week" && item.percentLastWeek}
                  {selectedFilter === "Month" && item.percentLastMonth}
                  {selectedFilter === "Year" && item.percentLastYear}
                </span>
              </div>
            ))}
          </div>

          {/* Biểu đồ theo bộ lọc */}
          <div className="charts-container">
            <PomodoroCharts selectedFilter={selectedFilter} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
