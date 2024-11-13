import WebSocket from "ws";

let wss: WebSocket.Server | null = null;

export const initializeWebSocket = (server: any) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("New WebSocket connection established");

    ws.on("message", (message) => {
      console.log("Received:", message.toString());
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });
};

export const sendNotification = (message: string) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
};
