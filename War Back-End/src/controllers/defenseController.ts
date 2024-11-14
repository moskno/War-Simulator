import { Request, Response } from "express";
import Organization from "../models/Organization";
import { interceptMissile } from "../services/defenseService";

export const getDefenseSystems = async (req: Request, res: Response) => {
  try{
    const { organizationName } = req.query;

    const organization = await Organization.findOne({ name: organizationName});
    if (!organization) {
      await res.status(400).json({message: 'Organization not found'});
      return;
    }
    await res.json(organization.resources);
  } catch (error) {
    console.error(error);
    await res.status(500).json({ message: 'Failed to fetch defense systems'});
  }
}

export const intercept = async (req: Request, res: Response) => {
  const { organizationName, missileType } = req.body;
  try {
    const result = await interceptMissile(organizationName, missileType);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
