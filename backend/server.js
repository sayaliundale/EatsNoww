require("dotenv").config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { socketAuth } = require("./middlewares/socketAuth");
const { startOrderCron } = require("./cron/orderDelivery");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors")
const server = http.createServer(app);

const io = new Server(server,
    { cors: { origin: "https://eats-noww.vercel.app", credentials: true } });

io.use(socketAuth);
app.set('io', io);
const userRouter = require("./routes/auth");
const connect = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/", userRouter);
connect();

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", (data) => {
        console.log("Message from client:", data);
        io.emit("receiveMessage", data);
    });

    socket.on("joinOrdersRoom", (userId) => {
        socket.join(userId.toString());
        console.log(`User ${socket.id} joined room for user ${userId}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

startOrderCron(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`---- \nServer started on port ${PORT}\n-----`));


