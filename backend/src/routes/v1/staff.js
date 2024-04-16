import express from 'express'
import staffController from '~/controllers/staffController'

const router = express.Router()

router.route('/')
  .get(staffController.getStaff)
  .post(staffController.createStaff)
  .delete(staffController.deleteStaff)
  .put(staffController.updateStaff)

export const staffRouter = router