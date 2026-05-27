import { configDotenv } from "dotenv";
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;
app.listen(port,()=>{
    console.log(`server is live on ${port}`);
    
})