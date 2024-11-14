import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import attackRoutes from "./routes/attackRoutes";
import defenseRoutes from "./routes/defenseRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/defense", defenseRoutes);
app.use("/api/attack", attackRoutes);

app.get("/", (req, res) => {
  res.send("War Simulator API is running");
});

export default app;
