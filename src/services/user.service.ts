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
};
