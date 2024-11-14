"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const defenseController_1 = require("../controllers/defenseController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/intercept', authMiddleware_1.default, defenseController_1.intercept);
exports.default = router;
