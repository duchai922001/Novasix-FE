import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "f1c18e9436938348daa028c5754515c4"; 
const CITY = "Ho Chi Minh";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;

interface WeatherData {
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

const getCurrentDateTime = (): string => {
  const now = new Date();
  const daysOfWeek = [
    "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy",
  ];
  const dayOfWeek = daysOfWeek[now.getDay()];
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${dayOfWeek}, ${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
};

const MWeather: React.FC = () => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherDesc, setWeatherDesc] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getCurrentDateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherData>(API_URL);
        setTemperature(response.data.main.temp);
        setWeatherDesc(response.data.weather[0].description);
        setIcon(response.data.weather[0].icon);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="card-weather">
      <div className="container-weather">
        <div className="cloud front-weather">
          <span className="left-front-weather"></span>
          <span className="right-front-weather"></span>
        </div>
        <span className="sun sunshine"></span>
        <span className="sun"></span>
        <div className="cloud back-weather">
          <span className="left-back-weather"></span>
          <span className="right-back-weather"></span>
        </div>
      </div>

      <div className="card-header-weather">
        <span>{CITY}, Vietnam</span>
        <p>{dateTime}</p>
      </div>

      <span className="temp">
        <p>{temperature}°C</p>
      </span>
    </div>
  );
};

export default MWeather;
