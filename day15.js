
function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const headers = req.headers;
    const body = req.body;
  
    console.log(`[${timestamp}] ${method} ${url}`);
    console.log("Headers:", headers);
    console.log("Body:", body);
  
    next();
  }
  
  const express = require("express");
  const app = express();
  
  app.use(loggingMiddleware);
 
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  