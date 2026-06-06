import Post from "../Model/Post.model.js"
import User from "../Model/User.model.js"
import sharp  from "sharp"
import cloudinary from "../Utils/Cloudinary.js";
import { json } from "express";
export const addNewPost = async (req,res) => {
    try {
        const {caption}=req.body;
        const image = req.file;
        const autherId = req.id;
        if (!image) {
            return res.status(400).json({
                message:"Image required",
            })
        }
         const optimizedImageBuffer = await sharp(image.buffer).resize({
            width:800,height:800,fit:"inside"
         }).toFormat('jpeg',{quality:80}).toBuffer();
         const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
         const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image:cloudResponse.secure_url,
            auther:autherId
        })
        const user = await User.findById(autherId);
        if (user) {
            User.posts.push(post._id)
            await user.save();
        }
        await post.populate({path:'auther',select:'-password'});
        return res.status(200).json({
            message:"New Post added",
            data:post
        })
    } catch (error) {
        
    }
}