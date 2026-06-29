import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  let token
  const auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.split(' ')[1]
  }
  if (!token) {
    res.status(401)
    return next(new Error('Not authorized — no token provided'))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) {
      res.status(401)
      return next(new Error('Not authorized — user not found'))
    }
    next()
  } catch (err) {
    res.status(401)
    next(new Error('Not authorized — token failed'))
  }
}

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next()
  res.status(403)
  next(new Error('Admin access required'))
}
