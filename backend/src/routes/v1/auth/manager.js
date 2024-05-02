import express from 'express'
import managerController from '~/controllers/managerController'
import checkRule from '~/middlewares/checkRule'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken, checkRule(['manager', 'admin']), managerController.getManager)
  .delete(tokenValidation.authToken, checkRule(['manager', 'admin']), managerController.deleteManager)
  .put(tokenValidation.authToken, checkRule(['manager', 'admin']), managerController.updateManager)

export const managerRouter = router