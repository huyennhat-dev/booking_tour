import express from 'express'
import tourController from '~/controllers/tourController'

const router = express.Router()

router.route('/')
  .get(tourController.getTour)
  .post(tourController.createTour)
  .delete(tourController.deleteTour)
  .put(tourController.updateTour)

export const tourRouter = router