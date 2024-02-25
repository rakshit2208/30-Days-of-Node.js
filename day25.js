const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rakshit097:SSRiQ9QYnI7koSJt@cluster0.okwqcv5.mongodb.net/?retryWrites=true&w=majority",
);


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

// Model creation
const Product = mongoose.model("Product", productSchema);

function createProductNameIndex() {
  Product.collection.createIndex({ name: 1 }, (err, result) => {
    if (err) {
      console.error("Error creating index:", err);
    } else {
      console.log("Index created successfully:", result);
    }
  });
}

// Call the function to create the index
createProductNameIndex();
