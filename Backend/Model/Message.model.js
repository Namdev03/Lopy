import { Schema, model } from "mongoose";
const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    messages:{
        type: String,
        required: true
    }
},{timestamps: true})
export default model("Message", messageSchema)