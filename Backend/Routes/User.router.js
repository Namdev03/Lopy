import express from "express";
import { registerUser,loginUser } from "../Controller/User.controller.js";
//===== instance of express ======
const userRouter = express.Router();
//=====endpoints=====
//=====Register User=====
userRouter.post('/register',registerUser)
//=====Login user====
userRouter.post('/login',loginUser)
export default userRouter;