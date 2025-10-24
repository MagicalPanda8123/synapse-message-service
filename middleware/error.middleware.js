import { config } from '../config/index.js'

export default function errorHandler(err, req, res) {
  console.err(err.stack)

  const statusCode = err.statusCode || err.status || 500
  const message = err.message || 'Internal Server Error'

  // Set up error response
  const response = {
    success: false,
    message,
    ...(config.server.env === 'development' && {
      stack: err.stack,
      error: {
        name: err.name,
        code: err.code,
        status: err.status,
        statusCode: err.statusCode,
        details: err.details,
      },
    }),
  }

  res.status(statusCode).json(response)
}
