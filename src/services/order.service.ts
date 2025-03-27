import { AxiosResponse } from "axios";
import axiosInstance from "./main.service";

export const OrderService = {
  getOrderOfUser: async () => {
    const response = await axiosInstance.get("/order");
    return response.data;
  },
  getAllOrder: async (transId: string, username: string, status: string) => {
    const response = await axiosInstance.get(`/order/transaction`, {
      params: {
        username,
        transId,
        status,
      },
    });
    return response.data;
  },
};
