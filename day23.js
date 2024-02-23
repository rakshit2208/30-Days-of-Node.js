const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});


const Category = mongoose.model("Category", categorySchema);

// Define a Mongoose schema for the Product entity
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Reference to Category
});

// Create a Mongoose model using the schema
const Product = mongoose.model("Product", productSchema);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://rakshit097:SSRiQ9QYnI7koSJt@cluster0.okwqcv5.mongodb.net/?retryWrites=true&w=majority",
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Promise} - Promise that resolves with an array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate("category");
    return products;
  } catch (error) {
    console.error("Error getting products with populated category:", error);
    throw error;
  }
}

// Example usage:

// Assuming categories are already created and have ObjectIds
// Create products with associated categories
async function createProductsWithCategories() {
  try {
    // Assuming categoryId represents the ObjectId of an existing category
    const product1 = await Product.create({
      name: "Product 1",
      price: 10,
      quantity: 100,
      category: categoryId,
    });
    const product2 = await Product.create({
      name: "Product 2",
      price: 20,
      quantity: 50,
      category: categoryId,
    });
    console.log("Products created:", product1, product2);
  } catch (error) {
    console.error("Error creating products with categories:", error);
  }
}

// Call the function to retrieve products with populated category details
getProductsPopulatedWithCategory()
  .then((products) => {
    console.log("Products with populated category details:", products);
  })
  .catch((error) => console.error("Error:", error));
