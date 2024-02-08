const express = require("express");
const app = express();

app.use((err, req, res, next) => {
  if (err.name === "InvalidPositiveIntegerError") {
    res
      .status(400)
      .json({ error: 'Parameter "number" must be a positive integer.' });
  } else {
    next(err); 
  }
});

function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if (!Number.isInteger(number) || number <= 0) {
    const error = new Error('Parameter "number" must be a positive integer.');
    error.name = "InvalidPositiveIntegerError";
    return next(error); // Pass the error to the error handling middleware
  }

  // If "number" is a positive integer, return a success message
  res.json({ message: 'Success! Parameter "number" is a positive integer.' });
}

app.get("/positive", positiveIntegerHandler);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
