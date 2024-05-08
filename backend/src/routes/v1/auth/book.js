import express from 'express'
import bookController from '~/controllers/bookController'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/').get(tokenValidation.authToken, bookController.getBook)
router.route('/cancel-tour').put(tokenValidation.authToken, bookController.cancelTour)
router.route('/refund/:idCancel').put(tokenValidation.authToken, bookController.refundTour)

export const bookRouter = router
