const http = require("http");
const express = require("express");
const app = express();
const setupWebSocketServer = require("./helper2");

const server = http.createServer(app);

setupWebSocketServer(server);

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
