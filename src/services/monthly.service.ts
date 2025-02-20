import axiosInstance from "./main.service";
import { IFormEventMonthly } from "@/types/monthly.interface";

export const MonthlyService = {
  createEvent: async (formData: IFormEventMonthly) => {
    const response = await axiosInstance.post(
      "/monthly-event/create",
      formData
    );
    return response.data;
  },
  getEventMonth: async (currentMonth: string, currentYear: string) => {
    const response = await axiosInstance.get("/monthly-event", {
      params: {
        currentMonth,
        currentYear,
      },
    });
    return response.data;
  },
  //   updateDailyTask: async (id: string, formData: IFormTaskWeek) => {
  //     const response = await axiosInstance.put(
  //       `/weekly-task/update/${id}`,
  //       formData
  //     );
  //     return response;
  //   },
};
