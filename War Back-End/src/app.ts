import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('War Simulator API is running')
});

export default app;