import { IFormTaskWeek } from "@/types/weekly.interface";
import axiosInstance from "./main.service";

export const WeeklyService = {
  createTaskWeek: async (formData: IFormTaskWeek) => {
    const response = await axiosInstance.post("/weekly-task/create", formData);
    return response.data;
  },
  getTasksWeek: async (dateWeek: string) => {
    const response = await axiosInstance.get("/weekly-task", {
      params: {
        dateWeek,
      },
    });
    return response.data;
  },
  updateDailyTask: async (id: string, formData: IFormTaskWeek) => {
    const response = await axiosInstance.put(
      `/weekly-task/update/${id}`,
      formData
    );
    return response;
  },
};
