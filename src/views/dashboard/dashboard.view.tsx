import React, { useState } from "react";
import PomodoroCharts from "@/views/dashboard/PomodoroBarChart";

interface Task {
  number: number;
  TypeTask: string;
  percentYesterday?: string;
  percentLastWeek?: string;
  percentLastMonth?: string;
  percentLastYear?: string;
}

const Dashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Day");

  // Dữ liệu động theo bộ lọc
  const getTaskData = (): Task[] => {
    switch (selectedFilter) {
      case "Day":
        return [
          {
            number: 10,
            TypeTask: "Task completed",
            percentYesterday: "+10% from Yesterday",
          },
          {
            number: 1,
            TypeTask: "Task unfinished",
            percentYesterday: "-10% from Yesterday",
          },
          {
            number: 20,
            TypeTask: "Time applied Pomodoro",
            percentYesterday: "+10% from Yesterday",
          },
        ];
      case "Week":
        return [
          {
            number: 65,
            TypeTask: "Task completed",
            percentLastWeek: "+15% from Last Week",
          },
          {
            number: 5,
            TypeTask: "Task unfinished",
            percentLastWeek: "-5% from Last Week",
          },
          {
            number: 140,
            TypeTask: "Time applied Pomodoro",
            percentLastWeek: "+20% from Last Week",
          },
        ];
      case "Month":
        return [
          {
            number: 240,
            TypeTask: "Task completed",
            percentLastMonth: "+8% from Last Month",
          },
          {
            number: 10,
            TypeTask: "Task unfinished",
            percentLastMonth: "-3% from Last Month",
          },
          {
            number: 600,
            TypeTask: "Time applied Pomodoro",
            percentLastMonth: "+12% from Last Month",
          },
        ];
      case "Year":
        return [
          {
            number: 2800,
            TypeTask: "Task completed",
            percentLastYear: "+25% from Last Year",
          },
          {
            number: 50,
            TypeTask: "Task unfinished",
            percentLastYear: "-7% from Last Year",
          },
          {
            number: 7500,
            TypeTask: "Time applied Pomodoro",
            percentLastYear: "+30% from Last Year",
          },
        ];
      default:
        return [];
    }
  };

  return (
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
          <p>Most focused time</p>
          <h2>18:00</h2>
        </div>
        <div className="stat-box distract">
          <p>Most distracting time</p>
          <h2>12:00</h2>
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
  );
};

export default Dashboard;
