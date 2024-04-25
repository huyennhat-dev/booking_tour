import express from 'express'
import managerController from '~/controllers/managerController'
import managerValidation from '~/validations/managerValidation'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken, managerController.getManager)
  .post(tokenValidation.authToken, managerValidation.createManager, managerController.createManager)
  .delete(tokenValidation.authToken, managerValidation.deleteManager, managerController.deleteManager)
  .put(tokenValidation.authToken, managerValidation.updateManager, managerController.updateManager)

export const managerRouter = router