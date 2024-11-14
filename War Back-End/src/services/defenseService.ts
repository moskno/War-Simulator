import Organization from "../models/Organization";
import Missile from "../models/Missile";
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

  const interceptor = await Missile.findOne({ name: missileType });
  if (!interceptor) {
    throw new Error("Interceptor not found");
  }

  const missile = await Missile.findOne({ name: missileType });
  if (!missile) {
    throw new Error("Missile not found");
  }

  if (!missile.intercepts.includes(missileType)) {
    throw new Error(
      `Interception failed: ${missileType} cannot be intercepted by ${defenceResource.name}.`
    );
  }

  const interceptionTime = 1 / interceptor.speed;
  const missileTimeToTarget = 1 / missile.speed;

  if (interceptionTime > missileTimeToTarget) {
    throw new Error(`Interception failed: ${missileType} is too fast.`);
  }

  defenceResource.amount -= 1;
  await organization.save();

  sendNotification(
    `Missile intercepted successfully by ${missileType} for ${organizationName}`
  );

  return {
    success: true,
    message: `Missile intercepted successfully by ${missileType}`,
  };
};
