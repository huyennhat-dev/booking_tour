import express from 'express'
import managerController from '~/controllers/managerController'

const router = express.Router()

router.route('/')
  .get(managerController.getManager)
  .post(managerController.createManager)
  .delete(managerController.deleteManager)
  .put(managerController.updateManager)

export const managerRouter = router