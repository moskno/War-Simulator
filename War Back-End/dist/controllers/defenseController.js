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
exports.intercept = exports.getDefenseSystems = void 0;
const Organization_1 = __importDefault(require("../models/Organization"));
const defenseService_1 = require("../services/defenseService");
const getDefenseSystems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organizationName } = req.query;
        const organization = yield Organization_1.default.findOne({ name: organizationName });
        if (!organization) {
            yield res.status(400).json({ message: 'Organization not found' });
            return;
        }
        yield res.json(organization.resources);
    }
    catch (error) {
        console.error(error);
        yield res.status(500).json({ message: 'Failed to fetch defense systems' });
    }
});
exports.getDefenseSystems = getDefenseSystems;
const intercept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizationName, missileType } = req.body;
    try {
        const result = yield (0, defenseService_1.interceptMissile)(organizationName, missileType);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.intercept = intercept;
