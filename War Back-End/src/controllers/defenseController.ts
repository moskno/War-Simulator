import { Request, Response } from "express";
import { interceptMissile } from "../services/defenseService";

export const intercept = async (req: Request, res: Response) => {
  const { organizationName, missileType } = req.body;
  try {
    const result = await interceptMissile(organizationName, missileType);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
