// Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Define the schema for a product collection in MongoDB
const productSchema = new mongoose.Schema({
     // Product name (string, required)
    name: {type:String, required:true},
    price: {type:Number, required:true},
    description: {type:String, required: true},
    image: { type: String, required: true },
    category: {type:String, required:true},
    date: {type:Number, required:true},
})

// Create a Mongoose model for the "product" collection
// If the model already exists, use it; otherwise, create a new one
const productModel = mongoose.models.product || mongoose.model('product', productSchema);

// Export the product model to use it in other parts of the application
export default productModel