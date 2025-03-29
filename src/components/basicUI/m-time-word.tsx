import { useState, useEffect } from "react";

interface Event {
  id: number;
  time: string;
  slot: string;
  text: string;
}

// Hàm xác định mốc thời gian dựa vào giờ hiện tại
const getTimeSlot = (hour: number): string => {
  if (hour >= 6 && hour < 10) return "🌅 Mốc 1: 6h - 10h";
  if (hour >= 10 && hour < 14) return "🌞 Mốc 2: 10h - 14h";
  if (hour >= 14 && hour < 18) return "🌆 Mốc 3: 14h - 18h";
  if (hour >= 18 && hour < 22) return "🌙 Mốc 4: 18h - 22h";
  return "🌃 Mốc 5: 22h - 6h (Đêm)";
};

const MTimeWord: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      time: new Date().toLocaleTimeString(),
      slot: getTimeSlot(new Date().getHours()),
      text: "🚀 Bắt đầu Timeline",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newEvent: Event = {
        id: events.length + 1,
        time: now.toLocaleTimeString(),
        slot: getTimeSlot(now.getHours()),
        text: `🕒 Sự kiện mới lúc ${now.toLocaleTimeString()}`,
      };

      setEvents((prevEvents) => [newEvent, ...prevEvents]); // Đẩy sự kiện mới lên đầu
    }, 5000); // Cập nhật mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
  }, [events]);

  return (
    <div className="timeline-container">
      <h2>📅 Timeline Thời Gian Thực</h2>
      <div className="timeline">
        {events.map((event) => (
          <div key={event.id} className="timeline-item">
            <span className="time">{event.time}</span>
            <span className="slot">{event.slot}</span>
            <p className="event-text">{event.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MTimeWord;
