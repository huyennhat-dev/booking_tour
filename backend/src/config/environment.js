import 'dotenv/config'

const env = {
  JWT_SECRETKEY : process.env.JWT_SECRETKEY,

  APP_PORT :  process.env.APP_PORT,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,

  BUILD_MODE: process.env.BUILD_MODE,

  VNP_TMNCODE : process.env.VNP_TMNCODE,
  VNP_HASHSECRET : process.env.VNP_HASHSECRET,
  VNP_URL : process.env.VNP_URL,
  VNP_RETURN_URL : process.env.VNP_RETURN_URL,
  VNP_API  : process.env.VNP_API,

  BACKEND_PORT : process.env.BACKEND_PORT,
  FRONTEND_PORT : process.env.FRONTEND_PORT,
  DASHBOARD_PORT : process.env.DASHBOARD_PORT,
  HOST : process.env.HOST

  
}

export default env