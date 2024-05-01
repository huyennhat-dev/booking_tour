import express from 'express'
import paymentController from '~/controllers/paymentController'

const router = express.Router()
router.post('/create_payment_url', paymentController.createURLpayment)
router.get('/vnpay-return', paymentController.vnpayReturn)

export const paymentRouter = router
