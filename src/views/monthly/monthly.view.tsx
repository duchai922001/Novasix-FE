import React, { useState } from "react";

const Monthly: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});
  const [task, setTask] = useState<string>("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = Math.ceil((daysInMonth + firstDayOfWeek) / 7) * 7; // Luôn có 6 hàng

  const key = `${currentYear}-${currentMonth}-${selectedDay}`;
  const tasksForDay = tasks[key] || [];

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  return (
    <div className="monthly-container">
      {/* Header Chuyển Tháng */}
      <div className="header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" })}
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      {/* Hiển thị các thứ trong tuần */}
      <div className="days-of-week">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
  {[...Array(totalCells)].map((_, index) => {
    let day, isCurrentMonth = true, isPrevMonth = false, isNextMonth = false;

    if (index < firstDayOfWeek) {
      // Ngày của tháng trước
      day = prevMonthDays - firstDayOfWeek + index + 1;
      isCurrentMonth = false;
      isPrevMonth = true;
    } else if (index - firstDayOfWeek < daysInMonth) {
      // Ngày của tháng hiện tại
      day = index - firstDayOfWeek + 1;
    } else {
      // Ngày của tháng sau
      day = index - firstDayOfWeek - daysInMonth + 1;
      isCurrentMonth = false;
      isNextMonth = true;
    }

    return (
      <div
        key={index}
        className={`calendar-day ${!isCurrentMonth ? "disabled" : ""}`}
        onClick={() => isCurrentMonth && setSelectedDay(day)}
      >
        <span>{day}</span>
        {isCurrentMonth && tasks[`${currentYear}-${currentMonth}-${day}`]?.map((t, i) => (
          <p key={i} className="task">{t}</p>
        ))}
      </div>
    );
  })}
</div>


      {/* Popup Nhập Task */}
      {selectedDay !== null && (
        <div className="popup">
          <div className="popup-header">
            <span>Day {selectedDay}</span>
            <button className="close-btn" onClick={() => setSelectedDay(null)}>X</button>
          </div>
          <div className="popup-content">
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task" />
            <button onClick={() => {
              if (task.trim()) {
                setTasks((prev) => ({ ...prev, [key]: [...(prev[key] || []), task] }));
                setTask("");
              }
            }}>Add Task</button>
            <ul className="task-list">
              {tasksForDay.map((t, i) => (
                <li key={i}>
                  {t} <button onClick={() => {
                    setTasks((prev) => ({
                      ...prev,
                      [key]: prev[key].filter((_, idx) => idx !== i),
                    }));
                  }}>✏️</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monthly;
