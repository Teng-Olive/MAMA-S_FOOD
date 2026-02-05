// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose'

// Define the schema for a user in MongoDB
const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required: true , unique:true},
    password: {type:String, required:true},
    cartData: {type:Object, default: {}}
},{minimize:false})

// Create a Mongoose model for the "product" collection
// If the model already exists, use it; otherwise, create a new one
const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel