import mongoose from 'mongoose'

const connectDB = async () => {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.warn('⚠️  MONGO_URI not set — running without database.')
    return null
  }
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
    return conn
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`)
    console.warn('   The API will keep running — DB-backed features will be skipped.')
    return null
  }
}

export default connectDB
