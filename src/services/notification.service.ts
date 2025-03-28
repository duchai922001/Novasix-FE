import axiosInstance from "./main.service";

export const NotificationService = {
  sendNotification: async (formData: { message: string }) => {
    const response = await axiosInstance.post("/notification/send", formData);
    return response.data;
  },
  getNotification: async () => {
    const response = await axiosInstance.get("/notification");
    return response.data;
  },
  markNotification: async () => {
    const response = await axiosInstance.put("/notification/mark");
    return response.data;
  },
};
