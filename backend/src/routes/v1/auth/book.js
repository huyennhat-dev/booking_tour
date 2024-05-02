import express from 'express'
import bookController from '~/controllers/bookController'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/').get(tokenValidation.authToken, bookController.getBook)
router.route('/cancel-tour/:idBook').put(bookController.cancelTour)
router.route('/refund/:idCancel').put(bookController.refundTour)

export const bookRouter = router