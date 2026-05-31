import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import User from "../Model/User.model.js";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Something is missing, please check!"
            });
        }
        const isexists = await User.findOne({ email });
        //===== check user already exists or not=====
        if (isexists) {
            return res.status(409).json({
                message: "User already exists"
            });
        }
        // ===== hash the password for security=====
        const hashPassword = await bcrypt.hash(password, 10);
        //===== create new user in database=====
        const registeruser = await User.create({
            username,
            email,
            password: hashPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            data: registeruser
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Somthing is missing , please check!"
            })
        }
        const isExist = await User.findOne({ email })
        if (!isExist) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const compairPassword = await bcrypt.compare(password, isExist.password)
        if (!compairPassword) {
            return res.status(404).json({
                message: "invailid credential"
            })
        }
        console.log(process.env.SECRET_KEY);
        
        const token = jwt.sign(
            { userId: isExist._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        const toSend = {
            _id: isExist._id,
            username: isExist.username,
            email: isExist.email,
            profilepic: isExist.profilepic,
            bio: isExist.bio,
            followers: isExist.followers,
            following: isExist.following,
            post: isExist.posts,
            bookmarks: isExist.bookmarks
        }
        res.status(200).json({
            message: `Login sucessfully ${isExist.username}`,
            data: toSend
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: error.message
        });
    }
}