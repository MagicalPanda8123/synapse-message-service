import 'dotenv/config'

// Central app config
export const config = {
  server: {
    name: process.env.SERVICE_NAME,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
}

// Validate required environment variables
function validateConfig() {
  const required = ['AUTH_JWKS_URL', 'RABBITMQ_URL', 'REDIS_URL', 'AUTH_JWKS_URL']
  const missing = required.filter((key) => !process.env[key])
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

validateConfig()
