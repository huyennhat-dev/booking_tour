import express from 'express'
import accountController from '~/controllers/accountController'
import checkRule from '~/middlewares/checkRule'
import jwtMiddleware from '~/middlewares/jwtMiddleware'

const router = express.Router()

router
  .route('/')
  .get(
    jwtMiddleware.authToken,
    checkRule(['admin']),
    accountController.getAccount
  )
router
  .route('/info')
  .get(
    jwtMiddleware.authToken,
    checkRule(['admin', 'staff', 'manager']),
    accountController.getAccountInfo
  )
router
  .route('/create')
  .post(
    jwtMiddleware.authToken,
    checkRule(['admin']),
    accountController.createAccount
  )
router
  .route('/create-staff')
  .post(
    jwtMiddleware.authToken,
    checkRule(['admin']),
    accountController.createStaff
  )
router
  .route('/create-manager')
  .post(
    jwtMiddleware.authToken,
    checkRule(['admin']),
    accountController.createManager
  )
router
  .route('/update')
  .put(
    jwtMiddleware.authToken,
    checkRule(['admin', 'staff', 'manager']),
    accountController.updateAccount
  )

export const accountRouter = router
