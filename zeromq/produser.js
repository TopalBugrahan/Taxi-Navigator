// producer.js
var zmq = require("zeromq"),
  sock = zmq.socket("push");
const csv = require("csv-parser");
const fs = require("fs");
const result = [];


let myPromise = new Promise(function (myResolve, myReject) {
  fs.createReadStream("car_data.csv")
    .pipe(csv({}))
    .on("data", (data) => result.push(data))
    .on("end", () => {
      myResolve(result);
    });
});
function b() {
  myPromise
    .then((value) => {
      sock.bindSync("tcp://127.0.0.1:3000");
      console.log("Producer bound to port 3000");
      for(let i= 0 ;i<value.length;i++)
      {
          sock.send(JSON.stringify(value[i]))
      }
      console.log("a")
    })
    
    .catch((error) => {
      console.log(error);
    });
}
module.exports = b;
