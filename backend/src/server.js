import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import env from '~/config/environment'
import connectDatabase from '~/config/connect_database'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import db from '~/models'

const RUN_SERVER = () => {
  const app = express()
  const hostname = env.APP_HOST
  const port = env.APP_PORT || 8000

  app.use(cors(corsOptions))
  app.use(express.json())
  app.use('/api/v1', async (req, res) => {
    return res.json({ message: 'Welcome to API v1', db : await db.User.findOne({

    }) })
  })


  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    console.log(`I am running at localhost:${ port }/`)
  })
}

connectDatabase()
RUN_SERVER()


