import { v1 as cloudinary } from "cloudinary"
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API - KEY,
    api_secrat: process.env.CLOUDINARY_API - SECRAT
})
export default cloudinary;