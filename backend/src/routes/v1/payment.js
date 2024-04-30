import express from 'express'
import paymentController from '~/controllers/paymentController'
import tokenValidation from '~/middlewares/jwtMiddleware'
import paymentValidation from '~/validations/paymentValidation'

const router = express.Router()
router.post('/create_payment_url', paymentValidation.create_payment_url, paymentController.createURLpayment)
router.get('/vnpay-return', paymentValidation.create_payment_url, paymentController.vnpayReturn)

export const paymentRouter = router
