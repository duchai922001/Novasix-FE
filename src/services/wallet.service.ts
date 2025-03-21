import axiosInstance from "./main.service";

export const WalletService = {
  getWalletOfUser: async () => {
    const response = await axiosInstance.get("/wallet/user");
    return response.data;
  },
  depositeWallet: async (formData: { userId: string; amount: number }) => {
    const response = await axiosInstance.post("/wallet/deposite", formData);
    return response.data;
  },
};
