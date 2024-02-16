const mongoose = require("mongoose");

function connectToMongoDB() {
  
  const mongoURI =
    "mongodb+srv://rakshit097:SFRi3Q9QYnI7kLoSJt@cluster0.okwqcv5.mongodb.net/?retryWrites=true&w=majority";

  // Connect to MongoDB
  mongoose.connect(mongoURI);

  const db = mongoose.connection;

  // Event handlers for connection
  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  db.once("open", () => {
    console.log("MongoDB connected successfully");
  });
}
// Call the function to establish MongoDB connection
connectToMongoDB();
