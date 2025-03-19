import axiosInstance from "./main.service";

export const PomodoroService = {
  getPomodoroOfUser: async () => {
    const response = await axiosInstance.get("/pomodoro/user");
    return response.data;
  },
};
