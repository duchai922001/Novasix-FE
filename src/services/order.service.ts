import axiosInstance from "./main.service";

export const OrderService = {
  getOrderOfUser: async () => {
    const response = await axiosInstance.get("/order");
    return response.data;
  },
};
