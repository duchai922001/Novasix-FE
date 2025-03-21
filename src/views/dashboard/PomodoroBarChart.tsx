import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FiInfo } from "react-icons/fi"; // Import icon từ react-icons
import { handleError } from "@/utils/catch-error";
import { TaskUsageService } from "@/services/task-usage.service";

interface PomodoroChartsProps {
  selectedFilter: string;
}

const PomodoroCharts: React.FC<PomodoroChartsProps> = ({ selectedFilter }) => {
  const [analysisDaily, setAnalysisDaily] = useState();
  const [analysisWeek, setAnalysisWeek] = useState();
  const [analysisMonth, setAnalysisMonth] = useState();
  const [analysisYear, setAnalysisYear] = useState();

  const asyncAnalysisDaily = async () => {
    try {
      const response = await TaskUsageService.getTaskUsageByHour();
      setAnalysisDaily(response);
    } catch (error) {
      handleError(error);
    }
  };
  const asyncAnalysisWeek = async () => {
    try {
      const response = await TaskUsageService.getTaskUsageByWeek();
      setAnalysisWeek(response);
    } catch (error) {
      handleError(error);
    }
  };
  const asyncAnalysisMonth = async () => {
    try {
      const response = await TaskUsageService.getTaskUsageByMonth();
      setAnalysisMonth(response);
    } catch (error) {
      handleError(error);
    }
  };
  const asyncAnalysisYear = async () => {
    try {
      const response = await TaskUsageService.getTaskUsageByYear();
      setAnalysisYear(response);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    asyncAnalysisDaily();
    asyncAnalysisWeek();
    asyncAnalysisMonth();
    asyncAnalysisYear();
  }, []);

  // Mô tả biểu đồ
  const chartDescriptions: Record<string, string> = {
    dailyTimeUsed: "Thời gian (phút) bạn sử dụng Pomodoro trong ngày.",
    weeklyTimeUsed:
      "Tổng thời gian sử dụng Pomodoro theo từng ngày trong tuần.",
    monthlyTimeUsed:
      "Tổng thời gian sử dụng Pomodoro theo từng tuần trong tháng.",
    yearlyTimeUsed:
      "Tổng thời gian sử dụng Pomodoro theo từng tháng trong năm.",
  };

  // Dữ liệu
  const data = {
    dailyTimeUsed: analysisDaily,

    weeklyTimeUsed: analysisWeek,

    monthlyTimeUsed: analysisMonth,

    yearlyTimeUsed: analysisYear,
  };

  // Render biểu đồ
  const RenderChart = (
    title: string,
    dataKey: keyof typeof data,
    colorFill: string,
    descriptionKey: string
  ) => (
    <div className="chart-card" key={dataKey}>
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="info-icon">
          <FiInfo className="tooltip-icon" />
          <span className="tooltip-text">
            {chartDescriptions[descriptionKey]}
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data[dataKey]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="content" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="generic" fill={colorFill} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="charts-container">
      {selectedFilter === "Day" && (
        <>
          {RenderChart(
            "Thời gian sử dụng Pomodoro (Ngày)",
            "dailyTimeUsed",
            "#4caf50",
            "dailyTimeUsed"
          )}
        </>
      )}
      {selectedFilter === "Week" && (
        <>
          {RenderChart(
            "Thời gian sử dụng Pomodoro (Tuần)",
            "weeklyTimeUsed",
            "#4caf50",
            "weeklyTimeUsed"
          )}
        </>
      )}
      {selectedFilter === "Month" && (
        <>
          {RenderChart(
            "Thời gian sử dụng Pomodoro (Tháng)",
            "monthlyTimeUsed",
            "#4caf50",
            "monthlyTimeUsed"
          )}
        </>
      )}
      {selectedFilter === "Year" && (
        <>
          {RenderChart(
            "Thời gian sử dụng Pomodoro (Năm)",
            "yearlyTimeUsed",
            "#4caf50",
            "yearlyTimeUsed"
          )}
        </>
      )}
    </div>
  );
};

export default PomodoroCharts;
