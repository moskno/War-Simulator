import Missile from "../models/Missile";

export const launchMissile = async (
  missileName: string,
  targetRegion: string
) => {
  const missile = await Missile.findOne({ name: missileName });
  if (!missile) {
    throw new Error(`Missile type not found`);
  }

  const impactStatus = Math.random() > 0.5 ? "hit" : "missed";
  return { success: true, missileName, targetRegion, impactStatus };
};
