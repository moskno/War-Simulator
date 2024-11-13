"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const attackRoutes_1 = __importDefault(require("./routes/attackRoutes"));
const defenceRoutes_1 = __importDefault(require("./routes/defenceRoutes"));
const missileRoutes_1 = __importDefault(require("./routes/missileRoutes"));
dotenv_1.default.config();
(0, database_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', authRoutes_1.default);
app.use('/api/attacks', attackRoutes_1.default);
app.use('/api/defences', defenceRoutes_1.default);
app.use('/api/missiles', missileRoutes_1.default);
app.get('/', (req, res) => {
    res.send('War Simulator API is running');
});
exports.default = app;