"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptMissile = void 0;
const Organization_1 = __importDefault(require("../models/Organization"));
const Missile_1 = __importDefault(require("../models/Missile"));
const websocket_1 = require("../utils/websocket");
const interceptMissile = (organizationName, missileType) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield Organization_1.default.findOne({ name: organizationName });
    if (!organization) {
        throw new Error("Organization not found");
    }
    const defenceResource = organization.resources.find((r) => r.name === missileType);
    if (!defenceResource || defenceResource.amount <= 0) {
        throw new Error("No available defenses for this missile");
    }
    const interceptor = yield Missile_1.default.findOne({ name: missileType });
    if (!interceptor) {
        throw new Error("Interceptor not found");
    }
    const missile = yield Missile_1.default.findOne({ name: missileType });
    if (!missile) {
        throw new Error("Missile not found");
    }
    if (!missile.intercepts.includes(missileType)) {
        throw new Error(`Interception failed: ${missileType} cannot be intercepted by ${defenceResource.name}.`);
    }
    const interceptionTime = 1 / interceptor.speed;
    const missileTimeToTarget = 1 / missile.speed;
    if (interceptionTime > missileTimeToTarget) {
        throw new Error(`Interception failed: ${missileType} is too fast.`);
    }
    defenceResource.amount -= 1;
    yield organization.save();
    (0, websocket_1.sendNotification)(`Missile intercepted successfully by ${missileType} for ${organizationName}`);
    return {
        success: true,
        message: `Missile intercepted successfully by ${missileType}`,
    };
});
exports.interceptMissile = interceptMissile;
