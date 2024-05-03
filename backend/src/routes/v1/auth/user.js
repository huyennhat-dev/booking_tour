import express from 'express'
import userController from '~/controllers/userController'
import tokenValidation from '~/middlewares/jwtMiddleware'
import checkRule from '~/middlewares/checkRule'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken, checkRule(['admin']), userController.getUser)
  .delete(tokenValidation.authToken, checkRule(['admin']), userController.deleteUser)
  .put(tokenValidation.authToken, checkRule(['admin']), userController.updateUser)


// router.route('/')
//   .put(tokenValidation.authToken, checkRule(['customer']), userController.updateUserById)

export const userRouter = router