import express from 'express'
import userController from '~/controllers/userController'
import userValidation from '~/validations/userValidation'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken, userController.getUser)
  .post(tokenValidation.authToken, userValidation.createUser, userController.createUser)
  .delete(tokenValidation.authToken, userValidation.deleteUser, userController.deleteUser)
  .put(tokenValidation.authToken, userValidation.updateUser, userController.updateUser)

export const userRouter = router