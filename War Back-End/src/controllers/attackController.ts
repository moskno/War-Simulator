import { Request, Response } from "express";
import { launchMissile } from "../services/attackService";
import Missile from "../models/Missile";

export const getMissiles = async (req: Request, res: Response) => {
  try {
    const missiles = await Missile.find();
    res.json(missiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch missiles" });
  }
};

export const launch = async (req: Request, res: Response) => {
  const { missileName, targetRegion, organizationName } = req.body;
  try {
    const result = await launchMissile(
      missileName,
      targetRegion,
      organizationName
    );
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
