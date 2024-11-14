import app from "./app";
import { initializeWebSocket } from "./utils/websocket";
import http from "http";

const server = http.createServer(app);

initializeWebSocket(server)

const PORT = process.env.PORT || 4500;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

