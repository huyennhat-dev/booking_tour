import express from 'express'
import userController from '~/controllers/userController'


const router = express.Router()

router.route('/')
  .get(userController.getUser)
  .post(userController.createUser)
  .delete(userController.deleteUser)
  .put(userController.updateUser)

export const userRouter = router