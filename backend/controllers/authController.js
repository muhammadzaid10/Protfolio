import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

export const register = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(503)
      throw new Error('Database not connected.')
    }

    const { name, email, password } = req.body || {}
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Name, email and password are required.')
    }
    if (password.length < 8) {
      res.status(400)
      throw new Error('Password must be at least 8 characters.')
    }

    const exists = await User.findOne({ email })
    if (exists) {
      res.status(409)
      throw new Error('User already exists.')
    }

    const user = await User.create({ name, email, password })
    const token = signToken(user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(503)
      throw new Error('Database not connected.')
    }

    const { email, password } = req.body || {}
    if (!email || !password) {
      res.status(400)
      throw new Error('Email and password are required.')
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.matchPassword(password))) {
      res.status(401)
      throw new Error('Invalid credentials.')
    }

    const token = signToken(user._id)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (err) {
    next(err)
  }
}

export const me = (req, res) => {
  res.json(req.user)
}
