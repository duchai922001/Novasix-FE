import { IDailyTask } from "@/types/daily.interface";
import axiosInstance from "./main.service";

export const DailyService = {
  createNewTask: async (formData: IDailyTask) => {
    const response = await axiosInstance.post("/daily-task/create", formData);
    return response;
  },
  updateDailyTask: async (id: string, formData: IDailyTask) => {
    const response = await axiosInstance.put(
      `/daily-task/update/${id}`,
      formData
    );
    return response;
  },
  deleteDailyTask: async (id: string) => {
    const response = await axiosInstance.delete(`/daily-task/delete/${id}`);
    return response.data;
  },
  getTaskDaily: async () => {
    const response = await axiosInstance.get("/daily-task/progress");
    return response.data;
  },
  getTaskDoneDaily: async () => {
    const response = await axiosInstance.get("/daily-task/done");
    return response.data;
  },
};
