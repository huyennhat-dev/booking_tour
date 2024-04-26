import express from 'express'
import tourController from '~/controllers/tourController'
import checkRule from '~/middlewares/checkRule'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()
router.route('/')
  .get(tourController.getTour)
  .post(tokenValidation.authToken, checkRule(['manager', 'admin']), tourController.createTour)
  .delete(tokenValidation.authToken, checkRule(['manager', 'admin']), tourController.deleteTour)
  .put(tokenValidation.authToken, checkRule(['manager', 'admin']), tourController.updateTour)

export const tourRouter = router