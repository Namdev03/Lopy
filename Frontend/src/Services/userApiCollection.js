import { userApiEndPoint } from "../Router/UserEndPoints.js"
import { axiosInstance } from "./axiosInstance.js"

export const loginApi = async (payload) => {
    try {
        const response = await axiosInstance.post(userApiEndPoint.LOGIN, payload)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const registerApi = async (payload) => {
    try {
        const response = await axiosInstance.post(userApiEndPoint.SIGNUP, payload)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const logoutApi = async () => {
    try {
        const response = await axiosInstance.get(userApiEndPoint.LOGOUT)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
//=====me route authentication api=====
export const meApi = async () => {
    try {
        const response = await axiosInstance.get(userApiEndPoint.ME)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
//===== user profile =====
export const userProfileApi = async () => {
    try {
        const response = await axiosInstance.get(userApiEndPoint.USERPROFILE)
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
//=====Follow And Unfollow =====
export const followAndUnfollowApi = async (id) => {
    try {
        const response = await axiosInstance.post(`${userApiEndPoint.FOLLOWANDUNFOLLOW}/${id}`)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
//=====Like and Unlike=====
export const likeAndUnLikeApi = async (id) => {
    try {
        const response = await axiosInstance.post(`${userApiEndPoint.LIKEUNLIKE}/${id}`)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
//=====Suggsted users =====
export const suggesteUserApi = async () => {
    try {
        const response = await axiosInstance.get("/user/suggestedUser");
        // console.log("suggested user",response.data);
        return response.data;
    } catch (error) {
        return error.response?.data
    }
};
//=====Users Profile by params=====
export const usersProfileApi = async (id) => {
    try {
        const response = await axiosInstance.get(`${userApiEndPoint.USERSPROFILE}/${id}`)   
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}