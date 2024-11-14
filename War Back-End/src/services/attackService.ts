import Missile from "../models/Missile";
import Organization from "models/Organization";
import { sendNotification } from "../utils/websocket";

export const launchMissile = async (
  missileName: string,
  targetRegion: string,
  organizationName: string
) => {
  const missile = await Missile.findOne({ name: missileName });
  const organization = await Organization.findOne({ name: organizationName });
  if (!missile) {
    throw new Error(`Missile type not found`);
  }
  if (!organization) {
    throw new Error(`Organization not found`);
  }

  const allowedRegions = organization.resources.map(
    (resource) => resource.name
  );
  if (!allowedRegions.includes(targetRegion)) {
    throw new Error(
      `Organization ${organizationName} is not allowed to attack ${targetRegion}`
    );
  }

  const impactStatus = Math.random() > 0.5 ? "hit" : "missed";

  sendNotification(
    `Missile ${missileName} launched towards ${targetRegion}. Status: ${impactStatus}`
  );

  return { success: true, missileName, targetRegion, impactStatus };
};
