import 'dotenv/config'

const env = {
  JWT_SECRETKEY : process.env.JWT_SECRETKEY,
  APP_PORT :  process.env.APP_PORT,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
  BUILD_MODE: process.env.BUILD_MODE
}

export default env