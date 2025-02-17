import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { FiInfo } from "react-icons/fi"; // Import icon từ react-icons

interface ChartData {
  content: string;
  generic: number;
}

interface PomodoroChartsProps {
  selectedFilter: string;
}

const PomodoroCharts: React.FC<PomodoroChartsProps> = ({ selectedFilter }) => {
  // Mô tả biểu đồ
  const chartDescriptions: Record<string, string> = {
    dailyTimeUsed: "Thời gian (phút) bạn sử dụng Pomodoro trong ngày.",
    dailyUser: "Số lần bạn bắt đầu phiên Pomodoro trong ngày.",
    weeklyTimeUsed: "Tổng thời gian sử dụng Pomodoro theo từng ngày trong tuần.",
    weeklyUser: "Số lần Pomodoro được sử dụng trong tuần.",
    monthlyTimeUsed: "Tổng thời gian sử dụng Pomodoro theo từng tuần trong tháng.",
    monthlyUser: "Số lần Pomodoro được sử dụng trong tháng.",
    yearlyTimeUsed: "Tổng thời gian sử dụng Pomodoro theo từng tháng trong năm.",
    yearlyUser: "Số lần Pomodoro được sử dụng trong năm.",
  };

  // Dữ liệu
  const data = {
    dailyTimeUsed: [
      { content: "06:00", generic: 2 }, { content: "08:00", generic: 5 },
      { content: "10:00", generic: 8 }, { content: "12:00", generic: 4 },
      { content: "14:00", generic: 7 }, { content: "16:00", generic: 6 },
      { content: "18:00", generic: 9 }, { content: "20:00", generic: 3 },
      { content: "22:00", generic: 1 },
    ],
    dailyUser: [
      { content: "06:00", generic: 1 }, { content: "08:00", generic: 3 },
      { content: "10:00", generic: 5 }, { content: "12:00", generic: 2 },
      { content: "14:00", generic: 6 }, { content: "16:00", generic: 4 },
      { content: "18:00", generic: 7 }, { content: "20:00", generic: 2 },
      { content: "22:00", generic: 1 },
    ],
    weeklyTimeUsed: [
      { content: "T2", generic: 11 }, { content: "T3", generic: 13 },
      { content: "T4", generic: 18 }, { content: "T5", generic: 18 },
      { content: "T6", generic: 2 }, { content: "T7", generic: 17 },
      { content: "CN", generic: 12 },
    ],
    weeklyUser: [
      { content: "T2", generic: 5 }, { content: "T3", generic: 6 },
      { content: "T4", generic: 7 }, { content: "T5", generic: 9 },
      { content: "T6", generic: 0 }, { content: "T7", generic: 3 },
      { content: "CN", generic: 8 },
    ],
    monthlyTimeUsed: [
      { content: "Tuần 1", generic: 40 }, { content: "Tuần 2", generic: 38 },
      { content: "Tuần 3", generic: 42 }, { content: "Tuần 4", generic: 35 },
    ],
    monthlyUser: [
      { content: "Tuần 1", generic: 15 }, { content: "Tuần 2", generic: 17 },
      { content: "Tuần 3", generic: 18 }, { content: "Tuần 4", generic: 14 },
    ],
    yearlyTimeUsed: [
      { content: "Tháng 1", generic: 150 }, { content: "Tháng 2", generic: 145 },
      { content: "Tháng 3", generic: 160 }, { content: "Tháng 4", generic: 170 },
      { content: "Tháng 5", generic: 155 }, { content: "Tháng 6", generic: 165 },
      { content: "Tháng 7", generic: 175 }, { content: "Tháng 8", generic: 180 },
      { content: "Tháng 9", generic: 168 }, { content: "Tháng 10", generic: 172 },
      { content: "Tháng 11", generic: 160 }, { content: "Tháng 12", generic: 158 },
    ],
    yearlyUser: [
      { content: "Tháng 1", generic: 60 }, { content: "Tháng 2", generic: 58 },
      { content: "Tháng 3", generic: 62 }, { content: "Tháng 4", generic: 65 },
      { content: "Tháng 5", generic: 61 }, { content: "Tháng 6", generic: 63 },
      { content: "Tháng 7", generic: 66 }, { content: "Tháng 8", generic: 69 },
      { content: "Tháng 9", generic: 64 }, { content: "Tháng 10", generic: 67 },
      { content: "Tháng 11", generic: 62 }, { content: "Tháng 12", generic: 61 },
    ],
  };

  // Render biểu đồ
  const RenderChart = (title: string, dataKey: keyof typeof data, colorFill: string, descriptionKey: string) => (
    <div className="chart-card" key={dataKey}>
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="info-icon">
          <FiInfo className="tooltip-icon" />
          <span className="tooltip-text">{chartDescriptions[descriptionKey]}</span>
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
          {RenderChart("Thời gian sử dụng Pomodoro (Ngày)", "dailyTimeUsed", "#4caf50", "dailyTimeUsed")}
          {RenderChart("Số lần sử dụng Pomodoro (Ngày)", "dailyUser", "#ff9800", "dailyUser")}
        </>
      )}
      {selectedFilter === "Week" && (
        <>
          {RenderChart("Thời gian sử dụng Pomodoro (Tuần)", "weeklyTimeUsed", "#4caf50", "weeklyTimeUsed")}
          {RenderChart("Số lần sử dụng Pomodoro (Tuần)", "weeklyUser", "#ff9800", "weeklyUser")}
        </>
      )}
      {selectedFilter === "Month" && (
        <>
          {RenderChart("Thời gian sử dụng Pomodoro (Tháng)", "monthlyTimeUsed", "#4caf50", "monthlyTimeUsed")}
          {RenderChart("Số lần sử dụng Pomodoro (Tháng)", "monthlyUser", "#ff9800", "monthlyUser")}
        </>
      )}
      {selectedFilter === "Year" && (
        <>
          {RenderChart("Thời gian sử dụng Pomodoro (Năm)", "yearlyTimeUsed", "#4caf50", "yearlyTimeUsed")}
          {RenderChart("Số lần sử dụng Pomodoro (Năm)", "yearlyUser", "#ff9800", "yearlyUser")}
        </>
      )}
    </div>
  );
};

export default PomodoroCharts;
