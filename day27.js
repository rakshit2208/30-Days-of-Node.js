const express = require("express");
const authenticateAndAuthorize = require("./helper");

const app = express();


app.get("/admin", authenticateAndAuthorize, (req, res) => {

  res.send("Admin route");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
