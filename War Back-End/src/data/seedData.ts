import mongoose from "mongoose";
import dotenv from "dotenv";
import Organization from "../models/Organization";
import Missile from "../models/Missile";
import organizations from "./organizations.json";
import missiles from "./missiles.json";
import connectDB from "../config/database";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Organization.deleteMany();
    await Missile.deleteMany();

    await Organization.insertMany(organizations);
    await Missile.insertMany(missiles);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
