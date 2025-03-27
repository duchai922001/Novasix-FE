import axiosInstance from "./main.service";

export const UserService = {
  getUserCurrent: async () => {
    const response = await axiosInstance.get("/user/current");
    return response.data;
  },
  updateUser: async (formData: any) => {
    const response = await axiosInstance.put("/user/update", formData);
    return response.data;
  },
  getAllUser: async () => {
    const response = await axiosInstance.get("/user/get-all");
    return response.data;
  },
  actionIsActiveUser: async (userId: string) => {
    const response = await axiosInstance.put(`/user/action-active/${userId}`);
    return response;
  },
};
