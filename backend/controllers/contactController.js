import mongoose from 'mongoose'
import Message from '../models/Message.js'
import { sendContactEmail } from '../utils/sendEmail.js'

const emailRegex = /^\S+@\S+\.\S+$/

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {}

    // Validation
    if (!name || !email || !message) {
      res.status(400)
      throw new Error('Name, email and message are required.')
    }
    if (!emailRegex.test(email)) {
      res.status(400)
      throw new Error('Invalid email address.')
    }
    if (message.trim().length < 10) {
      res.status(400)
      throw new Error('Message must be at least 10 characters.')
    }
    if (name.length > 80 || email.length > 120 || message.length > 4000) {
      res.status(400)
      throw new Error('One of the fields exceeds the allowed length.')
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    }

    // Persist (only if DB connected)
    let saved = null
    if (mongoose.connection.readyState === 1) {
      saved = await Message.create(payload)
    }

    // Email (only if SMTP configured)
    let mail = { skipped: true }
    try {
      mail = await sendContactEmail(payload)
    } catch (mailErr) {
      console.error('Email send failed:', mailErr.message)
    }

    return res.status(201).json({
      ok: true,
      saved: !!saved,
      mailed: !!mail.sent,
      message: 'Thanks! Your message has been received.',
    })
  } catch (err) {
    next(err)
  }
}

// Protected: list messages (admin only)
export const listMessages = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected.' })
    }
    const messages = await Message.find().sort('-createdAt').limit(100)
    res.json(messages)
  } catch (err) {
    next(err)
  }
}
