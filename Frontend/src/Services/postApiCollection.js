import { postEndPoint } from "../Router/postEndPoint.js";
import { axiosInstance } from "./axiosInstance.js"
export const getAllPostApi = async () => {
    try {
        const response =await axiosInstance.get(postEndPoint.GETALLPOST)
        return response.data;
    } catch (error) {
        error.response?.data;
    }
}
//=====Get user post=====
export const userPostApi = async () => {
    try {
        const response = await axiosInstance.get(postEndPoint.USERPOST)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
