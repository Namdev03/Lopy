import express from "express";
import { registerUser,loginUser,logoutuser,userProfile} from "../Controller/User.controller.js";
//===== instance of express ======
const userRouter = express.Router();
//=====endpoints=====
//=====Register User=====
userRouter.post('/register',registerUser)
//=====Login user====
userRouter.post('/login',loginUser)
//=====Logout user====
userRouter.get('/logout',logoutuser)
//=====User Profile======
userRouter.get("/profile/:id", userProfile);
export default userRouter;