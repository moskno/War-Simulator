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
const interceptMissile = (organizationName, missileType) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield Organization_1.default.findOne({ name: organizationName });
    if (!organization) {
        throw new Error("Organization not found");
    }
    const defenceResource = organization.resources.find((r) => r.name === missileType);
    if (!defenceResource || defenceResource.amount <= 0) {
        throw new Error("No available defenses for this missile");
    }
    defenceResource.amount -= 1;
    yield organization.save();
    return {
        success: true,
        message: `Missile intercepted seccessfully by ${missileType}`,
    };
});
exports.interceptMissile = interceptMissile;
