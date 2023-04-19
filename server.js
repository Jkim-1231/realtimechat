const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("ユーザーが接続しました");
    socket.on("chat message", (msg) => {
        // console.log("メッセージ:" + msg);
        io.emit("chat message", msg);
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log("listen on 3000");
});


