"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const websocket_1 = require("./utils/websocket");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app_1.default);
(0, websocket_1.initializeWebSocket)(server);
const PORT = process.env.PORT || 4500;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
