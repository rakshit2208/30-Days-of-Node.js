const express = require("express");
const app = express();
const authenticationMiddleware = require("./authenticationMiddleware");

// Apply authentication middleware to all routes
app.use(authenticationMiddleware);

// Your route handlers here
