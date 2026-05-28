import { configDotenv } from "dotenv";
import express from "express";
import connectDB from "./Config/mogodb.config.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;
app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`server is live on ${port}`);
    } catch (error) {
    }

})