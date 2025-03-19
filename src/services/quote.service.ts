import axiosInstance from "./main.service";

export const QuoteSerivce = {
  getRandomQuote: async () => {
    const response = await axiosInstance.get("/quote");
    return response.data;
  },
};
