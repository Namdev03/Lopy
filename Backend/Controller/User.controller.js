import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import User from "../Model/User.model.js";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import getDataUri from "../Utils/DataURI.js";
import cloudinary from "../Utils/Cloudinary.js";
//=====Register User=====
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
//=====Login User=====
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
        //  console.log(process.env.SECRET_KEY);
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
        return res.status(500).json({
            message: error.message
        });
    }
};
//=====Logout User=====
export const logoutuser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
//=====User Profile=====
export const userProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "user profile",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
//=====User Profile Edit=====
export const editProfile = async (req, res) => {
    try {
        const userid = req.id;
        const { bio, gender } = req.body
        const profilepic = req.file;
        let cloudResponse;
        if (profilepic) {
            const fileUri = getDataUri(profilepic);
            await cloudinary.uploader.upload(fileUri)
        }
        const user = await User.findById(userid)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
            if (bio) user.bio = bio;
            if (gender) user.gender = gender;
            if (profilepic) user.profilepic = cloudResponse.secure_url;
            await user.save
            return res.status(200).json({
                message: "profile updated",
                data: user
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
//=====SuggestedUsers=====
export const getSuggestedUser = async (req, res) => {
    try {
        const suggestUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestUsers) {
            return res.status(400).json({
                message: "Currently do not have any users",
            })
        }
        return res.status(200).json({
            message: "user fetch sucessfully",
            users: suggestUsers
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};
//=====FOllow andunfollow =====
export const followOrUnfollow = async (req, res) => {
    try {
        const followkarnewala = req.id;
        const jiskoFollowkarung = req.params.id;
        if (followkarnewala === jiskoFollowkarung) {
            return res.status(400).json({
                message: "you con not follow your self"
            })
        }
        const user = await User.findById(followkarnewala);
        const targetUser = await User.findById(jiskoFollowkarung)
        if (!user || !targetUser) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        const isFollowing = user.following.includes(jiskoFollowkarung)
        if (isFollowing) {
            await Promise.all([
            User.updateOne({ _id: followkarnewala }, { $pull: { following: jiskoFollowkarung } }),
            User.updateOne({ _id: jiskoFollowkarung }, { $pull: { followers: followkarnewala } })
        ])
      return res.status(200).json({
                message: "Unfollowed successfully"
            })
}
        else {
            await Promise.all([
                User.updateOne({ _id: followkarnewala }, { $push: { following: jiskoFollowkarung } }),
                User.updateOne({ _id: jiskoFollowkarung }, { $push: { followers: followkarnewala } })
            ])
             return res.status(200).json({
                message: "following successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}