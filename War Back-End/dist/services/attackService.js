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
exports.launchMissile = void 0;
const Missile_1 = __importDefault(require("../models/Missile"));
const Organization_1 = __importDefault(require("../models/Organization"));
const websocket_1 = require("../utils/websocket");
const launchMissile = (missileName, targetRegion, organizationName) => __awaiter(void 0, void 0, void 0, function* () {
    const missile = yield Missile_1.default.findOne({ name: missileName });
    const organization = yield Organization_1.default.findOne({ name: organizationName });
    if (!missile) {
        throw new Error(`Missile type not found`);
    }
    if (!organization) {
        throw new Error(`Organization not found`);
    }
    const allowedRegions = organization.resources.map((resource) => resource.name);
    if (!allowedRegions.includes(targetRegion)) {
        throw new Error(`Organization ${organizationName} is not allowed to attack ${targetRegion}`);
    }
    const impactStatus = Math.random() > 0.5 ? "hit" : "missed";
    (0, websocket_1.sendNotification)(`Missile ${missileName} launched towards ${targetRegion}. Status: ${impactStatus}`);
    return { success: true, missileName, targetRegion, impactStatus };
});
exports.launchMissile = launchMissile;
