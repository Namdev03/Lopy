import { messageApiEndPoint } from "../Router/messageApiEndPoint";
import { axiosInstance } from "./axiosInstance"

export const getMessagesApi = async (id) => {
    try {
        const response =await axiosInstance.get(`${messageApiEndPoint.GETMESSAGES}/${id}`)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}