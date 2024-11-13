import Missile from "../models/Missile";
import Organization from "../models/Organization";
import { sendNotification } from "../utils/websocket";

export const interceptMissile = async (
  organizationName: string,
  missileType: string
) => {
  const organization = await Organization.findOne({ name: organizationName });
  if (!organization) {
    throw new Error("Organization not found");
  }

  const defenceResource = organization.resources.find(
    (r) => r.name === missileType
  );
  if (!defenceResource || defenceResource.amount <= 0) {
    throw new Error("No available defenses for this missile");
  }

  const result = await interceptMissile(organizationName, missileType);
  sendNotification(
    `Missile intercepted successfully by ${missileType} for ${organizationName}`
  );

  defenceResource.amount -= 1;
  await organization.save();

  return {
    success: true,
    message: `Missile intercepted seccessfully by ${missileType}`,
  };
};
