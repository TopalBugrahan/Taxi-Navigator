var zmq = require("zeromq"),
  sock = zmq.socket("pull");

let CarModel = require("../models/Car");

function a() {
  sock.connect("tcp://127.0.0.1:3000");
  console.log("Worker connected to port 3000");

  sock.on("message", async function (msg) {
    await CarModel.create(JSON.parse(msg.toString()));
    //console.log(msg.toString());
  });
}

module.exports = a;
