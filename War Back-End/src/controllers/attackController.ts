import { Request, Response } from "express";
import { launchMissile } from "../services/attackService";

export const launch = async (req: Request, res: Response) => {
  const { missileName, targetRegion, organizationName } = req.body;
  try {
    const result = await launchMissile(missileName, targetRegion, organizationName);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
