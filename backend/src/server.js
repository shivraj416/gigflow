import http from "http";
import dotenv from "dotenv";          // ✅ ADD THIS
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { setupSocket } from "./config/socket.js";

dotenv.config();                      // ✅ MUST BE FIRST
connectDB();                          // ✅ now MONGO_URI exists

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

setupSocket(io);

const PORT = process.env.PORT || 5000; // ✅ use env port
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
