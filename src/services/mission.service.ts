import axiosInstance from "./main.service";

export const MissionService = {
  rewardToken: async (formData: { reward: number; type: string }) => {
    const response = await axiosInstance.post("/mission/reward", formData);
    return response.data;
  },
};
