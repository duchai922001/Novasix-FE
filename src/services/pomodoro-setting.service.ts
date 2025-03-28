import { IPomodoroSetting } from "@/types/pomodoro-setting.interface";
import axiosInstance from "./main.service";

export const PomodoroSettingService = {
  create: async (data: IPomodoroSetting) => {
    const response = await axiosInstance.post("/pomodoro-setting/create", data);
    return response.data;
  },
  update: async (id: string, data: IPomodoroSetting) => {
    const response = await axiosInstance.put(
      `/pomodoro-setting/update/${id}`,
      data
    );
    return response.data;
  },
  delete: async (id: string) => {
    const response = await axiosInstance.delete(
      `/pomodoro-setting/update/${id}`
    );
    return response.data;
  },
  getAll: async () => {
    const response = await axiosInstance.get("/pomodoro-setting/get-all");
    return response.data;
  },
};
