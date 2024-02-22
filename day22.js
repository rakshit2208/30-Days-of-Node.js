const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});


const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB
mongoose.connect("mongodb+srv://rakshit097:SSRiQ9QYnI7koSJt@cluster0.okwqcv5.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


async function createProduct(product) {
  try {
    const createdProduct = await Product.create(product);
    return createdProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

/**
 * Retrieves all products from MongoDB
 * @returns {Promise} - Promise that resolves with an array of product objects
 */
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
}

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 * @returns {Promise} - Promise that resolves with the updated product
 */
async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 * @returns {Promise} - Promise that resolves with a message indicating success
 */
async function deleteProduct(productId) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error('Product not found');
    }
    return 'Product deleted successfully';
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// Example usage:

// Create a product
createProduct({ name: 'Example Product', price: 10, quantity: 100 })
  .then(createdProduct => {
    console.log('Created product:', createdProduct);
    // Retrieve all products
    return getAllProducts();
  })
  .then(allProducts => {
    console.log('All products:', allProducts);
    // Update a product
    return updateProduct(allProducts[0]._id, { price: 15 });
  })
  .then(updatedProduct => {
    console.log('Updated product:', updatedProduct);
    // Delete a product
    return deleteProduct(updatedProduct._id);
  })
  .then(message => {
    console.log(message);
  })
  .catch(error => console.error('Error:', error));
