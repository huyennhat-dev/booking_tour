import express from 'express'
import tourController from '~/controllers/tourController'
import tourValidation from '~/validations/tourValidation'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken,tourController.getTour)
  .post(tokenValidation.authToken, tourValidation.createTour, tourController.createTour)
  .delete(tokenValidation.authToken, tourValidation.deleteTour, tourController.deleteTour)
  .put(tokenValidation.authToken, tourValidation.updateTour, tourController.updateTour)

export const tourRouter = router