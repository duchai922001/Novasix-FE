import axiosInstance from "./main.service";

export const PackageService = {
  getPackage: async () => {
    const response = await axiosInstance.get("/package");
    return response.data;
  },
};
