import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import env from '~/config/environment'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const RUN_SERVER = () => {
  const app = express()
  const hostname = env.APP_HOST
  const port = env.APP_PORT || 3000

  app.use(cors(corsOptions))
  app.use(express.json())
  app.use('/api/v1', (req, res) => {
    return res.json({ message: 'Welcome to API v1' })
  })

  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    console.log(`I am running at localhost:${ port }/`)
  })
}


RUN_SERVER()


