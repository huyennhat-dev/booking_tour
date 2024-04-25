import express from 'express'
import customerController from '~/controllers/customerController'
import customerValidation from '~/validations/customerValidation'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken, customerController.getCustomer)
  .post(tokenValidation.authToken, customerValidation.createCustomer, customerController.createCustomer)
  .delete(tokenValidation.authToken, customerValidation.deleteCustomer, customerController.deleteCustomer)
  .put(tokenValidation.authToken, customerValidation.updateCustomer, customerController.updateCustomer)

export const customerRouter = router