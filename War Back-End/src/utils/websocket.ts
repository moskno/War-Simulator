import { Server as SocketIOServer } from "socket.io";
import http from "http";

let io: SocketIOServer;

export const initializeWebSocket = (server: http.Server) => {
  io = new SocketIOServer(server);

  io.on("connection", (socket) => {
    console.log("New WebSocket connection established");

    socket.on("message", (message: string) => {
      console.log("Received:", message);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket connection closed");
    });
  });
};

export const sendNotification = (message: string) => {
  if (io) {
    io.emit("message", message);
  }
};
