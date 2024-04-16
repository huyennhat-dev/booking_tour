import express from 'express'
import customerController from '~/controllers/customerController'

const router = express.Router()

router.route('/')
  .get(customerController.getCustomer)
  .post(customerController.createCustomer)
  .delete(customerController.deleteCustomer)
  .put(customerController.updateCustomer)

export const customerRouter = router