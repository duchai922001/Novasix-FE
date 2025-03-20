import axiosInstance from "./main.service";

export const UserService = {
  getUserCurrent: async () => {
    const response = await axiosInstance.get("/user/current");
    return response.data;
  },
};
