import axiosInstance from "./main.service"

export const UserPackageService = {
    buyPackage: async (formData: {typePackage: string}) => {
        const response = await axiosInstance.post("/user-package/buy", formData)
        return response.data
    },
    getPackagesUser: async () => {
        const response = await axiosInstance.get("/user-package")
        return response.data
    }
}