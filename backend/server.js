import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

import connectDB from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ---------- Middleware ----------
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

// Basic rate limiter for public endpoints
const publicLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.json({
    name: 'Muhammad Zaid — Portfolio API',
    status: 'online',
    version: '1.0.0',
    endpoints: ['/api/contact', '/api/chat', '/api/auth/login'],
  })
})

app.use('/api/contact', publicLimiter, contactRoutes)
app.use('/api/chat', publicLimiter, chatRoutes)
app.use('/api/auth', authRoutes)

// ---------- Error handlers ----------
app.use(notFound)
app.use(errorHandler)

// ---------- Start ----------
const startServer = async () => {
  // Try to connect to MongoDB but don't crash if it fails — chat & contact have graceful fallbacks
  await connectDB()
  app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio API running on http://localhost:${PORT}`)
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`   Client URL:  ${process.env.CLIENT_URL || 'http://localhost:5173'}\n`)
  })
}

startServer()
