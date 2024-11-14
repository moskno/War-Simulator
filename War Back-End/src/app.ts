import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database";
import authRoutes from './routes/authRoutes';
import attackRoutes from './routes/attackRoutes';
import defenseRoutes from './routes/defenseRoutes';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/defense', defenseRoutes);
app.use('/api/attack', attackRoutes);

app.get('/', (req, res) => {
    res.send('War Simulator API is running')
});

export default app;