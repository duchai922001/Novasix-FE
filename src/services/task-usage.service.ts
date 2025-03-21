import axiosInstance from "./main.service";

export const TaskUsageService = {
  logTimeTask: async (formData: any) => {
    const response = await axiosInstance.post("/task-usage/log-time", formData);
    return response.data;
  },
  getTimeMostUser: async () => {
    const response = await axiosInstance.get("/task-usage/time-most");
    return response.data;
  },
  getTaskUsageByHour: async () => {
    const response = await axiosInstance.get("/task-usage/statistical-day");
    return response.data;
  },
  getTaskUsageByWeek: async () => {
    const response = await axiosInstance.get("/task-usage/statistical-week");
    return response.data;
  },
  getTaskUsageByMonth: async () => {
    const response = await axiosInstance.get("/task-usage/statistical-month");
    return response.data;
  },
  getTaskUsageByYear: async () => {
    const response = await axiosInstance.get("/task-usage/statistical-year");
    return response.data;
  },
};
