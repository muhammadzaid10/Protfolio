import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    ip: { type: String },
    userAgent: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.models.Message || mongoose.model('Message', messageSchema)
