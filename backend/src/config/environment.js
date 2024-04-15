import 'dotenv/config'


const env = {
  USERNAME_DB : process.env.USERNAME_DB,
  PASSWORD :  process.env.PASSWORD,
  SERVER_NAME: process.env.SERVER_NAME,
  DATABASENAME: process.env.DATABASENAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE
}

export default env