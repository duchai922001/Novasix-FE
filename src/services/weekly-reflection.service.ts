import { IWeeklyReflection } from "@/types/weekly-reflection.interface";
import axiosInstance from "./main.service";

export const WeeklyReflectionService = {
  create: async (data: IWeeklyReflection) => {
    const response = await axiosInstance.post(
      "/weekly-reflection/create",
      data
    );
    return response.data;
  },
  getWeekReflection: async (dateWeek: string) => {
    const response = await axiosInstance.get("/weekly-reflection", {
      params: {
        dateWeek,
      },
    });
    return response.data;
  },
};
