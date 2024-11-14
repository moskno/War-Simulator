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
const websocket_1 = require("../utils/websocket");
const launchMissile = (missileName, targetRegion) => __awaiter(void 0, void 0, void 0, function* () {
    const missile = yield Missile_1.default.findOne({ name: missileName });
    if (!missile) {
        throw new Error(`Missile type not found`);
    }
    const result = yield (0, exports.launchMissile)(missileName, targetRegion);
    (0, websocket_1.sendNotification)(`Missile ${missileName} launched towards ${targetRegion}. Status: ${result.impactStatus}`);
    const impactStatus = Math.random() > 0.5 ? "hit" : "missed";
    return { success: true, missileName, targetRegion, impactStatus };
});
exports.launchMissile = launchMissile;
