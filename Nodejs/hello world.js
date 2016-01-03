/**
 * Created by ykz on 2015/4/22.
 */
var http = require("http");
http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("hello world");
}).listen(8080, "127.0.0.1");
console.log("Server start");