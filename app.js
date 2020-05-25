const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000);

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/index.html");
});


const points = {};



io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    socket.emit("news", {
        message: "Paok ole !!!!"
    });

    socket.on("new-message", (data) => {
        io.emit("server-message", data);
    });


    socket.on("my-location", (data) => {
        points[socket.id] = data;

        io.emit("locations", Object.values(points));
    });

    socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
        delete points[socket.id];
        io.emit("locations", Object.values(points));
    });

});

