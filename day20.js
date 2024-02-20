const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;


mongoose.connect(
  "mongodb+srv://rakshit097:SRRiQ9QYnI7koSJt@cluster0.okwqcv5.mongodb.net/?retryWrites=true&w=majority",
);

// Define the User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  age: Number,
});

// Define the User model
const User = mongoose.model("day19", userSchema);

// Express route to calculate the average age of all users in MongoDB
function averageAgeOfUsers(req, res) {
  User.aggregate([
    {
      $group: {
        _id: null,
        averageAge: { $avg: "$age" },
      },
    },
  ]).exec((err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const averageAge = result[0].averageAge;
    res.json({ averageAge });
  });
}

// Define the route
app.get("/average-age", averageAgeOfUsers);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
