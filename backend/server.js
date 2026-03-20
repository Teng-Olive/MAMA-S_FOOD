import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import { connectDB } from './config/database.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
// Import all models to initialize them
import User from './models/User.js'
import Product from './models/Product.js'
import OrderModel from './models/OrderModel.js'

// --- Environment validation: fail fast for missing critical configuration ---
const requiredEnvs = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
const missingRequired = requiredEnvs.filter((k) => !process.env[k]);
if (missingRequired.length > 0) {
  console.error(`Missing required environment variable(s): ${missingRequired.join(', ')}.\nPlease create backend/.env (copy from .env.example) or set these variables in your environment.`);
  process.exit(1);
}

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Warning: STRIPE_SECRET_KEY is not set. Stripe payments will be disabled until you set STRIPE_SECRET_KEY in backend/.env');
}

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req,res)=> {
    res.send("API Working")
})

// Start server with basic EADDRINUSE handling (tries next port if busy)
const startServer = (p) => {
  const server = app.listen(p, () => console.log(`Server started on port: ${p}`));

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${p} is already in use. Trying port ${p + 1}...`);
      startServer(p + 1);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
};

startServer(port);