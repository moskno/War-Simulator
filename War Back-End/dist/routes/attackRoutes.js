"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attackController_1 = require("../controllers/attackController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/launch', authMiddleware_1.default, attackController_1.launch);
router.get('/missiles', authMiddleware_1.default, attackController_1.getMissiles);
exports.default = router;
