"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = exports.initializeWebSocket = void 0;
const ws_1 = __importDefault(require("ws"));
let wss = null;
const initializeWebSocket = (server) => {
    wss = new ws_1.default.Server({ server });
    wss.on("connection", (ws) => {
        console.log("New WebSocket connection established");
        ws.on("message", (message) => {
            console.log("Received:", message.toString());
        });
        ws.on("close", () => {
            console.log("WebSocket connection closed");
        });
    });
};
exports.initializeWebSocket = initializeWebSocket;
const sendNotification = (message) => {
    if (wss) {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(message);
            }
        });
    }
};
exports.sendNotification = sendNotification;
