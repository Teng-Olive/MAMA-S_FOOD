 // Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
const connectDB = async ()=> {

    // Event listener: This will log a message when the database connection is successfully established
    mongoose.connection.on('connected', ()=> {
        console.log("Connection available")
    })

    // Connect to the MongoDB database using the URI stored in environment variables
    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)

}

// Export the connectDB function to use it in other parts of the application
export default connectDB