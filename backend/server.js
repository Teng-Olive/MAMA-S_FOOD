import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// --- Environment validation: fail fast for missing critical configuration ---
const requiredEnvs = ['MONGODB_URI', 'JWT_SECRET'];
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

app.listen(port, ()=> console.log('Sever started on Port: ' + port))