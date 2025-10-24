import { config } from './config/index.js'
import app from './app.js'

const PORT = config.server.port || 5005

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`📫 Message API service running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server, error: ', error)
    process.exit(1)
  }
}

startServer()
