import { IFormDataLogin, IFormDataRegister } from "@/types/auth.interface";
import axiosInstance from "./main.service";

export const AuthService = {
  login: async (formData: IFormDataLogin) => {
    const response = await axiosInstance.post("/login", formData);
    return response.data;
  },
  register: async (formData: IFormDataRegister) => {
    const response = await axiosInstance.post("/register", formData);
    return response.data;
  },
};
