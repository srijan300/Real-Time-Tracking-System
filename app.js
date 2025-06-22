const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    // Send the socket id to the client
    socket.emit("your-id", socket.id);

    socket.on("send-location", function (data) {
        io.emit("received-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });
});

app.get('/', (req, res) => {
    res.render("index");
});

server.listen(2000, () => {
    console.log("Server listening on http://localhost:2000");
});
