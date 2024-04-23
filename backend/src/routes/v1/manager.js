import express from 'express'
import managerController from '~/controllers/managerController'
import managerValidation from '~/validations/managerValidation'

const router = express.Router()

router.route('/')
  .get(managerController.getManager)
  .post(managerValidation.createManager, managerController.createManager)
  .delete(managerValidation.deleteManager, managerController.deleteManager)
  .put(managerValidation.updateManager, managerController.updateManager)

export const managerRouter = router