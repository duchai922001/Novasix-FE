import axiosInstance from "./main.service";

export const DashboardService = {
  getDashboardDaily: async () => {
    const response = await axiosInstance.get("/dashboard/daily");
    return response.data;
  },
  getDashboardWeekly: async () => {
    const response = await axiosInstance.get("/dashboard/weekly");
    return response.data;
  },
  getDashboardMonthly: async () => {
    const response = await axiosInstance.get("/dashboard/monthly");
    return response.data;
  },
  getDashboardYearly: async () => {
    const response = await axiosInstance.get("/dashboard/yearly");
    return response.data;
  },
};
