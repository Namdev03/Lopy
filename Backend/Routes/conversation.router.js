import express from "express";
import userAuthentiction from "../Middlewares/UserAuthentiction.js";
import { sendMessage,getmessage, getusers } from "../Controller/Message..controller.js";
const consverSationRoutr = express.Router();
//=====Send Message ======
consverSationRoutr.post('/send/message/:id',userAuthentiction,sendMessage)
//=====Get message=====
consverSationRoutr.get('/get/message/:id',userAuthentiction,getmessage)
//=====Get user Conversations=====
consverSationRoutr.get("/messages",userAuthentiction,getusers)
export default consverSationRoutr;