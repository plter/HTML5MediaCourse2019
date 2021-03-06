const SocketIOServer = require("socket.io");

let roomTeacherMap = new Map();

function configSocketIO(server) {
    let io = SocketIOServer(server);

    async function listClients(roomName) {
        let room = io.to(roomName);
        let clients = Array.from(await room.allSockets());
        room.emit("listClients", clients);
    }

    io.on("connection", socket => {
        socket.on("msg", msg => {
            io.emit("msg", msg);
        });

        socket.on("createClassroom", (name, callback) => {
            if (!io.sockets.adapter.rooms[name]) {
                socket.join(name);
                listClients(name);

                roomTeacherMap.set(name, socket.id);
                callback(true);
            } else {
                callback(false);
            }

            socket.on("disconnect", function () {
                roomTeacherMap.delete(name);
            });
        });

        socket.on("joinClassroom", (name, callback) => {
            socket.join(name);
            callback();
            listClients(name);
            io.to(roomTeacherMap.get(name)).emit("studentJoinedIn", { studentSid: socket.id });
        });

        socket.on("teacherOffer", data => {
            io.to(data.to).emit("teacherOffer", data);
        });

        socket.on("studentAnswer", data => {
            io.to(data.to).emit("studentAnswer", data);
        });

        socket.on("ice", data => {
            io.to(data.to).emit("ice", data);
        });
    });
}


module.exports.configSocketIO = configSocketIO;