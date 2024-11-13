"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const missileController_1 = require("../controllers/missileController");
const router = express_1.default.Router();
router.get('/missiles', missileController_1.missiles);
exports.default = router;
