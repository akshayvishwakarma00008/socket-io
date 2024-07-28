const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoute")
const messageRoutes = require("./routes/messageRoute")
const cors = require('cors')

const app = express()
const server = http.createServer(app)
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);


const io = socketIo(server, {
    cors: {
        origin: "*",
        credentials: true,
    }
})


mongoose.connect("mongodb://localhost:27017/chat-application").then(() => {
    console.log('[+] Connected To MongDB');
}).catch((err) => {
    console.log(err.message);
})

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        console.log(`[+] user - ${userId} added`)
        onlineUsers.set(userId, socket.id);
        io.emit("user-added", userId);
        io.emit("active-users", Array.from(onlineUsers.entries()));
    })


    socket.on("send-message", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("message-recieved", data.msg)
        }

    })

    socket.on("disconnect", () => {
        console.log("client disconnected", socket.id);
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
        io.emit("active-users", Array.from(onlineUsers.entries()));
    });
})



server.listen(5000, () => console.log(`Server running on port 5000`));