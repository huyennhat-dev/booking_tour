import express from 'express'
import userController from '~/controllers/userController'
import userValidation from '~/validations/userValidation'


const router = express.Router()

router.route('/')
  .get(userController.getUser)
  .post(userValidation.createUser, userController.createUser)
  .delete(userValidation.deleteUser, userController.deleteUser)
  .put(userValidation.updateUser, userController.updateUser)

export const userRouter = router