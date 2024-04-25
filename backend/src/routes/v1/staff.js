import express from 'express'
import staffController from '~/controllers/staffController'
import staffValidation from '~/validations/staffValidation'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken, staffController.getStaff)
  .post(tokenValidation.authToken, staffValidation.createStaff, staffController.createStaff)
  .delete(tokenValidation.authToken, staffValidation.deleteStaff, staffController.deleteStaff)
  .put(tokenValidation.authToken, staffValidation.updateStaff, staffController.updateStaff)

export const staffRouter = router