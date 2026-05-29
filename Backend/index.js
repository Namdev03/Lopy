import dotenv from "dotenv";
import express from "express";
import connectDB from "./Config/mogodb.config.js";
//===== instance of express ======
const app = express();
// ===== Middlewares =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("Welcome to the backend of the application");
})
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`server is live on ${port}`);
    } catch (error) {
        process.exit(1);
    }
})