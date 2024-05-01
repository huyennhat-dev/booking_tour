import express from 'express'
import tourController from '~/controllers/tourController'
import checkRule from '~/middlewares/checkRule'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()
router.route('/')
  .get(tokenValidation.authToken, checkRule(['admin', 'manager' , 'staff']), tourController.getTour)
  .post(tokenValidation.authToken, checkRule(['admin']), tourController.createTour)


router.route('/:id')
  .put(tokenValidation.authToken, checkRule(['admin']), tourController.updateTour)
  .delete(tokenValidation.authToken, checkRule(['admin']), tourController.deleteTour)


export const tourRouter = router