const SocketIO = require("socket.io");
const child_process = require("child_process");

function ConfigSocketIO(nodeServer) {
    let io = SocketIO(nodeServer);
    io.on("connection", socket => {
        socket.on("publishStream", (data, callback) => {
            let p = socket.ffmpeg_process = child_process.spawn("ffmpeg", ["-fflags", "nobuffer", "-i", "-", "-vcodec", "copy", "-f", "flv", `rtmp://127.0.0.1/${data.app}/${data.stream}`]);
            p.stderr.on("data", data => {
                console.log(data.toString());
            });
            p.stdout.on("data", data => {
                console.log(data.toString());
            });

            callback(true);
        });

        socket.on("streamData", data => {
            socket.ffmpeg_process.stdin.write(data);
        });
    });
}

module.exports = ConfigSocketIO;