"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attackController_1 = require("../controllers/attackController");
const router = express_1.default.Router();
router.get('/attacks', attackController_1.attacks);
exports.default = router;
