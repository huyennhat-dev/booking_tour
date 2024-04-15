import express from 'express'
import SinhVienAuthController from '~/controllers/auth/SinhVienAuthController'
import LoginValidation from '~/validations/loginValidation'

const SinhVienAuthRouter = express.Router()

SinhVienAuthRouter.post('/', LoginValidation, SinhVienAuthController.login)


export default SinhVienAuthRouter