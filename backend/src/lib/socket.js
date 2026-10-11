import { server } from 'socket.io';
import http, { Server } from 'http';
import express from 'express';


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors :{
        origin: ["http://localhost:5173"],
    },
    
});

// use to store online users
const userSocektMap = {

};  // {userId: socketId}

io.on("connection", (socket) => {
    console.log("A user is connected", socket.id);
    
    const userId = socket.handshake.query.userId
    if(userId) userSocektMap[userId] = socket.id;

    // io.emit() is use to send evenys to all connected users
    io.emit("getOnlineUsers", Object.keys(userSocektMap));

    socket.on("disconnect", () => {
        console.log("A user is disconnected", socket.id);
        delete userSocektMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocektMap));
    })
})

export { io, app, server };