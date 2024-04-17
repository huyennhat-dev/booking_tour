import express from 'express'
import staffController from '~/controllers/staffController'
import staffValidation from '~/validations/staffValidation'

const router = express.Router()

router.route('/')
  .get(staffController.getStaff)
  .post(staffValidation.createStaff, staffController.createStaff)
  .delete(staffValidation.deleteStaff, staffController.deleteStaff)
  .put(staffValidation.updateStaff, staffController.updateStaff)

export const staffRouter = router