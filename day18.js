
const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  
});

const User = mongoose.model("User", userSchema);

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://rakshit097:SRiRQ9QYnI7koSJt@cluster0.okwqcv5.mongodb.net/?retryWrites=true&w=majority"',
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const app = express();


app.get("/users", async (req, res) => {
  try {
    
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
