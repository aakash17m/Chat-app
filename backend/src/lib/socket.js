import { Server } from 'socket.io';
import http from 'http';
import express from 'express';


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        // confidential: false,
    },
    
});

export function getReceiverSocketId(userId) {
    return userSocektMap[userId];
}

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


// import { Server } from "socket.io";
// import { createServer } from "http";
// import express from "express";

// const app = express();
// const server = createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173"],
//         credentials: true,
//     },
// });

// // Store online users
// const userSocketMap = {}; // { userId: socketId }

// export function getReceiverSocketId(userId) {
//     return userSocketMap[userId];
// }

// io.on("connection", (socket) => {
//     console.log("A user is connected:", socket.id);

//     const userId = socket.handshake.query.userId;

//     if (userId) {
//         userSocketMap[userId] = socket.id;
//     }

//     // Send online users to all connected clients
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     socket.on("disconnect", () => {
//         console.log("A user is disconnected:", socket.id);

//         if (userId && userSocketMap[userId] === socket.id) {
//             delete userSocketMap[userId];
//         }

//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     });
// });

// export { io, app, server };
