export const notFound = (req, res, next) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` })
}

export const errorHandler = (err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode
  console.error(`[${req.method} ${req.url}]`, err.message)
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}
