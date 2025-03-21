import axiosInstance from "./main.service";

export const PaymentService = {
  createPayment: async (formData: { amount: number; userId: string }) => {
    const response = await axiosInstance.post("/payment/create", formData);
    return response.data;
  },
};
