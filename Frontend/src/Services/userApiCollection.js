import { userApiEndPoint } from "../Router/UserEndPoints.js"
import { axiosInstance } from "./axiosInstance.js"

export const loginApi= async(payload)=>{
    try {
        const response = await axiosInstance.post(userApiEndPoint.LOGIN,payload)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const registerApi= async(payload)=>{
    try {
        const response = await axiosInstance.post(userApiEndPoint.SIGNUP,payload)
        return response.data;
    } catch (error) {
        return error.response.data ;
    }
}
export const logoutApi= async()=>{
    try {
        const response = await axiosInstance.get(userApiEndPoint.LOGOUT)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
// export const suggesteUserApi = async () => {
//     try { 
//         const response = await axiosInstance.get(userApiEndPoint.SUGGESTUSER)
//         return response.data;
//         console.log(response);
        
//     } catch (error) {
//         return error.response.data;
//     }
// }