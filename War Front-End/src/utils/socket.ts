import { io } from "socket.io-client";
// import api from "../api/api";

const socket = io('http://localhost:4500'); 
// const socket = io(`${api}`);

socket.on("connect", () => {
  console.log("Connected to WebSocket");
});

export default socket;
