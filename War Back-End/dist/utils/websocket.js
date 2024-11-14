"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = exports.initializeWebSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initializeWebSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });
    io.on("connection", (socket) => {
        console.log("New WebSocket connection established");
        socket.on("message", (message) => {
            console.log("Received:", message);
        });
        socket.on("disconnect", () => {
            console.log("WebSocket connection closed");
        });
    });
};
exports.initializeWebSocket = initializeWebSocket;
const sendNotification = (message) => {
    if (io) {
        io.emit("message", message);
    }
};
exports.sendNotification = sendNotification;
