import { config } from './config/index.js'
import express, { json, urlencoded } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import os from 'os'
import errorHandler from './middleware/error.middleware.js'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
)

app.use(helmet())
app.use(cookieParser())

app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    serviceName: config.server.name,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage().rss,
    hostName: os.hostname(),
  })
})

// API routes

// handle unkown endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Request ${req.method} to ${req.originalUrl} not found`,
  })
})

// Global error handler
app.use(errorHandler)

export default app
