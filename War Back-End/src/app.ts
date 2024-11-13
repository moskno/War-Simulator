import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database";
import Missile from "./models/Missile";
import authRoutes from './routes/authRoutes';
import attackRouter from './routes/attackRoutes';
import defenceRouter from './routes/defenceRoutes';
import missileRouter from './routes/missileRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', attackRouter);
app.use('/api', defenceRouter);
app.use('/api', missileRouter);

app.get('/', (req, res) => {
    res.send('War Simulator API is running')
});

export default app;