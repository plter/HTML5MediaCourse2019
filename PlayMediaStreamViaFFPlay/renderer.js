// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

(async function () {

    let p = child_process.spawn("ffplay", ["-fflags", "nobuffer", "-i", "-"]);
    p.stderr.on("data", data => {
        console.log(data.toString());
    });
    p.stdout.on("data", data => {
        console.log(data.toString());
    });

    let stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });

    let mr = new MediaRecorder(stream);
    mr.ondataavailable = async function (e) {
        p.stdin.write(NodeBuffer.from(await e.data.arrayBuffer()));
    }
    mr.start(40);

    p.once("exit", code => {
        mr.stop();
        window.close();
    });

})();