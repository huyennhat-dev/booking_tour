import express from 'express'
import tourController from '~/controllers/tourController'
import tourValidation from '~/validations/tourValidation'

const router = express.Router()

router.route('/')
  .get(tourController.getTour)
  .post(tourValidation.createTour, tourController.createTour)
  .delete(tourValidation.deleteTour, tourController.deleteTour)
  .put(tourValidation.updateTour, tourController.updateTour)

export const tourRouter = router