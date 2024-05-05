import express from 'express'
import staffController from '~/controllers/staffController'
import checkRule from '~/middlewares/checkRule'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken, checkRule(['manager', 'admin']), staffController.getStaff)
  .delete(tokenValidation.authToken, checkRule(['manager', 'admin']), staffController.deleteStaff)
  .put(tokenValidation.authToken, checkRule(['manager', 'admin']), staffController.updateStaff)

router.route('/tour-booking/:idTour').get(tokenValidation.authToken, checkRule(['staff']), staffController.getTourBooking)
export const staffRouter = router