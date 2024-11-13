import Missile from "../models/Missile";
import { sendNotification } from "../utils/websocket";

export const launchMissile = async (
  missileName: string,
  targetRegion: string
) => {
  const missile = await Missile.findOne({ name: missileName });
  if (!missile) {
    throw new Error(`Missile type not found`);
  }

  const result = await launchMissile(missileName, targetRegion);
  sendNotification(
    `Missile ${missileName} launched towards ${targetRegion}. Status: ${result.impactStatus}`
  );

  const impactStatus = Math.random() > 0.5 ? "hit" : "missed";
  return { success: true, missileName, targetRegion, impactStatus };
};
