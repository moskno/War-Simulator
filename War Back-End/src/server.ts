import app from "./app";
import { initializeWebSocket } from "./utils/websocket";

const PORT = process.env.PORT || 4500;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

initializeWebSocket(server);
