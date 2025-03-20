import axiosInstance from "./main.service";

export const WalletService = {
  getWalletOfUser: async () => {
    const response = await axiosInstance.get("/wallet/user");
    return response.data;
  },
};
