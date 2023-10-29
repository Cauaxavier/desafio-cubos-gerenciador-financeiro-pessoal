const express = require("express");
const router = require("./routers/router");

const server = express();

server.use(express.json());
server.use(router);

module.exports = server;
