import express from 'express'
import customerController from '~/controllers/customerController'
import customerValidation from '~/validations/customerValidation'

const router = express.Router()

router.route('/')
  .get(customerController.getCustomer)
  .post(customerValidation.createCustomer, customerController.createCustomer)
  .delete(customerValidation.deleteCustomer, customerController.deleteCustomer)
  .put(customerValidation.updateCustomer, customerController.updateCustomer)

export const customerRouter = router