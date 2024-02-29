const express = require("express");
const errorHandler = require("./errorHandler"); 

const app = express();


// Register the centralized error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
