import { MonthlyService } from "@/services/monthly.service";
import { handleError } from "@/utils/catch-error";
import { message } from "antd";
import React, { useEffect, useState } from "react";

const Monthly: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});
  const [task, setTask] = useState<string>("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [icons, setIcons] = useState<{ [key: string]: string[] }>({});

  const cuteIcons = ["🌸", "🎉", "🎈", "⭐", "❤️", "✨", "🎶", "🍀"];

  const getRandomIcon = () =>
    cuteIcons[Math.floor(Math.random() * cuteIcons.length)];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = Math.ceil((daysInMonth + firstDayOfWeek) / 7) * 7;

  const key = `${currentYear}-${currentMonth}-${selectedDay}`;
  const tasksForDay = tasks[key] || [];
  const changeMonth = (offset: number) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const handleCreateEvent = async () => {
    if (selectedDay === null) return; // Ngăn lỗi nếu chưa chọn ngày

    try {
      const eventDate = new Date(currentYear, currentMonth, selectedDay);
      await MonthlyService.createEvent({
        note: task,
        dateTime: eventDate.toISOString(),
      });
      message.success("Tạo sự kiện thành công");

      setIcons((prev) => ({
        ...prev,
        [`${currentYear}-${currentMonth}-${selectedDay}`]: [getRandomIcon()], // Đảm bảo key hợp lệ
      }));

      asyncDataEventMonthly();
      setSelectedDay(null);
    } catch (error) {
      handleError(error);
    }
  };

  const asyncDataEventMonthly = async () => {
    try {
      const response = await MonthlyService.getEventMonth(
        String(currentMonth + 1),
        String(currentYear)
      );
      const formattedTasks = response.reduce(
        (acc: { [key: string]: string[] }, event: any) => {
          const eventDate = new Date(event.dateTime);
          const year = eventDate.getFullYear();
          const month = eventDate.getMonth();
          const day = eventDate.getDate();

          const key = `${year}-${month}-${day}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push(event.note);
          return acc;
        },
        {}
      );

      setTasks(formattedTasks);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    asyncDataEventMonthly();
  }, [currentMonth, currentYear]);
  return (
    <div className="monthly-container">
      <div className="header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        {new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      <div className="days-of-week">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {[...Array(totalCells)].map((_, index) => {
          let day,
            isCurrentMonth = true;

          if (index < firstDayOfWeek) {
            day = prevMonthDays - firstDayOfWeek + index + 1;
            isCurrentMonth = false;
          } else if (index - firstDayOfWeek < daysInMonth) {
            day = index - firstDayOfWeek + 1;
          } else {
            day = index - firstDayOfWeek - daysInMonth + 1;
            isCurrentMonth = false;
          }

          return (
            <div
              key={index}
              className={`calendar-day ${!isCurrentMonth ? "disabled" : ""}`}
              onClick={() => isCurrentMonth && setSelectedDay(day)}
            >
              <span>{day}</span>
              {isCurrentMonth &&
                tasks[`${currentYear}-${currentMonth}-${day}`]?.map((t, i) => (
                  <div style={{ display: "flex", marginTop: "12px" }}>
                    <span></span>
                    <p
                      key={i}
                      style={{
                        fontSize: "14px",
                        color: "green",
                        fontWeight: "bold",
                      }}
                      className="task"
                    >
                      {t}
                    </p>
                  </div>
                ))}
              {currentMonth &&
                icons[`${currentYear}-${currentMonth}-${day}`]?.map(
                  (icon, i) => (
                    <span key={i} className="task-icon">
                      {icon}
                    </span>
                  )
                )}
            </div>
          );
        })}
      </div>

      {selectedDay !== null && (
        <div className="popup">
          <div className="popup-header">
            <span>Day {selectedDay}</span>
            <button className="close-btn" onClick={() => setSelectedDay(null)}>
              X
            </button>
          </div>
          <div className="popup-content">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter event"
            />
            <button onClick={handleCreateEvent}>Add Event</button>
            <ul className="task-list">
              {tasksForDay.map((t, i) => (
                <li key={i}>
                  {t}{" "}
                  <button
                    onClick={() => {
                      setTasks((prev) => ({
                        ...prev,
                        [key]: prev[key].filter((_, idx) => idx !== i),
                      }));
                    }}
                  >
                    ✏️
                  </button>
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
