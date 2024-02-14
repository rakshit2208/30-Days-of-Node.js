const express = require("express");
const cachingMiddleware = require("./cachingMiddleware");

const app = express();
app.use(cachingMiddleware);

app.get("/test", (req, res) => {
  res.send("Response from server");
});


app.get("/test", (req, res) => {
  res.send("Response from server");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
