import { io } from "socket.io-client";

const socket = io('http://localhost:4500');

socket.on ("connect", () => {
    console.log("Connected to WebSocket")
})

socket.on ("connect_error", (error) => {
    console.error("Connection Error:", error)
})

socket.on ("message", (message: string) => {
    console.log("Message from server:", message)
})

socket.on ("disconnect", () => {
    console.log("WebSocket connection closed")
})

export default socket;
